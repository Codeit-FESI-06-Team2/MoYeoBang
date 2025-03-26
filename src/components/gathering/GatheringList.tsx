'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';

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
  const [pageParam, setPageParam] = useState(0);
  const [selectedSort, setSelectedSort] = useState(INIT_GATHERING.SORT.sortBy);
  const [filters, setFilters] = useState(INIT_GATHERING.FILTER);
  const [initialScrollRestored, setInitialScrollRestored] = useState(false);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [visibleEndIndex, setVisibleEndIndex] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const { ref: bottomObserverRef, inView: bottomInView } = useInView();

  const queryKey = ['gatherings', filters, selectedSort];

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
        limit: 5,
        offset: fetchPageParam,
        sortOrder: INIT_GATHERING.SORT.sortOrder,
        sortBy: selectedSort,
        ...filters,
      });

      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;

      return !lastPage || lastPage.length < 5 ? undefined : nextPage;
    },
    initialPageParam: 0,
    gcTime: 1000 * 60 * 60 * 24, // 24시간
    staleTime: 1000 * 60 * 10, // 10분
  });

  const allGatherings = gatherings.pages.flat();

  // react-virtualized를 위한 CellMeasurer 캐시 설정
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: isMobile ? 120 : 178,
    keyMapper: (index: number) => {
      // 각 아이템에 고유한 키를 제공하여 캐싱 문제 방지
      if (!allGatherings || !allGatherings[index]) return String(index);
      return String(allGatherings[index]?.id || index);
    },
  });

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

  // 데이터 추가 요청
  useEffect(() => {
    if (!bottomInView || !hasNextPage || isFetchingNextPage) {
      return;
    }

    setPageParam((prev) => prev + 1);
    fetchNextPage();
  }, [bottomInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 필터 및 정렬 변경 핸들러
  const handleFilterChange = (
    key: keyof typeof INIT_GATHERING.FILTER,
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPageParam(0);
    cache.clearAll();
  };

  const onSortingChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    setPageParam(0);
    cache.clearAll();
  };

  // 미디어 쿼리로 모바일 상태 판단
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const mediaQuery = window.matchMedia('(max-width: 767px)');

    // 초기 상태 설정
    setIsMobile(mediaQuery.matches);

    // 미디어 쿼리 변경 리스너
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaQueryChange);
    } else {
      // 이전 버전 브라우저 지원
      mediaQuery.addListener(handleMediaQueryChange);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaQueryChange);
      } else {
        mediaQuery.removeListener(handleMediaQueryChange);
      }
    };
  }, []);

  // 뷰포트에 보이는 데이터 계산
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const rowHeight = isMobile ? 116 : 170;
    const viewportHeight = document.documentElement.clientHeight;
    const visibleRowCount = Math.ceil(viewportHeight / rowHeight);

    setVisibleStartIndex(Math.max(0, pageParam * 2 - visibleRowCount));
    setVisibleEndIndex((pageParam + 1) * 2 + visibleRowCount);
  }, [pageParam, isMobile]);

  useEffect(() => {
    cache.clearAll();
  }, [isMobile]);

  // 필터 변경시 캐시 초기화
  useEffect(() => {
    if (cache) {
      cache.clearAll();
    }
  }, [filters, selectedSort]);

  // 행 렌더링 함수
  const rowRenderer = ({
    index,
    key,
    parent,
    style,
  }: {
    index: number;
    key: string;
    parent: any;
    style: React.CSSProperties;
  }) => {
    const item = allGatherings[index];
    const rowHeight = isMobile ? 116 : 178;
    const marginBottom = isMobile ? 4 : 8;

    // 마지막 요소에 관찰자 참조 추가
    const isLastItem = index === allGatherings.length - 1;

    // 고유한 키 생성
    const itemKey = item?.id || index;

    return (
      <CellMeasurer
        key={`${itemKey}-${filters.genre}-${filters.date}-${filters.location}-${filters.level}-${selectedSort}`}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div
          style={{
            ...style,
            height: rowHeight,
            marginBottom: `${marginBottom}px`,
            boxSizing: 'border-box',
          }}
        >
          <GatheringCard {...item} key={`card-${itemKey}-${filters.genre}`} />
          {isLastItem && <div ref={bottomObserverRef} className="h-[1px]" />}
        </div>
      </CellMeasurer>
    );
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
        <div
          className="w-full"
          style={{
            height: isMobile ? 'calc(100vh - 30vh)' : 'calc(100vh - 24vh)',
            position: 'relative',
          }}
        >
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                width={width}
                rowCount={allGatherings.length}
                rowHeight={isMobile ? 120 : 178}
                rowRenderer={rowRenderer}
                deferredMeasurementCache={cache}
                overscanRowCount={5}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  paddingRight: '4px',
                }}
                // 필터나 정렬이 변경되면 List를 강제로 다시 렌더링
                key={`list-${filters.genre}-${filters.date}-${filters.location}-${filters.level}-${selectedSort}`}
              />
            )}
          </AutoSizer>
          <div ref={bottomObserverRef} className="absolute bottom-0 h-[1px]" />
        </div>
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
