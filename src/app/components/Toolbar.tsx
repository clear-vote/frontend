import React from 'react';
import Link from 'next/link';

export const Toolbar: React.FC = () => {

  return (
    <div className="toolbar" style={{position: 'fixed', zIndex: 100, justifyContent: 'space-between',}}>
        <Link href="/">
          <img src="/branding/favicon.svg" alt="Home" style={{width: '24px', height: '24px'}} />
        </Link>
        <Link href="https://www.youtube.com/watch?v=rv4wf7bzfFE"><h3 className="font-bold">About</h3></Link>
        <Link href="https://medium.com/clearvote"><h3 className="font-bold">Blog</h3></Link>
        <Link href="https://discord.gg/A7teH7NV"><h3 className="font-bold">Join Our Discord</h3></Link>
      </div>
  );
};

export default Toolbar;