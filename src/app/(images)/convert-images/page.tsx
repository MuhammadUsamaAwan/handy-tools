'use client';

import { useState } from 'react';

import { images } from '@/lib/acceptTypes';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropzoneCard } from '@/components/dropzone-card';
import { FileItem } from '@/components/file-item';
import { SettingsDialog } from '@/components/settings-dialog';

export default function CompressImages() {
  const [files, setFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quality, setQuality] = useState('80');
  const [format, setFormat] = useState<string>('webp');

  return (
    <div>
      <DropzoneCard
        onDrop={acceptedFiles => setFiles(prev => [...prev, ...acceptedFiles])}
        accept={images}
        title='Convert Images'
        description='Click to upload or drag and drop images here to convert.'
        onSettingsClick={() => setIsModalOpen(true)}
      />
      <div className='mt-6 space-y-3'>
        {files?.map((file, index) => (
          <FileItem
            key={index}
            file={file}
            endpoint='convert-image'
            options={{
              quality,
              format,
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
        <div className='grid items-center gap-1.5'>
          <Label htmlFor='format'>Format</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger>
              <SelectValue placeholder='Theme' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='png'>PNG</SelectItem>
              <SelectItem value='jpeg'>JPEG</SelectItem>
              <SelectItem value='webp'>WEBP</SelectItem>
              <SelectItem value='avif'>AVIF</SelectItem>
              <SelectItem value='heif'>HEIF</SelectItem>
              <SelectItem value='tiff'>TIFF</SelectItem>
              <SelectItem value='jp2'>JP2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SettingsDialog>
    </div>
  );
}
