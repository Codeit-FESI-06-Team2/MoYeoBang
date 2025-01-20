import Button from '@/components/@shared/Button';
import { themeNameList } from '@/constants/themeList';

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
      <div className="flex w-full gap-2">
        {Object.entries(themeNameList).map(([locationKey, { label }]) => (
          <Button
            padding="12"
            key={locationKey}
            onClick={() => handleLocationClick(locationKey)}
            className={
              locationKey === location
                ? 'w-full bg-default-primary text-white'
                : 'w-full bg-default-secondary text-default-primary hover:bg-primary-0 hover:text-primary-30'
            }
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
