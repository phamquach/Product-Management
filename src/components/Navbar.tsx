import { BellRing, LogOut, Menu, User, User2 } from 'lucide-react';
import Button from './Button';
import Input from './Input';

interface IProps {
  handleShowMenu?: () => void;
  isLogin?: boolean;
}

export default function Navbar({ handleShowMenu = () => {}, isLogin = false }: IProps) {
  const buttonClass = 'btn-ghost rounded-field focus:shadow-xl';

  return (
    <div className="navbar gap-3.5 bg-base-100 shadow-sm">
      {/* Menu Button */}
      <div className="flex-none">
        <Button className="btn-square btn-ghost lg:btn-sm" onClick={handleShowMenu} aria-label="Open menu">
          <Menu size={'100%'} />
        </Button>
      </div>

      {/* Search + Actions */}
      <div className="flex-1 flex justify-end items-center gap-2">
        <Input placeholder="Search..." />

        {/* Notifications */}
        <div className="dropdown dropdown-end">
          <Button className={buttonClass} aria-label="Notifications">
            <BellRing />
          </Button>
          <ul
            className="menu dropdown-content bg-base-100 rounded-box z-10 mt-4 w-52 2xl:min-w-xl 2xl:gap-5 2xl:text-3xl p-2 shadow-xl"
            role="menu"
          >
            <li><a href="#">Item 1</a></li>
            <li><a href="#">Item 2</a></li>
          </ul>
        </div>

        {/* User Menu */}
        <div className="dropdown dropdown-end">
          <Button className={buttonClass} aria-label="User menu">
            <User2 />
          </Button>
          {isLogin && (
            <ul
              className="dropdown-content menu bg-base-100 rounded-box z-10 mt-4 w-52 2xl:min-w-xl 2xl:gap-5 2xl:text-3xl p-2 shadow-xl"
              role="menu"
            >
              <li>
                <button>
                  <User />
                  Profile
                </button>
              </li>
              <li>
                <button>
                  <LogOut />
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
