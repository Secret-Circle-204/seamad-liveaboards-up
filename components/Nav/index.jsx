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
            next: {
              revalidate: 50,
            },
          })
        );
        setNavItems(result?.nav_items ?? []);
      } catch (error) {
        console.error('Error fetching navbar items:', error);
        setNavItems([]);
      }
    };

    fetchNavItems();
  }, []);
  // console.log('navItems', navItems)
  return (
    <header className="header py-2 shadow-md fixed top-0 z-40 flex w-full items-center bg-blue3 dark:bg-transparent">
      <div className="mx-auto max-w-[1250px] sm:pr-3 sm:space-x-32 max-sm:px-3 relative w-full flex items-center justify-between">
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

        <div className="navbar-links">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            id="navbarToggler"
            aria-label="Mobile Menu"
            className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-white focus:ring-2 lg:hidden"
          >
            <span
              className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 dark:bg-white ${isMobileMenuOpen ? 'top-[7px] rotate-45' : ''
                }`}
            />
            <span
              className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 dark:bg-white ${isMobileMenuOpen ? 'opacity-0' : ''
                }`}
            />
            <span
              className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 dark:bg-white ${isMobileMenuOpen ? 'top-[-8px] -rotate-45' : ''
                }`}
            />
          </button>

          <nav
            id="navbarCollapse"
            className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-blue3 py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${isMobileMenuOpen ? 'visible top-full opacity-100' : 'invisible top-[120%] opacity-0'
              } lg:block`}
          >
            {/* id="navbarCollapse"
            className={`navbar relative z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-blue3 py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
              isMobileMenuOpen ? 'block' : 'hidden'
            } lg:block`}  */}

            <ul className="block space-y-3 lg:space-y-0  py-1 lg:flex sm:space-x-8">
              {navItems.length > 0 ? (
                navItems.map((item) => (
                  <li key={item?.lable} className="relative py-1 text-white group">
                    {item?.submenu?.length > 0 ? (
                      <div className="relative   inline-block text-left group">
                        <button className="relative text-white   group">
                          {item?.lable}
                          <ChevronDownIcon className="h-4 w-4 inline-block ml-2 transform group-hover:rotate-180 transition-transform duration-[400ms]" />
                        </button>

                        <ul
                          className="
                           lg:invisible
                            max-sm:hidden
                            group-hover:block 
                            lg:group-hover:visible
                            lg:group-hover:translate-y-0 lg:translate-y-[40px]
                            lg:absolute z-10 left-0 lg:py-3 lg:border-[.5px] border-body-color/50 lg:mt-1 w-48 rounded-md shadow-lg bg-blue3 
                              opacity-0 group-hover:opacity-100 
                             duration-[400ms] ease-in-out
                          "
                        >
                          {item.submenu.map((subItem) => (
                            <li key={subItem.lable} className="py-1 px-4 hover:bg-blue3/60 hover:text-blue-500">
                              <Link href={subItem?.path} className="text-white block w-full">
                                {subItem?.lable}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Link
                        href={item?.path}
                        className="relative text-white group"
                      >
                        {item?.lable}
                        <span
                          id="active"

                          className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-center scale-x-0 bg-white transition-all duration-300 group-focus:scale-x-100 group-hover:scale-x-100" />
                      </Link>
                    )}
                  </li>
                ))
              ) : (
                // Loading or Placeholder State
                <div className="lg:pl-8 container mx-auto flex flex-col items-center justify-between p-2 animate-pulse sm:flex-row">
                  <div
                    id="navbarCollapse"
                    className={`
                        flex space-x-5 items-center justify-center 
                        navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-blue3 px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${isMobileMenuOpen
                        ? 'visible top-full opacity-100'
                        : 'invisible top-[120%] opacity-0'
                      }`}
                  >
                    <ul className="block animate-pulse lg:flex sm:space-x-8">
                      {[...Array(6)].map((_, i) => (
                        <li
                          key={i}
                          className="w-20 h-2 bg-gray-200/40 relative text-white group rounded-lg animate-pulse"
                        ></li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;