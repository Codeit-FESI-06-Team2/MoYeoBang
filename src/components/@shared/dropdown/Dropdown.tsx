'use client';

import { useState, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import Image from 'next/image';

import SlideDownMotion from '@/components/@shared/animation/SlideDownMotion';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  // 드롭다운에 표시할 옵션들의 배열
  options: DropdownOption[];
  // 드롭다운 초기 값
  defaultLabel: string;
  // 옵션 선택 시 호출되는 콜백 함수
  onChange?: (option: DropdownOption) => void;
  // 추가 스타일링 클래스
  className?: string;
  icon?: string;
  selectedValue?: string;
}

/**
 * 지역 선택을 위한 드롭다운 컴포넌트
 *
 * @param defaultLabel 초기 선택 label (EX: 지역)
 * @param onChange 선택값 변경 시 호출되는 콜백 함수
 * @param className 추가 스타일링을 위한 클래스명
 */

export default function Dropdown({
  options,
  defaultLabel,
  onChange,
  className,
  icon = '/icons/chevron-down.svg',
  selectedValue,
}: DropdownProps) {
  const initialOption: DropdownOption = { value: '', label: defaultLabel };

  const [selectedOption, setSelectedOption] =
    useState<DropdownOption>(initialOption);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // selectedValue가 변경될 때 selectedOption 업데이트
  useEffect(() => {
    if (selectedValue === '') {
      setSelectedOption(initialOption);
    } else {
      const selected =
        options.find((option) => option.value === selectedValue) ||
        initialOption;
      setSelectedOption(selected);
    }
  }, [selectedValue, options, initialOption]);

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);

    if (option.value === '') {
      setSelectedOption(initialOption);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const listener = (event: MouseEvent) => handleClickOutside(event);

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={clsx(
        'relative',
        { 'min-w-0 md:max-w-[120px]': icon !== '/icons/chevron-down.svg' },
        { 'max-w-[120px]': icon === '/icons/chevron-down.svg' }
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'h-7 md:h-[42px]',
          'relative',
          'border-2 border-default-tertiary',
          'rounded-xl',
          'px-3 py-2 md:px-4',
          'bg-default-tertiary',
          'flex items-center',
          'gap-2',
          { 'w-full flex-row-reverse': icon !== '/icons/chevron-down.svg' },
          className
        )}
      >
        <span className="flex-1 text-xs font-medium text-text-tertiary md:text-sm">
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
        <SlideDownMotion>
          <ul
            className={clsx(
              'absolute left-0 z-10 w-full max-w-[120px]',
              'mt-2',
              'rounded-xl',
              'bg-secondary-80',
              'overflow-hidden shadow-lg'
            )}
          >
            {options.map((option) => (
              <li key={option.value} className="relative w-full p-1">
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="flex w-full flex-1 cursor-pointer rounded-lg px-3 py-1 text-left text-xs text-white transition-colors duration-150 hover:bg-default-primary md:text-sm "
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </SlideDownMotion>
      )}
    </div>
  );
}

export type { DropdownOption };
