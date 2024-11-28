'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import Link from 'next/link';
import type React from 'react';

const Navigation: React.FC = () => (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <Link href="/" className={navigationMenuTriggerStyle()}>
          <NavigationMenuLink>Home</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
          Cards
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <Link href="/items" className={navigationMenuTriggerStyle()}>
            <NavigationMenuLink>Items</NavigationMenuLink>
          </Link>
          <Link href="/monsters" className={navigationMenuTriggerStyle()}>
            <NavigationMenuLink>Spells</NavigationMenuLink>
          </Link>
          <Link href="/spells" className={navigationMenuTriggerStyle()}>
            <NavigationMenuLink>Monsters</NavigationMenuLink>
          </Link>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

export default Navigation;
