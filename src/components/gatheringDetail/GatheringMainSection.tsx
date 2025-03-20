'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { locationList } from '@/constants/themeList';
import Button from '@/components/@shared/button/Button';
import Toast from '@/components/@shared/Toast';
import GatheringBadge from '../gathering/UI/GatheringBadge';

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  FAVORITES: 'favorites',
} as const;

interface GatheringMainSectionProps {
  gatheringId: number;
  image: string;
  name: string;
  themeName: string;
  location: string;
  level: 'high' | 'middle' | 'low';
  dateTime: string;
}

export default function GatheringMainSection({
  gatheringId,
  image,
  name,
  themeName,
  location,
  level,
  dateTime,
}: GatheringMainSectionProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [imageError, setImageError] = useState(false);

  const locationLabel =
    locationList.find((item) => item.value === location)?.label || location;

  useEffect(() => {
    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (favorites) {
      const favoritesList = JSON.parse(favorites);
      setIsLiked(favoritesList.includes(gatheringId));
    }
  }, [gatheringId]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return function cleanup() {
        clearTimeout(timer);
      };
    }
  }, [showToast]);

  const handleLike = () => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (!token) {
      return;
    }

    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    let favoritesList = favorites ? JSON.parse(favorites) : [];

    if (isLiked) {
      favoritesList = favoritesList.filter((id: number) => id !== gatheringId);
    } else {
      favoritesList.push(gatheringId);
    }

    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favoritesList));
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
    } catch (error) {
      console.error('공유하기 실패:', error);
    }
  };

  const levelIcons = {
    high: { src: '/icons/graph_high.svg', alt: '고급 난이도 아이콘' },
    middle: { src: '/icons/graph_middle.svg', alt: '중급 난이도 아이콘' },
    low: { src: '/icons/graph_low.svg', alt: '초급 난이도 아이콘' },
  };

  const levelLabels = {
    high: '고급',
    middle: '중급',
    low: '초급',
  } as const;

  return (
    <section className="w-full max-w-[326px] sm:max-w-[688px] lg:max-w-[805px]">
      {/* 이미지 컨테이너 */}
      <div className="relative h-[196px] w-full overflow-hidden rounded-xl sm:h-[415px]">
        <Image
          src={!image || imageError ? '/images/theme_default_xl.png' : image}
          alt={themeName}
          fill
          sizes="(max-width: 640px) 326px, (max-width: 1024px) 688px, 805px"
          className="object-cover"
          priority
          onError={() => setImageError(true)}
        />
      </div>

      {/* 뱃지 및 버튼 컨테이너 */}
      <div className="mt-4 w-full">
        <div className="flex items-center justify-between md:px-4">
          {/* 뱃지 그룹 */}
          <div className="flex flex-shrink-0 items-center gap-2">
            <GatheringBadge
              shape="round"
              icon={level as keyof typeof levelIcons}
              className="text-xs md:text-sm lg:text-base"
            >
              {levelLabels[level as keyof typeof levelLabels]}
            </GatheringBadge>
            <GatheringBadge
              shape="round"
              className="text-xs md:text-sm lg:text-base"
            >
              {locationLabel}
            </GatheringBadge>
            <GatheringBadge
              shape="round"
              className="text-xs md:text-sm lg:text-base"
            >
              {new Date(dateTime).toLocaleDateString('ko-KR', {
                month: 'long',
                day: 'numeric',
              })}
            </GatheringBadge>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex flex-shrink-0 items-center gap-4">
            <Button variant="icon" onClick={handleLike}>
              <Image
                src={
                  isLiked ? '/icons/HeartFull.svg' : '/icons/heart_empty.svg'
                }
                width={24}
                height={24}
                alt={isLiked ? '찜하기 취소' : '찜하기'}
                className="h-[18px] w-[18px] md:h-[20px] md:w-[20px] lg:h-[24px] lg:w-[24px]"
              />
            </Button>
            <Button variant="icon" onClick={handleShare}>
              <Image
                src="/icons/share.svg"
                width={24}
                height={24}
                alt="공유하기"
                className="h-[18px] w-[18px] md:h-[20px] md:w-[20px] lg:h-[24px] lg:w-[24px]"
              />
            </Button>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="my-5 w-full border-t border-secondary-80" />

      {/* 제목 */}
      <h1 className="text-xl leading-6 text-white md:text-2xl md:leading-7 lg:text-[26px] lg:leading-[28px]">
        {name}
      </h1>

      {/* 위치 정보 */}
      <div className="mt-6 space-y-6">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/location.svg"
            width={24}
            height={24}
            alt="위치 아이콘"
          />
          <span className="text-white">{locationLabel}</span>
        </div>
      </div>

      {/* Toast 알림 */}
      {showToast && <Toast message="URL이 복사되었습니다" type="success" />}
    </section>
  );
}
