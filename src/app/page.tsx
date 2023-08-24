import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export default function Home() {
  return (
    <section id='hero' aria-labelledby='hero-heading' className='mt-40 space-y-4 text-center'>
      <h1 className='mx-auto max-w-[64rem] text-3xl font-extrabold leading-[0.9] sm:text-5xl lg:text-6xl'>
        A one-stop website containing a collection of everyday tools that will save you time.
      </h1>
      <h2 className='mx-auto max-w-[46rem] text-lg text-muted-foreground sm:text-xl'>
        No need to waste time searching for the right tool. Going from one website to another. We have it all here.
      </h2>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        <Link href='/' className={cn(buttonVariants({ size: 'lg' }))}>
          Get Started
        </Link>
        <Link
          href='https://github.com/muhammadusamaawan'
          target='_blank'
          rel='noopener noreferrer'
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'lg',
            })
          )}
        >
          Github
        </Link>
      </div>
    </section>
  );
}
