'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

export default function NavBar({ avatar = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  return (
    <nav className="z-10 p-4 text-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Desktop Menu */}
        <ul className="hidden items-center gap-8 md:flex">
          <li
            className={`${pathName === '/cabins' && 'text-accent-400 border-b'}`}
          >
            <Link
              href="/cabins"
              className="hover:text-accent-400 transition-colors"
            >
              Cabins
            </Link>
          </li>
          <li
            className={`${pathName === '/about-us' && 'text-accent-400 border-b'}`}
          >
            <Link
              href="/about-us"
              className="hover:text-accent-400 transition-colors"
            >
              About Us
            </Link>
          </li>
          <li
            className={`${pathName === '/account' && 'text-accent-400 border-b'}`}
          >
            <Link
              href="/account"
              className="hover:text-accent-400 flex gap-3 transition-colors"
            >
              {avatar}
              <span className="mt-1">Guest Area</span>
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="bg-primary-950 fixed top-22 right-0 flex w-screen flex-col items-center justify-center gap-4 p-4 md:hidden">
          <li
            className={`${pathName === '/cabins' && 'text-accent-400 border-b'}`}
          >
            <Link
              href="/cabins"
              className="hover:text-accent-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Cabins
            </Link>
          </li>
          <li
            className={`${pathName === '/about-us' && 'text-accent-400 border-b'}`}
          >
            <Link
              href="/about-us"
              className="hover:text-accent-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
          </li>
          <li
            className={`${pathName === '/account' && 'text-accent-400 border-b'}`}
          >
            <Link
              href="/account"
              className="hover:text-accent-400 flex gap-3 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {avatar}
              <span className="mt-1">Guest Area</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
