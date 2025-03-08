import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Select from './Select';

interface IProps {
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setChooseCategory: Dispatch<SetStateAction<string>>;
  searchTerm: string;
  product: IProducts[];
}

export default function Search({ setSearchTerm, setChooseCategory, product, searchTerm }: IProps) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === ' ') {
      return;
    }
    setSearchTerm(e.target.value);
  };
  return (
    <div className="inline-flex items-center lg:gap-8 gap-2">
      <label className="input">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          value={searchTerm}
          className="grow"
          placeholder="Search product code or name..."
          onChange={handleOnChange}
        />
      </label>
      <Select data={[...new Set(product?.map((item) => item.category))]} setChooseCategory={setChooseCategory} />
    </div>
  );
}
