import { useState, useEffect } from 'react';

import useCustomForm from '@/hooks/useCustomForm';
import { GatheringRequestBody } from '@/types/gathering.types';
import Modal from '@/components/@shared/Modal';
import Button from '@/components/@shared/Button';
import Input from '@/components/@shared/Input';
import { themeList } from '@/constants/themeList';
import { INIT_GATHRING } from '@/constants/initialValues';

import LocationSelector from './LocationSelector';
import CapacitySelector from './CapacitySelector';
import ThemeSelector from './ThemeSelector';

interface CreateGatheringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateGatheringModal({
  isOpen,
  onClose,
}: CreateGatheringModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watchFields,
    formState: { isValid },
  } = useCustomForm<GatheringRequestBody['post']>(INIT_GATHRING.POST);

  const [location, setLocation] = useState<string>('');
  const [inputThemeName, setInputThemeName] = useState<string>('');
  const [selectedThemeName, setSelectedThemeName] = useState<string>('');
  const [filteredThemes, setFilteredThemes] = useState<string[]>([]);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { themeName, capacity, dateTime, registrationEnd } = watchFields([
    'themeName',
    'capacity',
    'dateTime',
    'registrationEnd',
  ]);

  const handleLocationClick = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setInputThemeName('');
    setSelectedThemeName('');
    setFilteredThemes([]);
    setSearchAttempted(false);
    setValue('location', selectedLocation);
    setValue('themeName', '');
  };

  const searchThemes = () => {
    if (inputThemeName.length > 0 && location) {
      const filtered = themeList[location]?.theme.filter((theme) =>
        theme.toLowerCase().includes(inputThemeName.toLowerCase())
      );
      setSearchAttempted(true);
      setFilteredThemes(filtered);
    } else {
      setSearchAttempted(false);
      setFilteredThemes([]);
    }
  };

  // location이 변경될 때
  useEffect(() => {
    if (location) {
      setSearchAttempted(false);
      setInputThemeName('');
      setSelectedThemeName('');
      setFilteredThemes([]);
      setValue('themeName', '');
    }
  }, [location, setValue]);

  // 마감 날짜 검증
  useEffect(() => {
    if (!(dateTime && registrationEnd)) return;

    if (new Date(registrationEnd) >= new Date(dateTime)) {
      setErrorMessage('마감 날짜는 모임 날짜보다 이전이어야 합니다.');
      setValue('registrationEnd', '');
    } else {
      setErrorMessage('');
    }
  }, [dateTime, registrationEnd, setValue]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="mb-10 text-lg font-bold">모임 만들기</h1>
      <form
        onSubmit={handleSubmit(() => onClose())}
        className="flex w-[472px] flex-col gap-6"
      >
        <Input
          label="name"
          labelText="모임 이름"
          placeholder="모임 이름을 입력하세요."
          inputProps={{
            ...register('name', { required: true }),
          }}
        />
        <LocationSelector
          location={location}
          handleLocationClick={handleLocationClick}
        />
        {location && (
          <ThemeSelector
            location={location}
            inputThemeName={inputThemeName}
            setInputThemeName={setInputThemeName}
            searchThemes={searchThemes}
            filteredThemes={filteredThemes}
            setThemeName={(newName) => setValue('themeName', newName)}
            selectedThemeName={selectedThemeName}
            setSelectedThemeName={setSelectedThemeName}
            searchAttempted={searchAttempted}
          />
        )}
        <div className="flex flex-col gap-2">
          <Input
            label="dateTime"
            labelText="모임 날짜"
            inputProps={{
              type: 'date',
              ...register('dateTime', { required: true }),
            }}
          />
          {dateTime && (
            <Input
              label="registrationEnd"
              labelText="마감 날짜"
              inputProps={{
                type: 'date',
                ...register('registrationEnd', { required: true }),
              }}
              isError={!!errorMessage}
              errorMessage={errorMessage}
            />
          )}
        </div>
        <CapacitySelector
          capacity={capacity}
          setCapacity={(newCapacity) => setValue('capacity', newCapacity)}
        />
        <Button
          type="submit"
          variant="primary"
          size="full"
          disabled={!isValid || !themeName || errorMessage.length > 0}
          className="mt-4"
        >
          생성
        </Button>
      </form>
    </Modal>
  );
}
