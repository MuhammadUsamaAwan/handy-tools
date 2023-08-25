'use client';

import Dropzone, { type DropzoneProps } from 'react-dropzone';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

interface DropzoneCardProps extends DropzoneProps {
  title: string;
  description: string;
  onSettingsClick?: () => void;
}

export function DropzoneCard({ title, description, onSettingsClick, ...props }: DropzoneCardProps) {
  return (
    <Dropzone {...props}>
      {({ getRootProps, getInputProps }) => (
        <Card className='mx-auto max-w-xl'>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <CardHeader>
              <CardTitle className='flex items-center justify-center text-center text-2xl'>
                {title}
                {onSettingsClick && (
                  <Button
                    size='icon'
                    variant='outline'
                    className='ml-2'
                    onClick={e => {
                      e.stopPropagation();
                      onSettingsClick();
                    }}
                  >
                    <Icons.settings className='h-4 w-4' />
                  </Button>
                )}
              </CardTitle>
              <CardDescription className='text-center'>{description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button size='sm' className='mx-auto w-3/4'>
                <Icons.upload className='mr-2 h-4 w-4' />
                Upload
              </Button>
            </CardFooter>
          </div>
        </Card>
      )}
    </Dropzone>
  );
}
