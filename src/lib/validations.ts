import { z } from 'zod';

export const imageTypeSchema = z.enum(['png', 'jpeg', 'webp', 'avif', 'gif', 'heif', 'tiff', 'jp2']);
