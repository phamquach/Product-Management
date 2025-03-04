import ROUTES from '@/lib/routes';
import { X, Home, Users, Box, ShoppingCart, BarChart2, Settings } from 'lucide-react';
import CustomLink from '../customs/cunstomLink';

interface Iprops {
  handleShowSideBar: () => void;
  isDesktop: boolean;
}
const menuItems = [
  { name: 'Dashboard', icon: <Home size={20} />, link: ROUTES.home },
  { name: 'Users', icon: <Users size={20} />, link: ROUTES.users },
  { name: 'Products', icon: <Box size={20} />, link: ROUTES.products },
  { name: 'Orders', icon: <ShoppingCart size={20} />, link: ROUTES.orders },
  { name: 'Analytics', icon: <BarChart2 size={20} />, link: ROUTES.analytics },
  { name: 'Settings', icon: <Settings size={20} />, link: ROUTES.settings },
];

const Sidebar = (props: Iprops) => {
  const { handleShowSideBar, isDesktop } = props;

  return (
    <div className="w-64 flex overflow-hidden">
      <div className={` h-dvh bg-gray-900 text-white w-64 p-5`}>
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button className="block lg:hidden" onClick={handleShowSideBar}>
            <X size={24} />
          </button>
        </div>
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-3">
                <CustomLink
                  href={item.link}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-800"
                  onClick={() => !isDesktop && handleShowSideBar()}
                >
                  {item.icon}
                  <span className="text-sm">{item.name}</span>
                </CustomLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
