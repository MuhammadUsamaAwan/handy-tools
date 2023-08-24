'use client';

import { DropzoneCard } from '@/components/DropzoneCard';

export default function CompressImages() {
  return (
    <div>
      <DropzoneCard
        onDrop={f => console.log(f)}
        accept={{
          'image/png': ['.png'],
          'image/jpeg': ['.jpg', '.jpeg', '.jpe', '.jif', '.jfif'],
          'image/webp': ['.webp'],
          'image/gif': ['.gif'],
          'image/avif': ['.avif'],
        }}
        title='Compress Images'
        description='Click to upload or drag and drop images here to compress.'
      />
    </div>
  );
}
