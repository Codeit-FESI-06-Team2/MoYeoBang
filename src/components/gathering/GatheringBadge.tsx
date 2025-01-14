import Image from 'next/image';
import clsx from 'clsx';

import { GatheringProps } from '@/types/gathering.types';

const levelIcons = {
  고급: { src: '/icons/level_low.svg', alt: '고급 난이도 아이콘' },
  중급: { src: '/icons/level_low.svg', alt: '중급 난이도 아이콘' },
  초급: { src: '/icons/level_low.svg', alt: '초급 난이도 아이콘' },
};

export default function GatheringBadge({
  icon,
  shape = 'default',
  variant = 'primary',
  className,
  children,
  ...props
}: GatheringProps['badge']) {
  const BadgeClass = clsx(
    'm-0 flex h-[17px]  items-center  px-2 text-center text-[10px] md:h-6 md:text-xs',
    {
      'rounded-full': shape === 'round',
      'rounded-md': shape === 'default',
      'bg-badge-primary': variant === 'primary',
      'bg-badge-secondary': variant === 'secondary',
      'bg-badge-tertiary': variant === 'tertiary',
    }
  );

  return (
    <div className={BadgeClass} {...props}>
      {icon && levelIcons[icon] && (
        <Image
          src={levelIcons[icon].src}
          alt={levelIcons[icon].alt}
          width={24}
          height={24}
          className="mr-1 h-2 w-2 md:h-4 md:w-4 xl:h-3 xl:w-3"
        />
      )}
      {children}
    </div>
  );
}
