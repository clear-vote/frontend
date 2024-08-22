import React from 'react';
import Link from 'next/link';
// import { useDecisionFlowContext } from "@/context/DecisionFlowContext";

export const Toolbar: React.FC = () => {
  return (
    <>
      <div style={{ justifyContent: 'space-between', padding: '10px', background: '#eee' }}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/discord">Join our discord</Link>
      </div>
    </>
  );
};

export default Toolbar;