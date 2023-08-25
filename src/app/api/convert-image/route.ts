import { NextResponse, type NextRequest } from 'next/server';
import type { APIResponse } from '@/types';
import sharp from 'sharp';
import { ZodError } from 'zod';

import { getImageOptions } from '@/lib/imageOptions';
import { imageTypeSchema } from '@/lib/validations';

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
    const format = imageTypeSchema.parse(formData.get('format') ?? 'webp');

    const convetedBuffer = await sharp(buffer, { animated: true })
      [format]({ ...getImageOptions(format), quality })
      .toBuffer();
    const data: APIResponse = {
      name: file.name.split('.')[0] + '.' + format,
      data: `data:${file.type};base64,${convetedBuffer.toString('base64')}`,
      size: convetedBuffer.length,
    };
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ status: 400, error: error.issues });
    }
    if (error instanceof Error) {
      return NextResponse.json({ status: 400, error: error.message });
    }
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
}
