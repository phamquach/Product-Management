import clsx from 'clsx';

interface IProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  title?: string;
}

export default function Button({ children, onClick, className = '', disabled = false, title }: IProps) {
  return (
    <button
      className={clsx('btn 2xl:btn-xl lg:btn-md md:btn-md btn-sm', className)}
      onClick={onClick ? () => onClick() : undefined}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
}
