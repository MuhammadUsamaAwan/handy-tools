import { formatSize } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

type FileItemProps = {
  name: string;
  size: number;
};

export function FileItem({ name, size }: FileItemProps) {
  return (
    <div className='flex items-center space-x-2 rounded-md border px-4 py-1'>
      <span className='w-72 truncate'>{name}</span>
      <span className='flex-1'>{formatSize(size)}</span>
      <Button variant='outline' size='icon'>
        <Icons.download className='h-4 w-4' />
      </Button>
    </div>
  );
}
