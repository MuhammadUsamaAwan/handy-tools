'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { MainNavItem } from '@/types';

import { mainNav } from '@/config/main-nav';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/use-debounce';
import { Button } from '@/components/ui/button';
import { CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Icons } from '@/components/icons';

export function SearchBox() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [data, setData] = useState<{ name: string; href: string }[]>([]);

  useEffect(() => {
    function search() {
      if (debouncedQuery === '') {
        setData([]);
        return;
      }
      const results: typeof data = [];
      function searchInItems(item: MainNavItem) {
        if (item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) && item.href) {
          results.push({ name: item.title, href: item.href });
        }
        if ('items' in item && item.items) {
          for (const childItem of item.items) {
            searchInItems(childItem);
          }
        }
      }
      for (const mainItem of mainNav) {
        searchInItems(mainItem);
      }
      setData(results);
    }
    search();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(isOpen => !isOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = useCallback((callback: () => unknown) => {
    setIsOpen(false);
    callback();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  return (
    <>
      <Button
        variant='outline'
        className='relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2'
        onClick={() => setIsOpen(true)}
      >
        <Icons.search className='h-4 w-4 xl:mr-2' aria-hidden='true' />
        <span className='hidden xl:inline-flex'>Search...</span>
        <kbd className='pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex'>
          <span className='text-base'>⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder='Search...' value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty className={cn(query !== '' && data.length === 0 ? 'hidden' : 'py-6 text-center text-sm')}>
            No match found.
          </CommandEmpty>
          {data?.map(item => (
            <CommandItem key={item.href} onSelect={() => handleSelect(() => router.push(`/product/${item.href}`))}>
              {item.name}
            </CommandItem>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
