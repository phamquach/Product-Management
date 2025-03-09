import { ChangeEvent } from 'react';
import clsx from 'clsx';

interface IInput {
  id?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  placeholder?: string;
  showIcon?: boolean;
}

export default function Input({
  id,
  value,
  onChange,
  type = 'text',
  className = '',
  placeholder,
  showIcon = true,
}: IInput) {
  return (
    <label className="input flex items-center gap-2 2xl:min-w-3xl 2xl:min-h-16 2xl:my-5 2xl:text-3xl max-h-8">
      {showIcon && (
        <svg
          className="h-[1em] 2xl:min-h-[1.2em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
      )}
      <input
        type={type}
        required
        placeholder={placeholder}
        onChange={onChange}
        id={id}
        value={value}
        className={clsx('w-full p-2 rounded-md', className)}
      />
    </label>
  );
}