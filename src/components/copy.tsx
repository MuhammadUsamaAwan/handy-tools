import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Icons } from '@/components/icons';

type CopyProps = {
  toolTip: string;
  text: string;
};

export default function Copy({ toolTip, text }: CopyProps) {
  const [copied, setCopied] = useState(false);

  function copyTextToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    });
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button size='sm' variant='outline' onClick={() => copyTextToClipboard(text)}>
          {copied ? <Icons.check className='h-4 w-4' /> : <Icons.copy className='h-4 w-4' />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{toolTip}</TooltipContent>
    </Tooltip>
  );
}
