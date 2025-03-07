'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { readItems } from '@directus/sdk';
import directus from '@/lib/directus';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export const revalidate = 60;

const Navbar = () => {
  const [navItems, setNavItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const result = await directus.request(
          readItems('navbar', {
            fields: [
              'nav_items',
              'nav_items.lable',
              'nav_items.path',
              {
                nav_items: [
                  '*',
                  { submenu: ['lable', 'path'] },
                ],
                sort: ['sort'],
              },
            ],
          })
        );
        setNavItems(result?.nav_items ?? []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching navbar items:', error);
        setError('Failed to load navigation items');
        setIsLoading(false);
      }
    };

    fetchNavItems();
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const renderNavItems = () => {
    if (isLoading) return <LoadingPlaceholder />;
    if (error) return <ErrorMessage message={error} />;
    if (navItems.length === 0) return <NoItemsMessage />;

    return (
      <ul className="block space-y-3 lg:space-y-0 py-1 lg:flex sm:space-x-8">
        {navItems.map((item) => (
          <NavItem key={item.lable} item={item} />
        ))}
      </ul>
    );
  };

  return (
    <header className="header py-2 shadow-md fixed top-0 z-40 flex w-full items-center bg-blue3 dark:bg-transparent">
      <div className="mx-auto max-w-[1250px] sm:pr-3 sm:space-x-32 max-sm:px-3 relative w-full flex items-center justify-between">
        <Logo />
        <div className="navbar-links">
          <MobileMenuButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
          <nav
            id="navbarCollapse"
            className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-blue3 py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100
              ${isMobileMenuOpen ? 'visible top-full opacity-100' : 'invisible top-[120%] opacity-0'}
              lg:block`}
          >
            {renderNavItems()}
          </nav>
        </div>
      </div>
    </header>
  );
};

const Logo = () => (
  <div className="w-60 max-w-full">
    <Link href="/" className="header-logo py-1 block w-full hover:scale-105 hover:opacity-80">
      <Image
        src="/images/logo/logo-2.svg"
        alt="logo"
        width={110}
        height={30}
        priority
        className="w-full"
      />
    </Link>
  </div>
);

const MobileMenuButton = ({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
    className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-white focus:ring-2 lg:hidden"
  >
    <span
      className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 dark:bg-white ${
        isOpen ? 'top-[7px] rotate-45' : ''
      }`}
    />
    <span
      className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 dark:bg-white ${
        isOpen ? 'opacity-0' : ''
      }`}
    />
    <span
      className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 dark:bg-white ${
        isOpen ? 'top-[-8px] -rotate-45' : ''
      }`}
    />
  </button>
);

const NavItem = ({ item }) => {
  if (item.submenu?.length > 0) {
    return (
      <li className="relative py-1 text-white group">
        <div className="relative inline-block text-left group">
          <button className="relative text-white group">
            {item.lable}
            <ChevronDownIcon className="h-4 w-4 inline-block ml-2 transform group-hover:rotate-180 transition-transform duration-[400ms]" />
          </button>
          <ul className="lg:invisible max-sm:hidden group-hover:block lg:group-hover:visible lg:group-hover:translate-y-0 lg:translate-y-[40px] lg:absolute z-10 left-0 lg:py-3 lg:border-[.5px] border-body-color/50 lg:mt-1 w-48 rounded-md shadow-lg bg-blue3 opacity-0 group-hover:opacity-100 duration-[400ms] ease-in-out">
            {item.submenu.map((subItem) => (
              <li key={subItem.lable} className="py-1 px-4 hover:bg-blue3/60 hover:text-blue-500">
                <Link href={subItem.path} className="text-white block w-full">
                  {subItem.lable}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li className="relative py-1 text-white group">
      <Link href={item.path} className="relative text-white group">
        {item.lable}
        <span className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-center scale-x-0 bg-white transition-all duration-300 group-focus:scale-x-100 group-hover:scale-x-100" />
      </Link>
    </li>
  );
};

const LoadingPlaceholder = () => (
  <div className="lg:pl-8 container mx-auto flex flex-col items-center justify-between p-2 animate-pulse sm:flex-row">
    <div className="flex space-x-5 items-center justify-center">
      <ul className="block animate-pulse lg:flex sm:space-x-8">
        {[...Array(6)].map((_, i) => (
          <li key={i} className="w-20 h-2 bg-gray-200/40 relative text-white group rounded-lg animate-pulse"></li>
        ))}
      </ul>
    </div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="text-red-500 font-bold">{message}</div>
);

const NoItemsMessage = () => (
  <div className="text-white">No navigation items available</div>
);

export default Navbar;