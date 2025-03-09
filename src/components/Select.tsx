import { ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef, Dispatch, SetStateAction, useMemo, useCallback } from 'react';
import Button from './Button';

interface IProps {
  data: string[];
  category?: string;
  setChooseCategory: Dispatch<SetStateAction<string>>;
}

export default function Select({ data = [], category, setChooseCategory }: IProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const selectedLabel = useMemo(() => {
    return category && data.includes(category) ? category : 'Choose a Category';
  }, [data, category]);

  return (
    <div className="relative min-w-36 2xl:text-2xl" ref={dropdownRef}>
      <Button onClick={() => setOpen((prev) => !prev)} className="w-full justify-between bg-base-100 font-light 2xl:py-8">
        {selectedLabel}
        <ChevronDown className="opacity-70" />
      </Button>
      {open && (
        <div className="w-full max-h-[min(24rem,calc(100dvh-200px))] mt-1 absolute overflow-y-scroll bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
          {data.length > 0 ? (
            data.map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  setChooseCategory(opt);
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-600 cursor-pointer transition-colors rounded-md"
              >
                {opt}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No categories available</div>
          )}
          <div
            onClick={() => {
              setChooseCategory('');
              setOpen(false);
            }}
            className="px-4 py-2 sticky bottom-0 bg-base-100 hover:bg-base-200 cursor-pointer rounded-md border-t border-gray-200"
          >
            Clear Selection
          </div>
        </div>
      )}
    </div>
  );
}
