interface Iprops {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
export default function Button({ children, onClick, className }: Iprops) {
  return (
    <button className={`btn md:btn-md btn-sm ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
