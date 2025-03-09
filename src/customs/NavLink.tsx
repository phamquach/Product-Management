'use client';

import Button from '@/components/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx'; // Nếu đã cài thư viện này

interface IProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  styleIsActive?: string;
}

export default function NavLink({
  href,
  children,
  className = '',
  onClick,
  styleIsActive = 'bg-gray-800',
}: IProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  const baseClasses = 'w-full justify-start border-none shadow-none text-white font-light';
  const activeClasses = isActive ? styleIsActive : 'bg-transparent';
  const combinedClasses = clsx(baseClasses, activeClasses, className);

  return isActive ? (
    <Button className={combinedClasses} onClick={onClick}>
      {children}
    </Button>
  ) : (
    <Link href={href} className={`btn 2xl:btn-xl 2xl:text-2xl lg:btn-md md:btn-md btn-sm ${combinedClasses}`} onClick={onClick}>
      {children}
    </Link>
  );
}
