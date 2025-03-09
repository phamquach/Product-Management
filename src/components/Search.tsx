import { ChangeEvent, Dispatch, SetStateAction, useMemo } from 'react';
import Select from './Select';
import Input from './Input';

interface IProps {
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setChooseCategory: Dispatch<SetStateAction<string>>;
  searchTerm: string;
  product: IProducts[];
  chooseCategory: string;
}

export default function Search({ setSearchTerm, setChooseCategory, product = [], searchTerm, chooseCategory }: IProps) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value !== searchTerm) {
      setSearchTerm(value);
    }
  };

  // Tránh lỗi khi product undefined hoặc rỗng
  const categories = useMemo(() => {
    return product.length > 0 ? [...new Set(product.map((item) => item.category))] : [];
  }, [product]);

  return (
    <div className="inline-flex items-center lg:gap-8 gap-2">
      <Input placeholder="Search product code or name..." type="search" value={searchTerm} onChange={handleOnChange} />
      <Select data={categories} setChooseCategory={setChooseCategory} category={chooseCategory} />
    </div>
  );
}
