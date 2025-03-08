import { useEffect, useState } from 'react';
import Table from './Table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface IProps {
  pageSize: number;
  data: IProducts[];
}

export default function Pagination({ data, pageSize }: IProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Chia mảng data thành các trang
  const numberPage = Math.ceil(data?.length / pageSize);
  const paginatedData = Array.from({ length: numberPage }, (_, index) =>
    data.slice(index * pageSize, (index + 1) * pageSize),
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numberPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (data.length === 0) {
    return <div className="text-center">No results found</div>;
  }

  return (
    <>
      <Table data={paginatedData[currentPage - 1]} />
      <div className="w-full flex gap-2 justify-end my-2">
        <button className="btn-xs btn" onClick={handlePreviousPage} disabled={currentPage === 1}>
          <ChevronLeft />
        </button>
        <div className="flex gap-1">
          {paginatedData.map((_, index) => (
            <button
              key={index}
              className={`btn-xs btn ${currentPage === index + 1 ? 'btn-primary' : ''}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button className="btn-xs btn" onClick={handleNextPage} disabled={currentPage === numberPage}>
          <ChevronRight />
        </button>
      </div>
    </>
  );
}
