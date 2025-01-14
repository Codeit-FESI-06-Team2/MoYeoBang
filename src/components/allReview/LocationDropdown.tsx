import Dropdown from '../@shared/dropdown/SelectLocationDropdown';

const locationList = [
  { value: 'all', label: '지역 전체' },
  { value: 'geondae', label: '건대' },
  { value: 'hongdae', label: '홍대' },
  { value: 'hyehwa', label: '혜화' },
  { value: 'gangnam', label: '강남' },
];

interface DropdownOption {
  value: string;
  label: string;
}

interface LocationDropdownProps {
  onLocatingChange: (value: string) => void;
}

export default function LocationDropdown({
  onLocatingChange,
}: LocationDropdownProps) {
  const handleChange = (option: DropdownOption) => {
    onLocatingChange(option.value);
  };

  return (
    <Dropdown
      options={locationList}
      onChange={handleChange}
      defaultValue={locationList[0]}
    />
  );
}
