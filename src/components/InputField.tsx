import { ChangeEvent, memo } from 'react';
import clsx from 'clsx';

interface IInputField {
  id?: string;
  label?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  placeholder?: string;
}

const InputField = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  className = '',
  placeholder,
}: IInputField) => {
  return (
    <div className="flex flex-col flex-1 min-w-fit max-w-md 2xl:min-w-[40%] 2xl:max-w-full 2xl:gap-3 2xl:text-5xl">
      {label && (
        <label htmlFor={id} className="cursor-pointer">
          {label}
        </label>
      )}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx('input w-full 2xl:min-h-24 2xl:text-4xl', className)}
      />
    </div>
  );
};

export default memo(InputField);
