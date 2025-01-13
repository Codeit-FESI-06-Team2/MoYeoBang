import DateDropdown from './DateDropdown';
import LocationDropdown from './LocationDropdown';

interface ReviewFiltersProps {
  onLocatingChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

export default function ReviewFilters({
  onLocatingChange,
  onDateChange,
}: ReviewFiltersProps) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <LocationDropdown onLocatingChange={onLocatingChange} />
        <DateDropdown onDateChange={onDateChange} />
      </div>
      <ul className="flex h-10 w-[90px] items-center justify-center rounded-lg border-2 border-[#313131] bg-[#2c2c2c] text-sm font-medium text-[#d0d0d0]">
        최신순
      </ul>
    </div>
  );
}
