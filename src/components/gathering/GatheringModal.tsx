import { useState, useEffect } from 'react';

import useCustomForm from '@/hooks/useCustomForm';
import { getToday } from '@/utils/dateUtils';
import { GatheringRequestBody } from '@/types/gathering.types';
import Modal from '@/components/@shared/Modal';
import Button from '@/components/@shared/Button';
import Input from '@/components/@shared/Input';
import DateInput from '@/components/@shared/DateInput';
import DateTimeCalendar from '@/components/@shared/DateTimeCalendar';
import { themeNameList } from '@/constants/themeList';
import { INIT_GATHRING } from '@/constants/initialValues';
import { useCalendar } from '@/hooks/useCalendar';

import LocationSelector from './selector/LocationSelector';
import CapacitySelector from './selector/CapacitySelector';
import ThemeSelector from './selector/ThemeSelector';

interface GatheringModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
}

export default function GatheringModal({
  isOpen,
  onClose,
  isEdit = false,
}: GatheringModalProps) {
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
  const [dateTimeError, setDateTimeError] = useState<string>('');
  const [registrationEndError, setRegistrationEndError] = useState<string>('');
  const [searchMessage, setSearchMessage] = useState<string>('');

  const { themeName, capacity, dateTime, registrationEnd } = watchFields([
    'themeName',
    'capacity',
    'dateTime',
    'registrationEnd',
  ]);

  // 모임 날짜 캘린더
  const {
    isOpen: isCalendarOpen,
    date: selectedDate,
    handleChange: toggleCalendar,
    handleDateChange,
  } = useCalendar({
    onDateChange: (newDate) => {
      setValue('dateTime', newDate || '');
    },
  });

  // 마감 날짜 캘린더
  const {
    isOpen: isEndDateCalendarOpen,
    date: selectedEndDate,
    handleChange: toggleEndDateCalendar,
    handleDateChange: handleEndDateChange,
  } = useCalendar({
    onDateChange: (newDate) => {
      setValue('registrationEnd', newDate || '');
    },
  });

  // 방탈출 지역 선택
  const handleLocationClick = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setInputThemeName('');
    setSelectedThemeName('');
    setFilteredThemes([]);
    setSearchAttempted(false);
    setValue('location', selectedLocation);
    setValue('themeName', '');
  };

  // 방탈출 테마 검색
  const searchThemes = () => {
    setSearchAttempted(true);

    if (inputThemeName.length < 2) {
      setSearchMessage('2글자 이상 입력해주세요.');
      setFilteredThemes([]);
      return;
    }

    if (location) {
      const filtered = themeNameList[location]?.theme.filter((theme) =>
        theme.toLowerCase().includes(inputThemeName.toLowerCase())
      );

      if (filtered.length === 0) {
        setSearchMessage('검색어가 없어요. 다시 입력해 주세요.');
      } else {
        setSearchMessage('');
      }

      setFilteredThemes(filtered);
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

  // 모임 날짜 검증
  useEffect(() => {
    const today = getToday();
    if (!dateTime) return;
    const selectedDateTime = new Date(dateTime);

    if (selectedDateTime < today) {
      setDateTimeError('오늘 이전 날짜를 모임 날짜로 설정할 수 없습니다.');
      setValue('dateTime', '');
      setRegistrationEndError('');
    } else {
      setDateTimeError('');
    }
  }, [dateTime, setValue]);

  // 마감 날짜 검증
  useEffect(() => {
    const today = getToday();
    if (!(registrationEnd && dateTime)) return;
    const selectedRegistrationEnd = new Date(registrationEnd);
    const selectedDateTime = new Date(dateTime);

    if (selectedRegistrationEnd < today) {
      setRegistrationEndError(
        '오늘 이전 날짜를 마감 날짜로 설정할 수 없습니다.'
      );
      setValue('registrationEnd', '');
    } else if (selectedRegistrationEnd >= selectedDateTime) {
      setRegistrationEndError('마감 날짜는 모임 날짜보다 이전이어야 합니다.');
      setValue('registrationEnd', '');
    } else {
      setRegistrationEndError('');
    }
  }, [registrationEnd, dateTime, setValue]);

  // 폼 제출 시 날짜 형식 포맷
  const onSubmit = (data: GatheringRequestBody['post']) => {
    const finalDateTime = new Date(data.dateTime);
    const finalRegistrationEnd = new Date(data.registrationEnd);

    const isoDateTime = finalDateTime.toISOString(); // ISO 형식으로 변환
    const isoRegistrationEnd = finalRegistrationEnd.toISOString();

    const submissionData = {
      ...data,
      dateTime: isoDateTime,
      registrationEnd: isoRegistrationEnd,
    };

    console.log('Submitted Data:', submissionData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      customDimStyle="w-full md:w-[542px] overflow-visible"
    >
      <h1 className="mb-10 text-lg font-bold">
        {isEdit ? '모임 수정하기' : '모임 만들기'}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
            searchMessage={searchMessage}
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
        <div className="relative flex flex-col gap-2">
          <DateInput
            label="dateTime"
            labelText="모임 날짜"
            placeholder="YYYY-MM-DD 00:00 AM"
            inputProps={{
              readOnly: true,
              onClick: toggleCalendar,
              value: selectedDate || '',
              ...register('dateTime', { required: true }),
            }}
            isError={!!dateTimeError}
            errorMessage={dateTimeError}
          />
          {isCalendarOpen && (
            <DateTimeCalendar
              isOpen={isCalendarOpen}
              selectedDate={selectedDate}
              onClose={toggleCalendar}
              onDateChange={handleDateChange}
              layout="top-24 z-90"
            />
          )}
          {dateTime && !dateTimeError && (
            <DateInput
              label="registrationEnd"
              labelText="마감 날짜"
              placeholder="YYYY-MM-DD 00:00 AM"
              inputProps={{
                readOnly: true,
                onClick: toggleEndDateCalendar,
                value: selectedEndDate || '',
                ...register('registrationEnd', { required: true }),
              }}
              isError={!!registrationEndError}
              errorMessage={registrationEndError}
            />
          )}
          {isEndDateCalendarOpen && (
            <DateTimeCalendar
              isOpen={isEndDateCalendarOpen}
              selectedDate={selectedEndDate}
              onClose={toggleEndDateCalendar}
              onDateChange={handleEndDateChange}
              layout="top-44"
            />
          )}
        </div>
        <CapacitySelector
          capacity={capacity}
          setCapacity={(newCapacity) => setValue('capacity', newCapacity)}
        />
        <Button
          type="submit"
          variant="primary-gray"
          padding="10"
          disabled={
            !isValid || !themeName || !!registrationEndError || !!dateTimeError
          }
          className="mb-4 mt-14 w-full md:mt-6"
        >
          {isEdit ? '수정' : '생성'}
        </Button>
      </form>
    </Modal>
  );
}
