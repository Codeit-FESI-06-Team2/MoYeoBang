import Button from '@/components/@shared/Button';
import { themeList } from '@/constants/themeList';

interface LocationSelectorProps {
  location: string;
  handleLocationClick: (selectedLocation: string) => void;
}

export default function LocationSelector({
  location,
  handleLocationClick,
}: LocationSelectorProps) {
  return (
    <div className="text-md flex w-full flex-col items-start gap-3">
      <h3 className="font-semibold text-gray-800">장소</h3>
      <div className="flex w-full gap-3">
        {Object.entries(themeList).map(([locationKey, { label }]) => (
          <Button
            size="full"
            key={locationKey}
            onClick={() => handleLocationClick(locationKey)}
            className={
              locationKey === location
                ? 'bg-brand-primary text-white'
                : 'bg-gray-400 text-white'
            }
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
