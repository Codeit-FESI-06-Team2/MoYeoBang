import React, { ForwardedRef } from 'react';
import clsx from 'clsx';

type LoginInputProps = {
  label?: string;
  labelText?: string;
  labelColor?: 'charcoal' | 'gray' | 'white';
  fontSize?: '14' | '16';
  variant?: 'default' | 'elevated';
  gap?: '8' | '12';
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    ref?: ForwardedRef<HTMLInputElement>;
  };
};

const LoginInput = React.forwardRef<HTMLInputElement, LoginInputProps>(
  (
    {
      label,
      labelText,
      labelColor = 'gray',
      placeholder,
      gap = '12',
      fontSize = '14',
      variant = 'elevated',
      isError = false,
      errorMessage,
      inputProps,
      ...props
    },
    ref
  ) => {
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
              'text-point-label': labelColor === 'charcoal',
              'text-secondary-50': labelColor === 'gray',
              'text-white': labelColor === 'white',
            })}
          >
            {labelText || label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          placeholder={placeholder}
          className={clsx(
            'w-full rounded-lg px-4 py-[10px] font-medium outline outline-1',
            '[&:-webkit-autofill]:[transition-delay:9999s]',
            {
              'bg-secondary-5 text-secondary-70 placeholder:text-secondary-50':
                variant === 'default',
              'bg-secondary-100 text-text-default placeholder:text-secondary-70':
                variant === 'elevated',
              'outline-transparent focus-within:outline-default-primary':
                !isError,
              'outline-status-danger focus-within:outline-status-danger':
                isError,
            }
          )}
          {...inputProps}
        />
        {isError && (
          <p className="text-xs font-semibold text-status-danger md:text-sm">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

LoginInput.displayName = 'LoginInput';

export default LoginInput;
