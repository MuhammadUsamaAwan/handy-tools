import { useEffect, useState } from 'react';
import type { APIResponse } from '@/types';
import axios from 'axios';

import { cn, formatSize, getPercentage } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Icons } from '@/components/icons';

type FileItemProps = {
  file: File;
  endpoint: string;
  options?: Record<string, string>;
};

export function FileItem({ file, endpoint, options }: FileItemProps) {
  const [data, setData] = useState<APIResponse>();
  const [uploadProgress, setUploadProgress] = useState(0);

  const { toast } = useToast();

  useEffect(() => {
    async function uploadFile() {
      const formData = new FormData();
      formData.append('file', file);

      if (options) {
        Object.entries(options).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }

      try {
        const { data } = await axios.post(`/api/${endpoint}`, formData, {
          onUploadProgress: progressEvent => {
            const progress = progressEvent.total ? Math.round((progressEvent.loaded / progressEvent.total) * 100) : 0;
            setUploadProgress(progress);
          },
        });
        setData(data as APIResponse);
      } catch (error) {
        toast({
          title: 'Error',
          description: `Couldn't progress the file ${file.name}`,
          variant: 'destructive',
        });
      }
    }

    uploadFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, toast, endpoint]);

  return (
    <div className='flex h-12 items-center space-x-4 rounded-md border px-4'>
      <span className='max-w-[18rem] truncate'>{file.name}</span>
      <span className='hidden whitespace-nowrap text-sm sm:inline'>{formatSize(file.size)}</span>
      <Progress value={uploadProgress} className='flex-1' />
      {data && (
        <>
          <span className='hidden whitespace-nowrap text-sm sm:inline'>{formatSize(data.size)}</span>
          <span className='hidden whitespace-nowrap text-sm sm:inline'>-{getPercentage(file.size, data.size)}</span>
        </>
      )}
      {data && (
        <a
          download={data.name}
          href={data.data}
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'sm',
            })
          )}
        >
          <Icons.download className='h-4 w-4' />
        </a>
      )}
    </div>
  );
}
