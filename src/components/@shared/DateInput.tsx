import React from 'react';

import Image from 'next/image';
import clsx from 'clsx';

type DateInputProps = {
  label?: string;
  labelText?: string;
  fontSize?: '14' | '16';
  varient?: 'default' | 'elevated';
  gap?: '8' | '12';
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

/**
 * DateInputProps Details
 *
 * @param labelText label값과 화면에 표시되는 Text를 다르게 설정할 경우 사용
 * @param fontSize 전체 글자 사이즈
 * @param varient label과 input의 테마, default와 elevated 중 설정 가능
 * @param gap label, input, errorMessage 세 요소 사이의 간격
 * @param isError 에러 존재 여부
 * @param errorMessage 에러가 존재할 경우 표시할 에러 메세지
 */

export default function DateInput({
  label,
  labelText,
  placeholder,
  gap = '12',
  fontSize = '16',
  varient = 'default',
  isError = false,
  errorMessage,
  inputProps,
  ...props
}: DateInputProps) {
  const inputId = React.useId();

  return (
    <div
      className={clsx('flex w-full flex-col items-start', {
        'gap-3': gap === '12',
        'gap-2': gap === '8',
        'text-sm': fontSize === '14',
        'text-md': fontSize === '16',
      })}
      {...props}
    >
      {label && (
        <label
          htmlFor={inputId}
          className={clsx('font-semibold', {
            'text-point-label': varient === 'default',
            'text-secondary-50': varient === 'elevated',
          })}
        >
          {labelText || label}
        </label>
      )}
      <div className="relative w-full">
        <Image
          src="/icons/calendar.svg"
          alt="캘린더 아이콘"
          width={18}
          height={20}
          className="absolute bottom-3 left-4"
        />
        <input
          id={inputId}
          placeholder={placeholder}
          className={clsx(
            'w-full rounded-lg px-4 py-[10px] pl-11 font-medium outline outline-1',
            {
              'bg-secondary-5 text-secondary-70 placeholder:text-secondary-50':
                varient === 'default',
              'bg-secondary-100 text-text-default placeholder:text-secondary-70':
                varient === 'elevated',
              'outline-transparent focus-within:outline-default-primary':
                !isError,
              'outline-status-danger focus-within:outline-status-danger':
                isError,
            }
          )}
          {...inputProps}
        />
      </div>
      {isError && (
        <p className="text-xs font-semibold text-status-danger md:text-sm">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
