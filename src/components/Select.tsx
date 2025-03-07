import { ChevronDown } from 'lucide-react';
import React, { useState, useEffect, useRef, useCallback, Dispatch, SetStateAction } from 'react';
import Button from './Button';

interface IProps {
  data: Array<string>;
  setChooseCategory: Dispatch<SetStateAction<string>>;
}

export default function CustomSelect({ data, setChooseCategory }: IProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
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

  useEffect(() => {
    setChooseCategory(selected ?? '');
  }, [selected, setChooseCategory]);

  const handleSelect = useCallback((category: string) => {
    setSelected(category);
    setOpen(false);
  }, []);

  const clearSelection = useCallback(() => {
    setSelected(null);
    setOpen(false);
  }, []);

  return (
    <div className="relative min-w-36" ref={dropdownRef}>
      <Button onClick={() => setOpen((prev) => !prev)} className="w-full justify-between bg-base-100 font-light">
        {selected ? data.find((o) => o === selected) : 'Choose a Category'}
        <ChevronDown className="opacity-70" />
      </Button>
      {open && (
        <div className="w-full max-h-[min(24rem,calc(100dvh-200px))] mt-1 absolute overflow-y-scroll bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
          {data.map((opt) => (
            <div
              key={opt}
              onClick={() => handleSelect(opt)}
              className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-600 cursor-pointer transition-colors rounded-md"
            >
              {opt}
            </div>
          ))}
          <div
            onClick={clearSelection}
            className="px-4 py-2 sticky bottom-0 bg-base-100 hover:bg-base-200 cursor-pointer rounded-md border-t border-gray-200"
          >
            Clear Selection
          </div>
        </div>
      )}
    </div>
  );
}
