import { useEffect, useState, useMemo } from 'react';
import Table from './Table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface IProps {
  pageSize: number;
  data: IProducts[];
}

export default function Pagination({ data = [], pageSize }: IProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Tính số trang
  const numberPage = Math.ceil(data.length / pageSize);

  // Tính dữ liệu cho từng trang
  const paginatedData = useMemo(
    () => data.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [data, pageSize, currentPage]
  );

  // Reset về trang đầu khi dữ liệu thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, numberPage));

  if (data.length === 0) {
    return <div className="text-center">No results found</div>;
  }

  return (
    <>
      <Table data={paginatedData} />
      <div className="w-full flex gap-2 justify-end my-2">
        {/* Nút Previous */}
        <button className="btn xl:btn-sm btn-xs" onClick={handlePreviousPage} disabled={currentPage === 1}>
          <ChevronLeft />
        </button>

        {/* Số trang */}
        <div className="flex gap-1">
          {Array.from({ length: numberPage }, (_, index) => (
            <button
              key={index}
              className={`btn-xs xl:btn-sm btn ${currentPage === index + 1 ? 'btn-primary' : ''}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Nút Next */}
        <button className="btn xl:btn-sm btn-xs" onClick={handleNextPage} disabled={currentPage === numberPage}>
          <ChevronRight />
        </button>
      </div>
    </>
  );
}
