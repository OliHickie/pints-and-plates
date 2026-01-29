'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Nav: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return;
  }

  const links = session
    ? [
        { href: '/', label: 'home' },
        { href: '/dashboard', label: 'dashboard' },
        { href: '/profile', label: 'profile' },
        { href: '/logout', label: 'logout', isLogout: true },
      ]
    : [
        { href: '/', label: 'home' },
        { href: '/login', label: 'login' },
      ];

  return (
    <nav className="bg-background w-full p-4 flex items-center justify-between text-primary font-heading">
      {/* Logo */}
      <div className="flex flex-col font-heading leading-tight">
        <span className="text-4xl md:text-4xl font-extrabold tracking-tight">
          Pints<span className="text-4xl">&</span>
        </span>
        <span className="text-3xl md:text-4xl tracking-tight font-extrabold -mt-3">
          Plates
        </span>
      </div>

      {/* Nav links */}
      <ul className="flex list-none mr-6 space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            {link.isLogout ? (
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="font-bold text-lg transition-colors"
              >
                {link.label}
              </button>
            ) : (
              <Link
                href={link.href}
                className="font-bold text-lg transition-colors"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
