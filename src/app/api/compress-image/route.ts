import { NextResponse, type NextRequest } from 'next/server';
import type { APIResponse } from '@/types';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get('file') as File;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const compressedBuffer = await sharp(buffer).jpeg({ mozjpeg: true, quality: 80 }).toBuffer();
    const isCompressed = compressedBuffer.length < buffer.length;
    const data: APIResponse = {
      data: isCompressed
        ? `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`
        : `data:image/jpeg;base64,${buffer.toString('base64')}`,
      size: isCompressed ? compressedBuffer.length : buffer.length,
    };
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
