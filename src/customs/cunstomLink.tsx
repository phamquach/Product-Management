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

export default function CustomLink({ href, children, className, onClick, styleIsActive = 'bg-gray-800' }: Iprops) {
  const pathname = usePathname();
  const isActive = pathname === href;
  if (isActive) {
    return (
      <span className={className + ` ${isActive ? styleIsActive : ''}`} onClick={onClick}>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} className={className + ` ${isActive ? styleIsActive : ''}`} onClick={onClick}>
      {children}
    </Link>
  );
}
