import Navigation from '@/lib/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
