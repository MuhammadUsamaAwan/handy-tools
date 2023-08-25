import type {
  AvifOptions,
  GifOptions,
  HeifOptions,
  Jp2Options,
  JpegOptions,
  PngOptions,
  TiffOptions,
  WebpOptions,
} from 'sharp';
import type { z } from 'zod';

import type { imageTypeSchema } from '@/lib/validations';

export function getImageOptions(type: z.infer<typeof imageTypeSchema>) {
  switch (type) {
    case 'jpeg': {
      return {
        mozjpeg: true,
      } satisfies JpegOptions;
    }
    case 'png': {
      return {
        compressionLevel: 9,
        effort: 10,
      } satisfies PngOptions;
    }
    case 'webp': {
      return {
        effort: 6,
      } satisfies WebpOptions;
    }
    case 'gif': {
      return {
        effort: 10,
      } satisfies GifOptions;
    }
    case 'jp2': {
      return {} satisfies Jp2Options;
    }
    case 'tiff': {
      return {} satisfies TiffOptions;
    }
    case 'avif': {
      return {
        effort: 9,
      } satisfies AvifOptions;
    }
    case 'heif': {
      return {
        effort: 9,
      } satisfies HeifOptions;
    }
  }
}
