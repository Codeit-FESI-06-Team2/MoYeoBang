import clsx from 'clsx';

type ButtonProps = {
  variant?:
    | 'primary'
    | 'primary-gray'
    | 'secondary'
    | 'tertiary'
    | 'tertiary-gray'
    | 'grayscale';
  type?: 'button' | 'submit' | 'reset';
  padding?: '12' | '10' | '8';
  fontSize?: '16' | '14';
  fontWeight?: '600' | '500';
  shape?: 'default' | 'round';
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'button'>;

/**
 * ButtonProps Details
 *
 * @param variant 6가지 버튼 테마, 기본 값 없이 커스텀 가능
 * @param type 버튼 타입, 기본 값 button
 * @param shape 버튼 모양, 기본 값 12px 라운드
 * @param padding 버튼 내부 패딩, 기본 값 10px
 * @param fontSize 글자 크기, 기본 값 16px
 * @param fontWeight 글자 굵기, 기본 값 500
 */

export default function Button({
  type = 'button',
  fontSize = '16',
  fontWeight = '500',
  padding = '10',
  variant = 'primary-gray',
  shape = 'default',
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const buttonClass = clsx(
    'text-center',
    {
      'bg-default-primary text-text-default hover:bg-primary-30 focus:bg-primary-50':
        !disabled && (variant === 'primary' || variant === 'primary-gray'),
      'bg-default-secondary text-default-primary hover:bg-primary-0 hover:text-primary-30 focus:bg-default-primary focus:text-text-default':
        !disabled && variant === 'secondary',
      'border-[1px] border-default-primary bg-white  text-default-primary hover:border-primary-30 hover:text-primary-30 focus:border-primary-80 focus:text-primary-80':
        !disabled && variant === 'tertiary',
      'border-[1px] border-secondary-60 bg-transparent text-secondary-60 hover:border-default-primary hover:text-default-primary':
        !disabled && variant === 'tertiary-gray',
      'bg-default-tertiary text-text-default hover:bg-secondary-80 focus:bg-secondary-bg':
        !disabled && variant === 'grayscale',
      'bg-primary-80 text-secondary-60': disabled && variant === 'primary',
      'bg-status-disabled text-text-default':
        disabled && variant === 'primary-gray',
      'bg-secondary-30 text-text-default': disabled && variant === 'secondary',
      'border-[1px] border-status-disabled text-status-disabled':
        disabled && (variant === 'tertiary' || variant === 'tertiary-gray'),
      'bg-secondary-60 text-text-default': disabled && variant === 'grayscale',
      'text-base': fontSize === '16',
      'text-sm': fontSize === '14',
      'font-semibold': fontWeight === '600',
      'font-medium': fontWeight === '500',
      'p-3':
        padding === '12' &&
        variant !== 'tertiary' &&
        variant !== 'tertiary-gray',
      'px-4 py-[10px]':
        padding === '10' &&
        variant !== 'tertiary' &&
        variant !== 'tertiary-gray',
      'p-2':
        padding === '8' &&
        variant !== 'tertiary' &&
        variant !== 'tertiary-gray',
      'p-[11px]':
        padding === '12' &&
        (variant === 'tertiary' || variant === 'tertiary-gray'),
      'p-[9px] px-[15px]':
        padding === '10' &&
        (variant === 'tertiary' || variant === 'tertiary-gray'),
      'p-[7px]':
        padding === '8' &&
        (variant === 'tertiary' || variant === 'tertiary-gray'),
      'rounded-full': shape === 'round',
      'rounded-lg': shape === 'default',
    },
    className
  );

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={buttonClass} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
