import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const PageTransitions = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      router.events.on('routeChangeStart', () => {
        setIsTransitioning(true);
      });

      router.events.on('routeChangeComplete', () => {
        setIsTransitioning(false);
      });
    }
  }, [router]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="page-transitions">
          {/* Add your transition animation here */}
        </div>
      )}
    </AnimatePresence>
  );
};

export default PageTransitions;
