'use client';

import Navigation from '@/components/layouts/navigation-bar';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
