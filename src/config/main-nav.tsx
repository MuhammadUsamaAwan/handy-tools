import type { MainNavItem } from '@/types';

export const mainNav: MainNavItem[] = [
  {
    title: 'Image Tools',
    items: [
      {
        title: 'Compress Images',
        href: '/compress-images',
        description: 'Compress images of any format.',
        items: [],
      },
      {
        title: 'Convert Images',
        href: '/convert-images',
        description: 'Convert images to other format.',
        items: [],
      },
      {
        title: 'Resize Images',
        href: '/resize-images',
        description: 'Resize images to any size.',
        items: [],
      },
    ],
  },
  {
    title: 'File Tools',
    items: [
      {
        title: 'Files to Base64',
        href: '/files-to-base64',
        description: 'Convert files to base64.',
        items: [],
      },
      {
        title: 'Files from Base64',
        href: '/files-from-base64',
        description: 'Download files from base64.',
        items: [],
      },
    ],
  },
];
