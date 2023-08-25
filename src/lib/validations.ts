import { z } from 'zod';

export const imageTypeSchema = z.enum(['png', 'jpeg', 'webp', 'avif', 'gif', 'heif', 'tiff', 'jp2']);

export const imageResizeSchema = z.object({
  width: z
    .number()
    .optional()
    .transform(val => (val === 0 ? undefined : val)),
  height: z
    .number()
    .optional()
    .transform(val => (val === 0 ? undefined : val)),
  fit: z.enum(['contain', 'cover', 'fill', 'inside', 'outside']),
  position: z.enum([
    'top',
    'right top',
    'right',
    'right bottom',
    'bottom',
    'left bottom',
    'left',
    'left top',
    'center',
  ]),
});
