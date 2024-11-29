'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import type React from 'react';

const NavigationBar: React.FC = () => (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink href="/">Home</NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Cards</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="/items">Items</NavigationMenuLink>
          <NavigationMenuLink href="/monsters">Monsters</NavigationMenuLink>
          <NavigationMenuLink href="/spells">Spells</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

export default NavigationBar;
