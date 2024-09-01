import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const Toolbar: React.FC = () => {

  return (
    <div className="toolbar" style={{ position: 'fixed', zIndex: 100, justifyContent: 'space-between', }}>
      <Link href="/">
        <img src="/branding/favicon.svg" alt="Home" style={{ width: '26px', height: '26px' }} />
      </Link>
      <div className="flex justify-end space-x-4">
        <Link href="/about"><h3 className="font-bold">About</h3></Link>
        <Link href="https://medium.com/clearvote"><p className="font-bold">Blog</p></Link>
        <Link href="https://discord.gg/A7teH7NV">
          <Button style={{height: '25px', transform: "translateY(1px)"}}>Join Our Discord</Button>
        </Link>
      </div>
    </div>
  );
};

export default Toolbar;