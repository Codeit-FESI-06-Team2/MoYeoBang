'use client';

import Dropdown, {
  DropdownOption,
} from '@/components/@shared/dropdown/SelectLocationDropdown';
import { levels } from '@/constants/themeList';

interface LevelDropdownProps {
  onLevelChange: (value: string) => void;
}

export default function LevelDropdown({ onLevelChange }: LevelDropdownProps) {
  const handleChange = (option: DropdownOption) => {
    onLevelChange(option.value);
  };

  return (
    <Dropdown options={levels} onChange={handleChange} defaultLabel="난이도" />
  );
}
