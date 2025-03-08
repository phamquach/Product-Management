'use client';
import { ReactNode, useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';

interface IProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: IProps) {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div className="h-dvh flex relative ">
      {/* Sidebar */}
      <aside
        className={`absolute z-20 h-full lg:w-64 transition-transform duration-300 
          ${showSideBar ? ' translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar handleShowSideBar={() => setShowSideBar(!showSideBar)} />
      </aside>

      {/* Overlay only visible on mobile devices */}
      {showSideBar && (
        <div
          className="absolute inset-0 z-10 bg-neutral-950 opacity-50 xl:hidden"
          onClick={() => setShowSideBar(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div className={`w-full h-full flex flex-col transition-all duration-300 ${showSideBar ? 'xl:ml-64' : ''}`}>
        <div>
          <Header setShowSideBar={() => setShowSideBar(!showSideBar)} />
        </div>
        <div className="flex-1 px-6 pt-5 pb-2 overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
}
