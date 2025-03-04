import Navbar from '@/components/Navbar';

interface Iprops {
  setShowSideBar: () => void;
}

export default function Header({ setShowSideBar }: Iprops) {
  return (
    <header>
      <Navbar handleShowMenu={() => setShowSideBar()} />
    </header>
  );
}
