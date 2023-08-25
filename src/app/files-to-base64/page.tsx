'use client';

import { useState } from 'react';

import { formatSize } from '@/lib/utils';
import Copy from '@/components/copy';
import { DropzoneCard } from '@/components/dropzone-card';

export default function CompressImages() {
  const [data, setData] = useState<{ file: File; result: string }[]>([]);

  return (
    <div>
      <DropzoneCard
        onDrop={acceptedFiles => {
          for (const file of acceptedFiles) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              setData(prev => [...prev, { file, result: reader.result as string }]);
            };
          }
        }}
        title='Files to Base64'
        description='Click to upload or drag and drop file here to convert.'
      />
      <div className='mt-6 space-y-3'></div>
      {data.map((el, index) => (
        <div key={index} className='flex h-12 items-center justify-between rounded-md border px-4'>
          <div className='space-x-4'>
            <span className='max-w-[18rem] truncate'>{el.file.name}</span>
            <span className='hidden whitespace-nowrap text-sm sm:inline'>{formatSize(el.file.size)}</span>
          </div>
          <div className='flex space-x-1'>
            <Copy toolTip='Copy Base64' text={el.result.split(',')[1] as string} />
            <Copy toolTip='Copy Base64 with Binary Data' text={el.result} />
          </div>
        </div>
      ))}
    </div>
  );
}
