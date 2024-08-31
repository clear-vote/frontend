import React from 'react';
import Link from 'next/link';

export const Toolbar: React.FC = () => {
  return (
    <div className="toolbar" style={{position: 'fixed', zIndex: 100, justifyContent: 'space-between',}}>
        <Link href="/">Home</Link>
        <Link href="https://www.youtube.com/watch?v=rv4wf7bzfFE">About</Link>
        <Link href="https://medium.com/clearvote">Blog</Link>
        <Link href="https://discord.gg/A7teH7NV">Join our discord</Link>
      </div>
  );
};

export default Toolbar;