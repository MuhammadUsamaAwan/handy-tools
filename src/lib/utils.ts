import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSize(bytes: number) {
  const kb: number = bytes / 1024;
  const mb: number = kb / 1024;

  if (mb >= 1) {
    return `${mb.toFixed(2)} MB`;
  } else {
    return `${kb.toFixed(2)} KB`;
  }
}

export function getPercentage(original: number, modified: number) {
  const percentage = ((original - modified) / original) * 100;
  return percentage.toFixed(2) + '%';
}

export function getImageType(file: File) {
  const type = file.type.split('/')[1];
  const imageTypeSchema = z.enum(['png', 'jpeg', 'webp', 'avif', 'gif', 'heif', 'tiff', 'jp2']);
  return imageTypeSchema.parse(type);
}
