import Image from 'next/image';

import clsx from 'clsx';

interface AlarmBadgeProps {
  hour: number;
  layout?: 'card' | 'slot';
}

export default function AlarmBadge({ hour, layout = 'card' }: AlarmBadgeProps) {
  return (
    <div
      className={clsx('absolute  flex items-center rounded-full bg-point-tag', {
        'left-2 top-2 h-[17px] pl-1 pr-2 text-[10px] md:h-8 md:px-2 md:text-xs':
          layout === 'card',
        'left-4 top-4 h-8 pl-2 pr-3 text-xs': layout === 'slot',
      })}
    >
      <Image
        src="/icons/alarm.svg"
        alt="알람 아이콘"
        width={24}
        height={24}
        quality={100}
        className={clsx('', {
          'h-[14px] w-[14px] md:h-6 md:w-6': layout === 'card',
          'h-6 w-6': layout === 'slot',
        })}
      />
      <span className="ml-1 ">오늘 {hour}시 마감</span>
    </div>
  );
}
