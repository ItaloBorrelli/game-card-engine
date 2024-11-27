import { Box } from '@chakra-ui/react';
import Link from 'next/link';

export default function Home() {
  return (
    <Box className="grid place-items-center h-screen">
      <Link href="/monster">Monster Cards</Link>
    </Box>
  );
}
