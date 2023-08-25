'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Icons } from '@/components/icons';

export default function CompressImages() {
  const [files, setFiles] = useState<{ name: string; data: string }[]>([]);
  const [base64, setBase64] = useState('');

  const { toast } = useToast();

  const showErrorToast = () => {
    toast({
      title: 'Error',
      description: 'Invalid Base64',
      variant: 'destructive',
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const match = base64.match(/data:(.*?);/);
    if (!match) {
      showErrorToast();
      return;
    }
    const mimeType = match[1];
    if (!mimeType) {
      showErrorToast();
      return;
    }
    const extension = mimeType.split('/')[1];
    setFiles(prev => [...prev, { name: `file.${extension}`, data: base64 }]);
  };

  return (
    <div>
      <h1 className='mb-3 text-center text-2xl font-semibold tracking-tight'>Files from Base64</h1>
      <form onSubmit={handleSubmit}>
        <div className='grid items-center gap-1.5'>
          <Label htmlFor='base64'>Base64</Label>
          <Textarea
            id='base64'
            placeholder='Paste Base64 here'
            value={base64}
            onChange={e => setBase64(e.target.value)}
          />
        </div>
        <Button className='mt-2' size='sm' type='submit' disabled={base64 === ''}>
          Convert
        </Button>
      </form>
      <div className='mt-6 space-y-3'></div>
      {files.map((file, index) => (
        <div key={index} className='flex h-12 items-center justify-between rounded-md border px-4'>
          <div className='space-x-4'>
            <span className='max-w-[18rem] truncate'>{file.name}</span>
          </div>
          <a
            download={file.name}
            href={file.data}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              })
            )}
          >
            <Icons.download className='h-4 w-4' />
          </a>
        </div>
      ))}
    </div>
  );
}
