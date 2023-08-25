import { NextResponse, type NextRequest } from 'next/server';
import type { APIResponse } from '@/types';
import { fileTypeFromBuffer } from 'file-type';
import sharp from 'sharp';
import { ZodError } from 'zod';

import { getImageOptions } from '@/lib/imageOptions';
import { getImageType } from '@/lib/utils';
import { imageResizeSchema, imageTypeSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ status: 400, error: 'No file provided' });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const quality = Number(formData.get('quality')) ?? 80;
    const format = imageTypeSchema.parse(formData.get('format') ?? getImageType(file));
    const fit = formData.get('fit');
    const position = formData.get('position');
    const width = Number(formData.get('width'));
    const height = Number(formData.get('height'));

    const imageSize = imageResizeSchema.parse({ width, height, fit, position });

    const convetedBuffer = await sharp(buffer, { animated: true })
      [format]({ ...getImageOptions(format), quality })
      .resize(imageSize)
      .toBuffer();
    const fileType = await fileTypeFromBuffer(convetedBuffer);
    const data: APIResponse = {
      name: file.name.split('.')[0] + '.' + fileType?.ext,
      data: `data:${fileType?.mime};base64,${convetedBuffer.toString('base64')}`,
      size: convetedBuffer.length,
    };
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
}
