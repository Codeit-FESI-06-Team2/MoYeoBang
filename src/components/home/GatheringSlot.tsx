import Image from 'next/image';
import Link from 'next/link';

import UserIcon from '@/public/icons/user.svg';
import { extractHour } from '@/utils/dateUtils';
import { GatheringProps } from '@/types/gathering.types';

import AlarmBadge from '@/components/gathering/UI/AlarmBadge';
import PuzzleButton from '@/components/gathering/PuzzleButton';

export default function GatheringSlot({
  gatheringId,
  registrationEnd,
  name,
  capacity,
  participantCount,
  image,
}: GatheringProps['slot']) {
  return (
    <figure className="relative col-span-1 row-span-1 max-h-80 w-full rounded-2xl bg-black md:max-h-96 xl:max-h-[317px] xl:max-w-[358px]">
      <Link href={`/gathering/${gatheringId}`}>
        <AlarmBadge layout="slot" hour={extractHour(registrationEnd)} />
        <Image
          src={image}
          alt="방탈출 테마 이미지"
          width={358}
          height={317}
          quality={100}
          className="h-full w-full rounded-2xl object-cover"
        />
        <div className="absolute bottom-16 left-4 flex items-center gap-1 rounded-full bg-secondary-80 py-[2px] pl-2 pr-3 text-sm text-text-secondary md:text-sm">
          <UserIcon />
          <p>
            {participantCount}/{capacity}
          </p>
        </div>
        <p className="absolute bottom-0 w-full rounded-b-2xl bg-default-tertiary px-5 py-[10px] text-base font-semibold text-secondary-10 md:text-lg">
          {name}
        </p>
      </Link>
      <PuzzleButton
        layout="slot"
        gathering={{
          gatheringId,
          registrationEnd,
          name,
          capacity,
          participantCount,
          image,
          dateTime: '',
          level: '',
          themeName: '',
          location: '',
        }}
      />
    </figure>
  );
}
