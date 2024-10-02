import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const Toolbar: React.FC = () => {

  return (
    <div className="w-full fixed top-0 z-100 flex items-center justify-between bg-background px-4 py-2">
      <Link href="/">
        <img src="/branding/favicon.svg" alt="Home" style={{ width: '48px', height: '48px' }} />
      </Link>
      <div className="flex justify-end space-x-4">
        <Link href="/about"><Button variant="ghost">About</Button></Link>
        <Link href="https://medium.com/clearvote" target="_blank"><Button variant="ghost">Blog</Button></Link>
        <Link href="https://discord.gg/A7teH7NV" target="_blank"><Button variant="brand">Join our Discord</Button>
        </Link>
      </div>
    </div>
  );
};

export default Toolbar;