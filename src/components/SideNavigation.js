'use client';

import { useState } from 'react';
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/solid';
import SignOutButton from './SignOutButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  {
    name: 'Home',
    href: '/account',
    icon: <HomeIcon className="text-primary-600 h-5 w-5" />
  },
  {
    name: 'Reservations',
    href: '/account/reservations',
    icon: <CalendarDaysIcon className="text-primary-600 h-5 w-5" />
  },
  {
    name: 'Guest profile',
    href: '/account/profile',
    icon: <UserIcon className="text-primary-600 h-5 w-5" />
  }
];

function SideNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  return (
    <>
      {/* Toggle Button */}
      <button
        className="bg-primary-900 fixed top-1/2 left-0 z-1000 flex h-12 w-8 items-center justify-center rounded-r-lg text-white shadow-lg transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronLeftIcon className="h-5 w-5" />
        ) : (
          <ChevronRightIcon className="h-5 w-5" />
        )}
      </button>

      {/* Sidebar Navigation */}
      <nav
        className={`${isOpen ? 'bg-primary-800' : 'bg-primary-950'} border-primary-700 fixed top-0 left-0 z-999 h-full w-64 transform border-r shadow-lg transition-transform ${
          isOpen ? 'translate-x-0 delay-200' : '-translate-x-full delay-200'
        } sm:relative sm:w-56 sm:translate-x-0 sm:border-none`}
      >
        <ul className="flex h-full flex-col gap-2 p-4 text-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                className={`hover:bg-primary-900 hover:text-primary-100 text-primary-200 flex items-center gap-4 px-5 py-3 font-semibold transition-colors ${pathName === link.href && 'bg-primary-900'}`}
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
          <li className="mt-auto">
            <SignOutButton />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default SideNavigation;
