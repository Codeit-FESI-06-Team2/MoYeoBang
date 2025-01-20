import { useState, useEffect } from 'react';
import { matchFilter } from '@/utils/filterUtils';
import DateDropdown from '@/components/allReview/DateDropdown';
import LocationDropdown from '@/components/allReview/LocationDropdown';
import GenreFilter from '@/components/@shared/GenreFilter';
import LevelDropdown from './LevelDropdown';

interface GatheringFiltersProps {
  gatherings: any;
  setFilteredGatherings: (gatherings: any[]) => void;
}

export default function GatheringFilters({
  gatherings,
  setFilteredGatherings,
}: GatheringFiltersProps) {
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

    setFilteredGatherings(filtered);
  };

  useEffect(() => {
    filterGatherings();
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    filterGatherings();
  };

  return (
    <section className="mx-1 flex flex-col xl:mx-5">
      <div className="flex flex-col gap-6">
        <GenreFilter
          onGenreChange={(value) => handleFilterChange('genre', value)}
          selectedGenre={filters.genre}
        />
        <div className="flex justify-between text-text-secondary">
          <div className="flex justify-between">
            <div className="flex gap-2">
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
          <ul>정렬</ul>
        </div>
      </div>
    </section>
  );
}
