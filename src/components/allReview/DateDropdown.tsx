'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import Image from 'next/image';
import CustomCalendar from '../@shared/CustomCalendar';

interface DateDropdownProps {
  onDateChange(date: string): void;
}

export default function DateDropdown({ onDateChange }: DateDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={clsx('relative min-w-[120px]')}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'h-[42px] w-[120px]',
          'relative',
          'border-2 border-[#808080]',
          'rounded-xl',
          'px-4 py-2',
          'bg-[#2C2C2C]',
          'flex items-center',
          'gap-[2px]'
        )}
      >
        <p className="flex-1 text-sm font-medium text-white">날짜 전체</p>
        <Image
          src="/chevron-down.svg"
          width={16}
          height={8}
          alt="dropdown arrow"
          className={clsx(
            'transition-transform duration-300 ease-in-out',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <CustomCalendar
          isOpen={isOpen}
          onClose={handleChange}
          onDateChange={onDateChange}
          layout="top-12"
        />
      )}
    </div>
  );
}
