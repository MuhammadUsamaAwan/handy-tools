import { useEffect, useState } from 'react';
import type { APIResponse } from '@/types';
import axios from 'axios';

import { cn, formatSize } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Icons } from '@/components/icons';

type FileItemProps = {
  file: File;
};

export function FileItem({ file }: FileItemProps) {
  const [data, setData] = useState<APIResponse>();
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    async function uploadFile() {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const { data } = await axios.post('/api/compress-image', formData, {
          onUploadProgress: progressEvent => {
            const progress = progressEvent.total ? Math.round((progressEvent.loaded / progressEvent.total) * 100) : 0;
            setUploadProgress(progress);
          },
        });
        setData(data as APIResponse);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    uploadFile();
  }, [file]);

  return (
    <div className='flex items-center space-x-6 rounded-md border px-4 py-1'>
      <span className='max-w-[18rem] truncate'>{file.name}</span>
      <div className='flex flex-1 items-center space-x-2'>
        <span className={cn('whitespace-nowrap', uploadProgress === 100 && 'line-through')}>
          {formatSize(file.size)}
        </span>
        {uploadProgress !== 100 || !data ? (
          <Progress value={uploadProgress} />
        ) : (
          <span className='whitespace-nowrap'>{formatSize(data.size)}</span>
        )}
      </div>
      <Button variant='outline' size='icon' disabled={uploadProgress !== 100}>
        {uploadProgress !== 100 ? (
          <Icons.loading className='h-4 w-4 animate-spin' />
        ) : (
          <a href={file.name} download={data?.data}>
            <Icons.download className='h-4 w-4' />
          </a>
        )}
      </Button>
    </div>
  );
}
