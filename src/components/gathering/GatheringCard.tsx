/* eslint-disable prettier/prettier */

import Image from 'next/image';
import Link from 'next/link';

import UserIcon from '@/public/icons/user.svg';
import { formatDate, extractHour } from '@/utils/dateUtils';
import { findLabelByValue } from '@/utils/mappingUtils';
import ProgressBar from '@/components/@shared/ProgressBar';
import { GatheringProps } from '@/types/gathering.types';
import { locationList, levelToKorean } from '@/constants/themeList';

import AlarmBadge from './UI/AlarmBadge';
import GatheringBadge from './UI/GatheringBadge';
import PuzzleButton from './PuzzleButton';

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
        <div className="flex max-h-28 w-full rounded-xl bg-default-tertiary md:max-h-[170px]">
          <AlarmBadge hour={extractHour(registrationEnd)} />
          <Image
            src={image}
            alt="방탈출 테마 이미지"
            width={240}
            height={170}
            quality={100}
            className="w-28 rounded-l-xl bg-default-tertiary object-cover md:w-60"
          />
          <div className="mx-3 my-2 flex flex-1 flex-col justify-between md:mx-6 md:my-4">
            <div className="flex justify-between">
              <div className="flex items-center gap-1 text-sm md:gap-[6px]">
                <GatheringBadge
                  icon={level as 'high' | 'middle' | 'low'}
                  variant="secondary"
                  shape="round"
                  border="primary"
                  fontColor="primary"
                >
                  {levelToKorean[level]}
                </GatheringBadge>
                <GatheringBadge variant="primary" fontColor="secondary">
                  {findLabelByValue(location, locationList)}
                </GatheringBadge>
                <GatheringBadge variant="primary" fontColor="secondary">
                  {formatDate(dateTime)}
                </GatheringBadge>
              </div>
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="text-sm font-semibold text-secondary-5 md:text-lg">
                {name}
              </p>
              <p className="text-xs font-light text-secondary-50 md:text-sm">
                {themeName}
              </p>
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
      <PuzzleButton
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
