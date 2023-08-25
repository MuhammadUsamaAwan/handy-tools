'use client';

import { useState } from 'react';

import { images } from '@/lib/acceptTypes';
import { DropzoneCard } from '@/components/dropzone-card';
import { FileItem } from '@/components/file-item';

export default function CompressImages() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div>
      <DropzoneCard
        onDrop={acceptedFiles => setFiles(prev => [...prev, ...acceptedFiles])}
        accept={images}
        title='Compress Images'
        description='Click to upload or drag and drop images here to compress.'
      />
      <div className='mt-6 space-y-3'>{files?.map((file, index) => <FileItem key={index} file={file} />)}</div>
    </div>
  );
}
