'use client';
import { ReactNode, useState, useCallback, useMemo } from 'react';
import Sidebar from './sidebar';
import Header from './header';

interface IProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: IProps) {
  const [showSideBar, setShowSideBar] = useState(false);

  // Hàm toggle sidebar tối ưu với useCallback
  const toggleSidebar = useCallback(() => setShowSideBar((prev) => !prev), []);

  // Tính toán className động bằng useMemo
  const mainContentClass = useMemo(
    () => `w-full h-full flex flex-col transition-all duration-300 ${showSideBar ? 'xl:ml-64 2xl:ml-96' : ''}`,
    [showSideBar]
  );

  return (
    <div className="h-dvh flex">
      {/* Sidebar */}
      <div
        className={`absolute z-20 h-full 2xl:w-96 lg:w-64 transition-transform duration-300 
          ${showSideBar ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar handleShowSideBar={toggleSidebar} />
      </div>

      {/* Overlay chỉ hiện trên mobile */}
      {showSideBar && (
        <div
          className="absolute inset-0 z-10 bg-neutral-950 opacity-50 xl:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div className={mainContentClass}>
        <Header setShowSideBar={toggleSidebar} />
        <div className="flex-1 px-6 pt-5 pb-2 overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
}
