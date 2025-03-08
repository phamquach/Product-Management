interface IInputField {
  id: string;
  label: string;
  type?: string;
}

const Input = ({ id, label, type = 'text' }: IInputField) => (
  <div className="flex-1 min-w-fit max-w-md">
    <label htmlFor={id} className="cursor-pointer">
      {label}
    </label>
    <br />
    <input id={id} name={id} type={type} className="input focus:outline-0 w-full" />
  </div>
);
export default Input;
