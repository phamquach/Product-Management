'use client';

import { useMemo, useState } from 'react';
import { useProducts } from '@/utils/fetchData';
import { useDebounce } from '@/hook/useDebounce';
import PHeader from './header';
import Search from '@/components/Search';
import Pagination from '@/components/Pagination';

export default function Products() {
  const { data = [], isLoading } = useProducts(process.env.NEXT_PUBLIC_API_URL_PRODUCTS ?? '');
  const [searchTerm, setSearchTerm] = useState('');
  const [chooseCategory, setChooseCategory] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 800);
  const debouncedChooseTerm = useDebounce(chooseCategory, 800);

  const filteredProducts = useMemo(() => {
    if (!debouncedSearchTerm && !debouncedChooseTerm) return data;

    const lowerSearchTerm = debouncedSearchTerm.trim().toLowerCase();
    const lowerChooseCategory = debouncedChooseTerm.trim().toLowerCase();

    return data.filter(({ id, name, category }: IProducts) => {
      const matchSearch = lowerSearchTerm
        ? id.toString().includes(lowerSearchTerm) || name.toLowerCase().includes(lowerSearchTerm)
        : true;

      const matchCategory = lowerChooseCategory
        ? category.toLowerCase().includes(lowerChooseCategory)
        : true;

      return matchSearch && matchCategory;
    });
  }, [data, debouncedSearchTerm, debouncedChooseTerm]);

  return (
    <div className="flex flex-col gap-3">
      <PHeader />
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        chooseCategory={chooseCategory}
        setChooseCategory={setChooseCategory}
        product={data}
      />
      {isLoading ? (
        <div className="font-bold opacity-70">
          Loading <span className="loading loading-dots loading-xl"></span>
        </div>
      ) : (
        <Pagination data={filteredProducts} pageSize={20} />
      )}
    </div>
  );
}