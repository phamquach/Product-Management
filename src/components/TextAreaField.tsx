import { ChangeEvent, memo } from 'react';

interface ITextAreaField {
  id?: string;
  label?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  maxLength?: number;
}

const TextAreaField = ({
  id = 'textarea-field',
  label = 'Enter text',
  value,
  onChange,
  placeholder = 'Type here...',
  rows = 4,
  disabled = false,
  maxLength,
}: ITextAreaField) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        maxLength={maxLength}
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        aria-labelledby={label ? id : undefined}
      />
    </div>
  );
};

export default memo(TextAreaField);
