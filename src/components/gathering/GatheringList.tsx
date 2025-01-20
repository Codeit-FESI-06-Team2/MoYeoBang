/* eslint-disable prettier/prettier */

'use client';

import { useState, useEffect } from 'react';

import { matchFilter } from '@/utils/filterUtils';
import { sortGatherings } from '@/utils/sortUtils';
import { sortList } from '@/constants/sortList';

import EmptyElement from '@/components/@shared/EmptyElement';
import GatheringCard from '@/components/gathering/GatheringCard';
import DateDropdown from '@/components/allReview/DateDropdown';
import LocationDropdown from '@/components/allReview/LocationDropdown';
import LevelDropdown from '@/components/gathering/selector/LevelDropdown';
import SortDropdown from '@/components/@shared/SortDropdown';
import GenreFilter from '@/components/@shared/GenreFilter';

interface GatheringListProps {
  gatherings: any;
}

export default function GatheringList({ gatherings }: GatheringListProps) {
  const [selectedSort, setSelectedSort] = useState('createdAt');
  const [filteredGatherings, setFilteredGatherings] = useState(gatherings);
  const [filters, setFilters] = useState({
    genre: 'all',
    location: 'all',
    date: '',
    level: 'all',
  });

  const filterGatherings = () => {
    const { genre, location, date, level } = filters;

    const filtered = gatherings.filter((gathering: any) => {
      const filterConditions = [
        { option: genre, target: gathering.genre },
        { option: location, target: gathering.location },
        { option: date, target: gathering.dateTime, isDate: true },
        { option: level, target: gathering.level },
      ];

      const matches = filterConditions.map(({ option, target, isDate }) =>
        matchFilter({ option, target, isDate })
      );

      return matches.every(Boolean);
    });

    setFilteredGatherings(sortGatherings(filtered, selectedSort));
  };

  useEffect(() => {
    filterGatherings();
  }, [filters, selectedSort]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    filterGatherings();
  };

  const onSortingChange = (sortOption: string) => {
    setSelectedSort(sortOption);
  };

  return (
    <>
      <section className="flex flex-col">
        <div className="flex flex-col gap-7">
          <GenreFilter
            onGenreChange={(value) => handleFilterChange('genre', value)}
            selectedGenre={filters.genre}
          />
          <div className="flex justify-between text-text-secondary">
            <div className="flex justify-between">
              <div className="mr-2 flex gap-2">
                <LocationDropdown
                  onLocatingChange={(value) =>
                    handleFilterChange('location', value)
                  }
                />
                <DateDropdown
                  onDateChange={(value) => handleFilterChange('date', value)}
                />
                <LevelDropdown
                  onLevelChange={(value) => handleFilterChange('level', value)}
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

      <section className="mx-auto grid h-full w-full grid-cols-1 gap-3 text-white xl:grid-cols-2">
        {filteredGatherings.length > 0
          ? filteredGatherings.map((gathering: any) => (
              <GatheringCard key={gathering.gatheringId} {...gathering} />
            ))
          : null}
      </section>

      {filteredGatherings.length === 0 && (
        <EmptyElement>
          아직 모임이 없어요,
          <br />
          지금 바로 모임을 만들어보세요
        </EmptyElement>
      )}
    </>
  );
}
