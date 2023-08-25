'use client';

import { useState } from 'react';

import { images } from '@/lib/acceptTypes';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DropzoneCard } from '@/components/dropzone-card';
import { FileItem } from '@/components/file-item';
import { SettingsDialog } from '@/components/settings-dialog';

export default function CompressImages() {
  const [files, setFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quality, setQuality] = useState('80');

  return (
    <div>
      <DropzoneCard
        onDrop={acceptedFiles => setFiles(prev => [...prev, ...acceptedFiles])}
        accept={images}
        title='Compress Images'
        description='Click to upload or drag and drop images here to compress.'
        onSettingsClick={() => setIsModalOpen(true)}
      />
      <div className='mt-6 space-y-3'>
        {files?.map((file, index) => (
          <FileItem
            key={index}
            file={file}
            endpoint='compress-image'
            options={{
              quality,
            }}
          />
        ))}
      </div>
      <SettingsDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <div className='grid items-center gap-1.5'>
          <Label htmlFor='quality'>Quality</Label>
          <Input
            type='number'
            min={1}
            max={100}
            id='quality'
            placeholder='Quality'
            value={quality}
            step={5}
            onChange={e => setQuality(e.target.value)}
          />
        </div>
      </SettingsDialog>
    </div>
  );
}
