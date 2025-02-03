'use client';

import { useState, Suspense, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import type {
  GatheringDto,
  GatheringFilters,
  GatheringUrlParams,
} from '@/types/gathering.types';
import { getGatherings } from '@/axios/gather/apis';
import { sortList } from '@/constants/sortList';
import { INIT_GATHRING } from '@/constants/initialValues';
import { QueryProvider } from '@/components/@shared/QueryProvider';

import EmptyElement from '@/components/@shared/EmptyElement';
import GatheringCard from '@/components/gathering/GatheringCard';
import DateDropdown from '@/components/@shared/dropdown/DateDropdown';
import LocationDropdown from '@/components/@shared/dropdown/LocationDropdown';
import LevelDropdown from '@/components/@shared/dropdown/LevelDropdown';
import SortDropdown from '@/components/@shared/dropdown/SortDropdown';
import GenreFilter from '@/components/@shared/GenreFilter';

export default function GatheringList() {
  const [selectedSort, setSelectedSort] =
    useState<GatheringUrlParams['sortBy']>('dateTime');
  const [filters, setFilters] = useState<GatheringFilters>(
    INIT_GATHRING.FILTER
  );

  const { data: gatherings } = useQuery({
    queryKey: ['gatherings', filters, selectedSort],
    queryFn: () =>
      getGatherings({
        limit: 20,
        sortOrder: 'asc',
        sortBy: selectedSort,
        level: filters.level,
        location: filters.location,
        genre: filters.genre,
        date: filters.date,
      }),
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const onSortingChange = (sortOption: GatheringUrlParams['sortBy']) => {
    setSelectedSort(sortOption);
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
      {gatherings.length > 0 ? (
        <section className="mx-auto grid h-full w-full grid-cols-1 gap-3 text-white xl:grid-cols-2">
          {gatherings.map((gathering: GatheringDto['get']) => (
            <GatheringCard key={gathering.gatheringId} {...gathering} />
          ))}
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
