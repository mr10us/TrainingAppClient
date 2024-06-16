import React, { useEffect, useRef } from 'react';

export const MainLayout = (props) => {
  const scrollableElRef = useRef(null);

  useEffect(() => {
    const overflow = 100;
    document.body.style.overflowY = 'hidden';
    document.body.style.marginTop = `${overflow}px`;
    document.body.style.height = `${window.innerHeight + overflow}px`;
    document.body.style.paddingBottom = `${overflow}px`;
    window.scrollTo(0, overflow);

    let ts;

    const onTouchStart = (e) => {
      ts = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (scrollableElRef.current) {
        const scroll = scrollableElRef.current.scrollTop;
        const te = e.changedTouches[0].clientY;
        if (scroll <= 0 && ts < te) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    };

    document.documentElement.addEventListener('touchstart', onTouchStart, { passive: false });
    document.documentElement.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      document.documentElement.removeEventListener('touchstart', onTouchStart);
      document.documentElement.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div {...props} style={{ minHeight: '100svh' }} ref={scrollableElRef}>
      {props.children}
    </div>
  );
};
