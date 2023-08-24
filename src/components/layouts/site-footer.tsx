import { siteConfig } from '@/config/site';
import { Icons } from '@/components/icons';
import { ToggleTheme } from '@/components/layouts/toggle-theme';

export function SiteFooter() {
  return (
    <footer className='border-t'>
      <div className='container flex items-center justify-between py-5'>
        <div className='flex items-center gap-2'>
          <Icons.logo className='h-5 w-5' />
          <p className='text-sm'>
            Copyright &copy; {new Date().getFullYear()} {siteConfig.name}. All right reserved.
          </p>
        </div>
        <div>
          <ToggleTheme />
        </div>
      </div>
    </footer>
  );
}
