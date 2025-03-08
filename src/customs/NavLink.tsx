'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Iprops {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  styleIsActive?: string;
}

export default function NavLink({ href, children, className = '', onClick, styleIsActive = 'bg-gray-800' }: Iprops) {
  const pathname = usePathname();

  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
  const classes = [className, isActive ? styleIsActive : ''].filter(Boolean).join(' ');

  if (isActive) {
    return (
      <span className={classes} onClick={onClick}>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
