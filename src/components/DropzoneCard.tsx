'use client';

import Dropzone, { type DropzoneProps } from 'react-dropzone';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

interface Props extends DropzoneProps {
  title: string;
  description: string;
}

export function DropzoneCard({ title, description, ...props }: Props) {
  return (
    <Dropzone {...props}>
      {({ getRootProps, getInputProps }) => (
        <Card className='mx-auto max-w-xl'>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <CardHeader>
              <CardTitle className='text-center text-2xl'>{title}</CardTitle>
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
