'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
export default function Home() {
  return (
    <Button asChild>
      <Link href="/monster">Monster Cards</Link>
    </Button>
  );
}
