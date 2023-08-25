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
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [format, setFormat] = useState<string>();
  const [fit, setFit] = useState<string>('cover');
  const [position, setPosition] = useState<string>('center');

  return (
    <div>
      <DropzoneCard
        onDrop={acceptedFiles => setFiles(prev => [...prev, ...acceptedFiles])}
        accept={images}
        title='Resize Images'
        description='Click to upload or drag and drop images here to resize.'
        onSettingsClick={() => setIsModalOpen(true)}
      />
      <div className='mt-6 space-y-3'>
        {files?.map((file, index) => (
          <FileItem
            key={index}
            file={file}
            endpoint='resize-image'
            options={{
              quality,
              format,
              fit,
              position,
              width,
              height,
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
          <Label htmlFor='width'>Width</Label>
          <Input
            type='number'
            min={1}
            max={100}
            id='width'
            placeholder='Width'
            value={width}
            step={5}
            onChange={e => setWidth(e.target.value)}
          />
        </div>
        <div className='grid items-center gap-1.5'>
          <Label htmlFor='height'>Height</Label>
          <Input
            type='number'
            min={1}
            max={100}
            id='height'
            placeholder='Height'
            value={height}
            step={5}
            onChange={e => setHeight(e.target.value)}
          />
        </div>
        <div className='grid items-center gap-1.5'>
          <Label htmlFor='format'>Format</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger>
              <SelectValue placeholder='Format' />
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
        <div className='grid items-center gap-1.5'>
          <Label htmlFor='fit'>Fit</Label>
          <Select value={fit} onValueChange={setFit}>
            <SelectTrigger>
              <SelectValue placeholder='fit' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='cover'>Cover</SelectItem>
              <SelectItem value='contain'>Contain</SelectItem>
              <SelectItem value='fill'>Fill</SelectItem>
              <SelectItem value='inside'>Inside</SelectItem>
              <SelectItem value='outside'>Outside</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='grid items-center gap-1.5'>
          <Label htmlFor='position'>Position</Label>
          <Select value={position} onValueChange={setPosition}>
            <SelectTrigger>
              <SelectValue placeholder='position' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='center'>Center</SelectItem>
              <SelectItem value='top'>Top</SelectItem>
              <SelectItem value='right top'>Right Top</SelectItem>
              <SelectItem value='right bottom'>Right bottom</SelectItem>
              <SelectItem value='bottom'>Bottom</SelectItem>
              <SelectItem value='left bottom'>Left bottom</SelectItem>
              <SelectItem value='left'>Left</SelectItem>
              <SelectItem value='left top'>Left top</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SettingsDialog>
    </div>
  );
}
