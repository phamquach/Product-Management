import { Ellipsis, Menu } from 'lucide-react';

interface IProps {
  handleShowMenu: () => void;
}

export default function Navbar({ handleShowMenu }: IProps) {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={handleShowMenu}>
          <Menu />
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <Ellipsis />
        </button>
      </div>
    </div>
  );
}
