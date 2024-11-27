'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen mx-2">
      <div className="grid grid-cols-3 gap-8 place-content-center">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="centre">Item Cards</CardTitle>
              <CardDescription>
                Create custom item cards for your campaign.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/items">Items</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="centre">Monster Cards</CardTitle>
              <CardDescription>
                Create custom monster cards for your campaign.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/monsters">Monsters</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="centre">Spell Cards</CardTitle>
              <CardDescription>
                Create custom spell cards for your campaign.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/spells">Spells</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
