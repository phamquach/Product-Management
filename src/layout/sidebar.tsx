import ROUTES from '@/lib/routes';
import { X, Home, Box, ShoppingCart, BarChart2, Settings } from 'lucide-react';
import NavLink from '../customs/NavLink';
import useIsDesktop from '@/hook/useDesktop';
import Button from '@/components/Button';
import { useCallback, useMemo } from 'react';

interface IProps {
  handleShowSideBar: () => void;
}

const menuItems = [
  { name: 'Dashboard', icon: <Home />, link: ROUTES.home },
  { name: 'Products', icon: <Box />, link: ROUTES.products },
  { name: 'Orders', icon: <ShoppingCart />, link: ROUTES.orders },
  { name: 'Analytics', icon: <BarChart2 />, link: ROUTES.analytics },
  { name: 'Settings', icon: <Settings />, link: ROUTES.settings },
];

export default function Sidebar({ handleShowSideBar }: IProps) {
  const isDesktop = useIsDesktop();

  // Hàm tối ưu click cho mobile
  const handleClick = useCallback(() => {
    if (!isDesktop) handleShowSideBar();
  }, [isDesktop, handleShowSideBar]);

  // ClassName tính toán bằng useMemo
  const sidebarClass = useMemo(() => 'h-dvh bg-gray-900 text-white w-full p-5', []);

  return (
    <aside className="w-full flex overflow-hidden">
      <div className={sidebarClass}>
        <div className="flex justify-between items-center mb-5">
          <h1 className="2xl:text-5xl text-xl font-bold">Admin Panel</h1>
          <Button className="block lg:hidden bg-gray-900 hover:bg-gray-800 text-white border-none shadow-none" onClick={handleShowSideBar}>
            <X size={24} />
          </Button>
        </div>
        <nav>
          <ul>
            {menuItems.map(({ name, icon, link }) => (
              <li key={name} className="mb-3">
                <NavLink
                  href={link}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-800"
                  onClick={handleClick}
                >
                  {icon}
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
