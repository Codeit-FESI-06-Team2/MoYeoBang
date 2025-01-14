import Image from 'next/image';
import Link from 'next/link';

import UserIcon from '@/public/icons/user.svg';
import { formatDate, extractHour } from '@/utils/dateUtils';
import ProgressBar from '@/components/@shared/ProgressBar';
import { GatheringProps } from '@/types/gathering.types';

import AlarmBadge from './AlarmBadge';
import GatheringBadge from './GatheringBadge';
import HeartButton from './HeartButton';

export default function GatheringCard({
  gatheringId,
  location,
  dateTime,
  registrationEnd,
  level,
  name,
  themeName,
  capacity,
  participantCount,
  image,
}: GatheringProps['card']) {
  return (
    <figure className="relative">
      <Link href={`/gathering/${gatheringId}`}>
        <div className="flex max-h-32 w-full rounded-xl bg-brand-tertiary md:max-h-[170px]">
          <AlarmBadge hour={extractHour(registrationEnd)} />
          <Image
            src={image}
            alt="방탈출 테마 이미지"
            width={240}
            height={170}
            quality={100}
            className="w-28 rounded-l-xl bg-brand-secondary md:w-60"
          />
          <div className="mx-3 my-2 flex flex-1 flex-col justify-between md:mx-6 md:my-4">
            <div className="flex justify-between">
              <div className="flex items-center gap-1 text-sm md:gap-[6px]">
                <GatheringBadge
                  icon={level as '고급' | '중급' | '초급'}
                  variant="primary"
                  shape="round"
                >
                  {level}
                </GatheringBadge>
                <GatheringBadge variant="secondary">{location}</GatheringBadge>
                <GatheringBadge variant="tertiary">
                  {formatDate(dateTime)}
                </GatheringBadge>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold md:text-lg">{name}</p>
              <p className="text-xs font-light md:text-sm">{themeName}</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 text-[10px] text-text-secondary md:text-sm">
                <UserIcon />
                <p>
                  {participantCount}/{capacity}
                </p>
                {participantCount !== capacity && (
                  <>
                    <span>·</span>
                    <p>모집중</p>
                  </>
                )}
              </div>
              <ProgressBar max={capacity} value={participantCount} />
            </div>
          </div>
        </div>
      </Link>
      <HeartButton
        gathering={{
          gatheringId,
          location,
          dateTime,
          registrationEnd,
          level,
          name,
          themeName,
          capacity,
          participantCount,
          image,
        }}
      />
    </figure>
  );
}
