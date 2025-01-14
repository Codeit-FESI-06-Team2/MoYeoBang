'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import Image from 'next/image';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  // 드롭다운에 표시할 옵션들의 배열
  options: DropdownOption[];
  // 드롭다운 초기 값
  defaultValue?: DropdownOption;
  // 옵션 선택 시 호출되는 콜백 함수
  onChange?: (option: DropdownOption) => void;
  // 추가 스타일링 클래스
  className?: string;
  icon?: string;
}

/**
 * 지역 선택을 위한 드롭다운 컴포넌트
 *
 * @param defaultValue 초기 선택값 (기본값: 지역 전체)
 * @param onChange 선택값 변경 시 호출되는 콜백 함수
 * @param className 추가 스타일링을 위한 클래스명
 */

export default function Dropdown({
  options,
  defaultValue,
  onChange,
  className,
  icon = '/chevron-down.svg',
}: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState<DropdownOption>(
    defaultValue || options[0]
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div
      className={clsx(
        'relative',
        { 'min-w-0 md:min-w-[120px]': icon !== '/chevron-down.svg' },
        { 'min-w-[120px]': icon === '/chevron-down.svg' }
      )}
    >
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
          'gap-[2px]',
          { 'w-full flex-row-reverse': icon !== '/chevron-down.svg' },
          className
        )}
      >
        <span
          className={`${icon !== '/chevron-down.svg' ? 'hidden md:inline-block' : ''} flex-1 text-sm font-medium text-white`}
        >
          {selectedOption.label}
        </span>
        <Image
          src={icon}
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
        <ul
          className={clsx(
            'absolute right-0 z-10 w-[120px]',
            'mt-2',
            'rounded-xl',
            'bg-[#404048]',
            'overflow-hidden shadow-lg'
          )}
        >
          {options.map((option) => (
            <li key={option.value} className="p-0">
              <button
                type="button"
                onClick={() => handleSelect(option)}
                className={clsx(
                  'w-full cursor-pointer px-4 py-2 text-left text-sm',
                  'text-white hover:bg-[#4A4A52]',
                  'transition-colors duration-150'
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export type { DropdownOption };
