'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import { GatheringProps } from '@/types/gathering.types';

interface PuzzleButtonProps {
  layout?: 'card' | 'slot';
  gathering: GatheringProps['card'] | undefined;
}

export default function PuzzleButton({
  layout = 'card',
  gathering,
}: PuzzleButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  // 컴포넌트가 마운트될 때 찜 상태 불러오기
  useEffect(() => {
    if (!gathering) return;

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorited(
      favorites.some(
        (fav: GatheringProps['card']) =>
          fav.gatheringId === gathering.gatheringId
      )
    );
  }, [gathering]);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!gathering) return;

    setIsFavorited((prev) => {
      const newFavorited = !prev;
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

      if (newFavorited) {
        if (
          !favorites.some(
            (fav: GatheringProps['card']) =>
              fav.gatheringId === gathering.gatheringId
          )
        ) {
          favorites.push(gathering);
        }
      } else {
        const updatedFavorites = favorites.filter(
          (fav: GatheringProps['card']) =>
            fav.gatheringId !== gathering.gatheringId
        );
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return false;
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
      return newFavorited;
    });
  };
  return (
    <div className="absolute right-2 top-1 md:right-6 md:top-4">
      <button type="button" onClick={handleFavoriteToggle}>
        <Image
          src={
            isFavorited ? '/icons/puzzle_full.svg' : '/icons/puzzle_line.svg'
          }
          alt="퍼즐 아이콘"
          width={24}
          height={24}
          quality={100}
          className={clsx('object-contain', {
            'm-1 h-4 w-4 md:m-0 md:h-6 md:w-6': layout === 'card',
            'm-4 h-6 w-6 md:m-0': layout === 'slot',
          })}
        />
      </button>
    </div>
  );
}
