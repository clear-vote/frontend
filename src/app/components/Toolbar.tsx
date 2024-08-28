import React from 'react';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';

export const Toolbar: React.FC = () => {
  return (
    <>
    {/**Fancy stlying stuff to make sure that it stays at the top of the page */}
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px',
      background: '#f0f0f0',
    }}>
        <Link href="/">Home</Link>
        <Link href="https://www.youtube.com/watch?v=rv4wf7bzfFE">About</Link>
        <Link href="https://medium.com/clearvote">Blog</Link>
        <Link href="https://discord.gg/A7teH7NV">Join our discord</Link>
      </div>
    </>
  );
};

export default Toolbar;