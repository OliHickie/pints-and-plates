'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Nav: React.FC = () => {

  const { data: session } = useSession();

  const links = session
    ? [
      { href: '/', label: 'home' },
      { href: '/dashboard', label: 'dashboard' },
      { href: '/profile', label: 'profile' },
      { href: '/logout', label: 'logout' },
    ]
    : [
      { href: '/', label: 'home' },
      { href: '/login', label: 'login' },
    ];

  return (
    <nav className="bg-background w-full p-4 flex items-center justify-between text-primary font-heading">
      {/* TODO: Replace the text logo with an SVG logo for better scalability and branding */}
      <div className="flex flex-col font-heading leading-tight">
        <span className="text-4xl md:text-4xl font-extrabold tracking-tight">
          Pints<span className="text-4xl">&</span>
        </span>
        <span className="text-3xl md:text-4xl tracking-tight font-extrabold -mt-3">Plates</span>
      </div>

      <ul className="flex list-none mr-6 space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className=" font-bold text-lg transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;