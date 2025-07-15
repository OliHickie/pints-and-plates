import Link from 'next/link';

const Nav: React.FC = () => {

  const links = [
    { href: '/', label: 'Home' },
    { href: '/login', label: 'Login' },
    { href: '/signup', label: 'Sign Up' },
  ];

  return (
    <nav className="bg-primary w-full p-4 flex items-center justify-between">
      <div className="flex flex-col text-accent font-heading leading-tight">
        <span className="text-4xl md:text-4xl font-extrabold tracking-tight">
          Pints<span className="text-4xl">&</span>
        </span>
        <span className="text-3xl md:text-4xl tracking-tight font-extrabold -mt-3">Plates</span>
      </div>

    <ul className="flex list-none text-accent">
      {links.map((link) => (
        <li key={link.href} className="mr-4 last:mr-0">
          <Link href={link.href} className="text-accent font-bold text-lg uppercase hover:text-accent-dark transition-colors">
              {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)};

export default Nav;