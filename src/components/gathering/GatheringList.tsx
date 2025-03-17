'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import type { GatheringDto } from '@/types/gathering.types';
import { getGatherings } from '@/axios/gather/apis';
import { sortList } from '@/constants/sortList';

import { INIT_GATHERING } from '@/constants/initialValues';
import { QueryProvider } from '@/components/@shared/QueryProvider';
import EmptyElement from '@/components/@shared/EmptyElement';
import GatheringCard from '@/components/gathering/GatheringCard';
import DateDropdown from '@/components/@shared/dropdown/DateDropdown';
import LocationDropdown from '@/components/@shared/dropdown/LocationDropdown';
import LevelDropdown from '@/components/@shared/dropdown/LevelDropdown';
import SortDropdown from '@/components/@shared/dropdown/SortDropdown';
import GenreFilter from '@/components/@shared/GenreFilter';

export default function GatheringList() {
  const { ref: targetRef, inView } = useInView();
  const [pageParam, setPageParam] = useState(0);
  const [selectedSort, setSelectedSort] = useState(INIT_GATHERING.SORT.sortBy);
  const [filters, setFilters] = useState(INIT_GATHERING.FILTER);
  const [initialScrollRestored, setInitialScrollRestored] = useState(false);

  const queryKey = ['gatherings', filters, selectedSort];

  // 필터 및 정렬 상태를 세션 스토리지에 저장
  useEffect(() => {
    if (initialScrollRestored && typeof window !== 'undefined') {
      const stateToSave = {
        savedSort: selectedSort,
        savedFilters: filters,
        savedScrollY: window.scrollY,
      };
      sessionStorage.setItem('gatheringState', JSON.stringify(stateToSave));
    }
  }, [selectedSort, filters, pageParam, initialScrollRestored]);

  // 초기 로드 시 저장된 상태 불러오기
  useEffect(() => {
    const savedState = sessionStorage.getItem('gatheringState');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        setSelectedSort(state.savedSort);
        setFilters(state.savedFilters);
        setPageParam(state.savedPageParam || 0);

        if (state.savedScrollY) {
          window.scrollTo(0, state.savedScrollY);
        }
        setInitialScrollRestored(true);
      } catch (e) {
        console.error('상태 불러오기 오류:', e);
      }
    } else {
      setInitialScrollRestored(true);
    }
  }, []);

  // 모임 목록 무한스크롤
  const {
    data: gatherings,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: fetchPageParam }) => {
      const response = await getGatherings({
        limit: 2,
        offset: fetchPageParam,
        sortOrder: INIT_GATHERING.SORT.sortOrder,
        sortBy: selectedSort,
        ...filters,
      });

      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;

      return !lastPage || lastPage.length < 2 ? undefined : nextPage;
    },
    initialPageParam: 0,
    gcTime: 1000 * 60 * 60 * 24, // 24시간
    staleTime: 1000 * 60 * 10, // 10분
  });

  const allGatherings = gatherings.pages.flat();

  // 데이터 추가 요청
  useEffect(() => {
    if (!inView || !hasNextPage || isFetchingNextPage) {
      return;
    }

    setPageParam((prev) => prev + 1);
    fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 필터 및 정렬 변경 핸들러
  const handleFilterChange = (
    key: keyof typeof INIT_GATHERING.FILTER,
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPageParam(0);
  };

  const onSortingChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    setPageParam(0);
  };

  return (
    <QueryProvider>
      <section className="flex flex-col">
        <div className="flex flex-col gap-5 md:gap-7">
          <GenreFilter
            onGenreChange={(value) => handleFilterChange('genre', value)}
            selectedGenre={filters.genre}
          />
          <div className="flex items-center justify-between text-text-secondary">
            <div className="flex justify-between">
              <div className="mr-2 flex gap-2">
                <LocationDropdown
                  onLocatingChange={(value) =>
                    handleFilterChange('location', value)
                  }
                  selectedLocation={filters.location}
                />
                <DateDropdown
                  onDateChange={(value) => handleFilterChange('date', value)}
                  selectedDate={filters.date}
                />
                <LevelDropdown
                  onLevelChange={(value) => handleFilterChange('level', value)}
                  selectedLevel={filters.level}
                />
              </div>
            </div>
            <SortDropdown
              onSortingChange={onSortingChange}
              sortList={sortList.gathering}
            />
          </div>
        </div>
      </section>
      {allGatherings.length > 0 ? (
        <section className="mx-auto grid h-full w-full grid-cols-1 gap-3 text-white xl:grid-cols-2">
          {allGatherings.map((gathering: GatheringDto['get']) => (
            <GatheringCard key={gathering.gatheringId} {...gathering} />
          ))}
          <div ref={targetRef} style={{ height: '1px' }} />
        </section>
      ) : (
        <EmptyElement>
          아직 모임이 없어요,
          <br />
          지금 바로 모임을 만들어보세요
        </EmptyElement>
      )}
    </QueryProvider>
  );
}
