import { MainNav } from '@/components/layouts/main-nav';
import { MobileNav } from '@/components/layouts/mobile-nav';
import { SearchBox } from '@/components/layouts/searchbox';

export function SiteHeader() {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='container flex h-14 items-center'>
        <MainNav />
        <MobileNav />
        <div className='flex flex-1 items-center justify-end'>
          <SearchBox />
        </div>
      </div>
    </header>
  );
}
