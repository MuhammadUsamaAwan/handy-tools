import { MainNav } from '@/components/layouts/main-nav';

export function SiteHeader() {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='container flex h-14 items-center'>
        <MainNav />
      </div>
    </header>
  );
}
