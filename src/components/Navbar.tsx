import { BellRing, LogOut, Menu, User, User2 } from 'lucide-react';

interface IProps {
  handleShowMenu: () => void;
}
const isLogin = true;
export default function Navbar({ handleShowMenu }: IProps) {
  return (
    <div className="navbar gap-3.5 bg-base-100 shadow-sm">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={handleShowMenu}>
          <Menu />
        </button>
      </div>

      <div className='flex-1 gap-3.5 flex justify-end'>
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" />
        </label>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost rounded-field focus:shadow-xl">
            <BellRing />
          </div>
          <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-1 mt-4 w-52 p-2 shadow-xl">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost rounded-field focus:shadow-xl">
            <User2 />
          </div>
          {isLogin && (
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 mt-4 w-52 p-2 shadow-xl">
              <li>
                <button>
                  <User size={20} />
                  Profile
                </button>
              </li>
              <li>
                <button>
                  <LogOut size={20} />
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
