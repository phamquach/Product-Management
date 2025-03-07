'use client';

import { useMemo, useState } from 'react';
import { useProducts } from '@/utils/fetchData';
import { useDebounce } from '@/hook/useDebounce';
import Table from '@/components/Table';
import PHeader from './header';
import Search from '@/components/Search';

export default function Products() {
  const { product, isLoading } = useProducts(process.env.NEXT_PUBLIC_API_URL_PRODUCTS ?? '');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [chooseCategory, setChooseCategory] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedChooseTerm = useDebounce(chooseCategory, 500);
  console.log(chooseCategory);
  const filteredProducts = useMemo(() => {
    if (!product) return [];
    const lowerSearchTerm = debouncedSearchTerm.toLowerCase().trim();
    const lowerChooseCategory = debouncedChooseTerm.toLowerCase().trim();
    return product.filter(
      (item: IProducts) =>
        (item.id.toString().toLowerCase().includes(lowerSearchTerm) ||
          item.name.toLowerCase().includes(lowerSearchTerm)) &&
        item.category.toLowerCase().includes(lowerChooseCategory),
    );
  }, [product, debouncedSearchTerm, debouncedChooseTerm]);

  return (
    <div className="flex flex-col gap-y-3">
      <PHeader />
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setChooseCategory={setChooseCategory}
        product={product}
      />
      {isLoading ? (
        <div className="font-bold opacity-70">
          Loading <span className="loading loading-dots loading-xl"></span>
        </div>
      ) : (
        <Table data={filteredProducts} />
      )}
    </div>
  );
}
