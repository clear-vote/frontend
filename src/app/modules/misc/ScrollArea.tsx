import React, { useRef, useEffect } from 'react';

interface ScrollAreaProops {
  children: React.ReactNode;
  positionHook: (scrollPosition: number) => void;
  height?: string;
  width?: string;
}

const ScrollArea = ({ children, positionHook, height = '60vh', width = '100%' }: ScrollAreaProops) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop } = scrollRef.current;
        positionHook(scrollTop); // Pass the scroll position in pixels
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      style={{
        height,
        width,
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollArea;