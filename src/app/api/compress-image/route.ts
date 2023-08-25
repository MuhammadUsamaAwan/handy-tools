import { NextResponse, type NextRequest } from 'next/server';
import type { APIResponse } from '@/types';
import sharp from 'sharp';
import { ZodError } from 'zod';

import { getImageCompressedOptions } from '@/lib/getImageCompressedOptions';
import { getImageType } from '@/lib/utils';

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

    const type = getImageType(file);

    const compressedBuffer = await sharp(buffer)
      [type]({ ...getImageCompressedOptions(type), quality })
      .toBuffer();
    const isCompressed = compressedBuffer.length < buffer.length;
    const data: APIResponse = {
      data: isCompressed
        ? `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`
        : `data:image/jpeg;base64,${buffer.toString('base64')}`,
      size: isCompressed ? compressedBuffer.length : buffer.length,
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
