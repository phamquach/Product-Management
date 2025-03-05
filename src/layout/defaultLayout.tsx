'use client';
import { ReactNode, useEffect, useState } from 'react';
import Sidebar from './sidebar';
import useIsDesktop from '@/hook/useDesktop';
import Header from './header';

interface IProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: IProps) {
  const isDesktop = useIsDesktop();
  const [showSideBar, setShowSideBar] = useState(true);

  useEffect(() => {
    setShowSideBar(isDesktop);
  }, [isDesktop]);

  return (
    <div className="h-dvh flex relative ">
      {/* Sidebar */}
      <aside
        className={`absolute z-20 h-full lg:w-64 transition-transform duration-300 
          ${showSideBar ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar handleShowSideBar={() => setShowSideBar(!showSideBar)} isDesktop={isDesktop} />
      </aside>

      {/* Overlay only visible on mobile devices */}
      {showSideBar && !isDesktop && (
        <div
          className="absolute inset-0 z-10 bg-neutral-950 opacity-50 lg:hidden"
          onClick={() => setShowSideBar(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div className={`w-full h-full  transition-all duration-300 ${showSideBar ? 'lg:ml-64' : ''}`}>
        <Header setShowSideBar={() => setShowSideBar(!showSideBar)} />
        <div className="body">{children}</div>
      </div>
    </div>
  );
}
