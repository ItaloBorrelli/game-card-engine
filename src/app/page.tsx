import Link from 'next/link';
import Monster from '@/pages/monster';
import { Provider } from '@/components/ui/provider';

export default function Home() {
  return (
    <div>
      <Link href="/monsters">
        <Monster />
      </Link>
    </div>
  );
}
