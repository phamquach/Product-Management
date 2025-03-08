import { ChangeEvent, memo } from 'react';
interface IInputField {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const InputField = ({ id, label, value, onChange, type = 'text' }: IInputField) => {
  return (
    <div className="flex-1 min-w-fit max-w-md">
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
      <br />
      <input onChange={onChange} value={value} id={id} name={id} type={type} className="input focus:outline-0 w-full" />
    </div>
  );
};
export default memo(InputField);
