import { ChangeEvent, memo } from 'react';

interface ITextAreaField {
  id?: string;
  label?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField = ({ id, label, value, onChange }: ITextAreaField) => {
  return (
    <div className="min-w-full">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} value={value} onChange={onChange} name={id} className="textarea w-full focus:outline-0" />
    </div>
  );
};
export default memo(TextAreaField);
