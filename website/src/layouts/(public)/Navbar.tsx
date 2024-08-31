/* eslint-disable react/no-unescaped-entities */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ModeToggle } from '@/components/common/ModeToggle';
import { Zap, Book, Palette, GitBranch, ExternalLink, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ListItem } from '@/components/common/ListItem';

const features = [
  {
    title: 'Quick Start',
    description: 'Get up and running in minutes with our easy-to-follow guide.',
    icon: <Zap className="h-6 w-6 text-yellow-500" />,
    href: '/docs/quick-start',
  },
  {
    title: 'Templates',
    description: 'Explore our collection of pre-built project templates.',
    icon: <Palette className="h-6 w-6 text-indigo-500" />,
    href: '/docs/templates',
  },
  {
    title: 'Customization',
    description: 'Learn how to tailor Clixor to fit your unique workflow.',
    icon: <GitBranch className="h-6 w-6 text-green-500" />,
    href: '/docs/customization',
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600"
        >
          Clixor
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Book className="h-6 w-6 text-purple-500 mb-2" />
                          <div className="mb-2 mt-4 text-lg font-medium text-purple-600 dark:text-purple-300">
                            Clixor Documentation
                          </div>
                          <p className="text-sm leading-tight text-purple-700 dark:text-purple-200">
                            Comprehensive guides and API references to help you make the most of
                            Clixor.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    {features.map((feature) => (
                      <ListItem
                        key={feature.title}
                        title={feature.title}
                        href={feature.href}
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center">
                          {feature.icon}
                          <span className="ml-2">{feature.description}</span>
                        </div>
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className="hover:text-purple-500 transition-colors">
                    Documentation
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button
            asChild
            variant="outline"
            className="border-purple-500 text-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900/20"
          >
            <Link href="https://github.com/Youssefbaghr/Clixor" className="flex items-center">
              <ExternalLink className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
          <ModeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate through Clixor's features and documentation.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-4">
                <Link
                  href="/docs"
                  className="text-lg font-medium hover:text-purple-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Documentation
                </Link>
                {features.map((feature) => (
                  <Link
                    key={feature.title}
                    href={feature.href}
                    className="flex items-center space-x-2 text-lg font-medium hover:text-purple-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {feature.icon}
                    <span>{feature.title}</span>
                  </Link>
                ))}
                <Button
                  asChild
                  variant="outline"
                  className="border-purple-500 text-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900/20"
                >
                  <Link href="https://github.com/Youssefbaghr/Clixor" className="flex items-center">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
