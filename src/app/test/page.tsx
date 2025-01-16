'use client';

import { useState } from 'react';
import Button from '@/components/@shared/Button';
import IconButton from '@/components/@shared/IconButton';
import Dropdown, { DropdownOption } from '@/components/@shared/Dropdown';
import Input from '@/components/@shared/Input';
import TextArea from '@/components/@shared/TextArea';
import ToggleInput from '@/components/@shared/ToggleInput';
import Modal from '@/components/@shared/Modal';
import DateTimeCalendar from '@/components/@shared/DateTimeCalendar';
import { useCalendar } from '@/hooks/useCalendar';
// import Spinner from '@/components/@shared/Spinner';
// import CustomCalendar from '@/components/@shared/CustomCalendar';

// 옵션 데이터 정의 예시
const locationOptions: DropdownOption[] = [
  { value: 'all', label: '지역 전체' },
  { value: 'gangnam', label: '강남' },
  { value: 'hongdae', label: '홍대' },
  { value: 'konkuk', label: '건대' },
  { value: 'hyehwa', label: '혜화' },
];

export default function Test() {
  const [isModal, setIsModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<DropdownOption>(
    locationOptions[0]
  );
  const { isOpen, date, handleChange, handleDateChange } = useCalendar({});

  const openModalhandler = () => setIsModal(true);
  const closeModalhandler = () => setIsModal(false);

  const handleLocationChange = (option: DropdownOption) => {
    setSelectedLocation(option);
  };

  return (
    <main className="m-10 flex flex-col items-center gap-12">
      <h1 className="text-lg">공통 컴포넌트 테스트 페이지</h1>
      <section className="w-full text-center">
        <h2 className="mb-3 bg-slate-200 p-1 font-extrabold">Button</h2>
        <ul className="text-left">
          <h3>{`variant = "primary"`}</h3>
          <li className="my-2 flex justify-between">
            <Button variant="primary" padding="8" fontSize="14">
              생성하기
            </Button>
            <Button variant="primary" padding="10">
              생성하기
            </Button>
            <Button variant="primary" padding="12" disabled>
              비활성화
            </Button>
          </li>
          <h3>{`variant = "primary-gray"`}</h3>
          <li className="my-2 flex justify-between">
            <Button variant="primary-gray" padding="8" fontSize="14">
              생성하기
            </Button>
            <Button variant="primary-gray" padding="10">
              생성하기
            </Button>
            <Button variant="primary-gray" padding="12" disabled>
              비활성화
            </Button>
          </li>
          <h3>{`variant = "secondary"`}</h3>
          <li className="my-2 flex justify-between">
            <Button variant="secondary" padding="8" fontSize="14">
              생성하기
            </Button>
            <Button variant="secondary" padding="10">
              생성하기
            </Button>
            <Button variant="secondary" padding="12" disabled>
              비활성화
            </Button>
          </li>
          <h3>{`variant = "tertiary"`}</h3>
          <li className="my-2 flex justify-between">
            <Button variant="tertiary" padding="8" fontSize="14">
              생성하기
            </Button>
            <Button variant="tertiary" padding="10">
              생성하기
            </Button>
            <Button variant="tertiary" padding="12" disabled>
              비활성화
            </Button>
          </li>
          <h3>{`variant = "tertiary-gray"`}</h3>
          <li className="my-2 flex justify-between">
            <Button
              variant="tertiary-gray"
              padding="8"
              fontSize="14"
              shape="round"
            >
              생성하기
            </Button>
            <Button variant="tertiary-gray" shape="round">
              생성하기
            </Button>
            <Button variant="tertiary-gray" padding="12" shape="round" disabled>
              비활성화
            </Button>
          </li>
          <h3>{`variant = "grayscale"`}</h3>
          <li className="my-2 flex justify-between">
            <Button variant="grayscale" padding="8" fontSize="14">
              생성하기
            </Button>
            <Button variant="grayscale" padding="10">
              생성하기
            </Button>
            <Button variant="grayscale" padding="12" disabled>
              비활성화
            </Button>
          </li>
        </ul>
      </section>

      <section className="w-full text-center">
        <h2 className="mb-3 bg-slate-200 p-1 font-extrabold">IconButton</h2>
        <div className="flex justify-center gap-4">
          <IconButton src="/icons/pencil.svg" alt="연필 아이콘">
            이미지를 자유롭게 넣을 수 있어요
          </IconButton>
        </div>
      </section>

      <section className="w-full text-center">
        <h2 className="mb-3 bg-slate-200 p-1 font-extrabold">Dropdown</h2>
        <div className="flex justify-center gap-4">
          <Dropdown
            options={locationOptions}
            defaultValue={locationOptions[0]}
            onChange={handleLocationChange}
          />
          <p className="text-sm">디버깅용: {selectedLocation.label}</p>
        </div>
      </section>

      {/* 
      <section className="w-full text-center">
        <h2 className="mb-3 bg-slate-200 p-1 font-extrabold">Spinner</h2>

        크기 예시 
        <div className="mb-8">
          <h3 className="mb-2 text-sm">Sizes</h3>
          <div className="flex items-center justify-center gap-4">
            <Spinner size="xs" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </div>
        </div>

        색상 예시 
        <div className="mb-8">
          <h3 className="mb-2 text-sm">Colors</h3>
          <div className="flex items-center justify-center gap-4">
            <Spinner color="primary" />
            <Spinner color="secondary" />
            <Spinner color="success" />
            <Spinner color="danger" />
            <Spinner color="warning" />
          </div>
        </div>

        투명도 예시 
        <div className="mb-8">
          <h3 className="mb-2 text-sm">Opacity</h3>
          <div className="flex items-center justify-center gap-4">
            <Spinner opacity="light" />
            <Spinner opacity="medium" />
            <Spinner opacity="dark" />
          </div>
        </div>
      </section> */}

      <section className="w-full text-center">
        <h2 className="mb-3 bg-slate-200 p-1 font-extrabold">Modal</h2>
        <Button variant="primary" fontSize="14" onClick={openModalhandler}>
          모임 만들기
        </Button>
        <Modal isOpen={isModal} onClose={closeModalhandler}>
          <input
            placeholder="포커싱이 자동으로 되는지 테스트"
            className="w-[260px]"
          />
        </Modal>
      </section>

      <section>
        <input
          value={date}
          className="relative text-black"
          onClick={handleChange}
        />
        <div className="relative flex justify-center">
          <DateTimeCalendar
            isOpen={isOpen}
            selectedDate={date}
            onClose={handleChange}
            onDateChange={handleDateChange}
          />

          {/* <CustomCalendar
            isOpen={isOpen}
            selectedDate={date}
            onClose={handleChange}
            onDateChange={handleDateChange}
          /> */}
        </div>
      </section>

      <section className="flex w-full flex-col gap-4 text-center">
        <h2 className="mb-3 bg-slate-200 p-1 font-extrabold">TextArea</h2>
        <TextArea placeholder="JSDoc 주석을 추가했습니다." label="label" />
        <TextArea
          placeholder="label 값과 labelText 값을 따로 지정해줄 수 있습니다. labelText 속성을 사용할 때 label 속성이 필수입니다."
          label="labelText"
          isError
          errorMessage="에러 메세지 디자인은 동일합니다."
        />
      </section>
      <section className="flex w-full flex-col gap-4 text-center">
        <h2 className="mb-3 bg-slate-200 p-1 font-extrabold">Input</h2>
        <Input
          placeholder="placeholder 색상과 입력 글자의 색상을 다르게 설정했습니다."
          label="예시1"
          labelText="fontSize=14 / varient=elevated / gap=12"
          fontSize="14"
          gap="12"
          varient="elevated"
        />
        <div className="bg-white p-4">
          <Input
            placeholder="fontColor 속성 제거 후 varient 속성을 추가했습니다."
            label="예시2"
            labelText="fontSize=16 / varient=default / gap=8"
            fontSize="16"
            varient="default"
            gap="8"
            errorMessage="에러 메세지 디자인은 동일합니다."
          />
        </div>
        <div className="bg-white p-4">
          <Input
            placeholder="focus 해보세요."
            label="예시2"
            labelText="fontSize=16 / varient=default / gap=8"
            fontSize="16"
            varient="default"
            gap="8"
            isError
            errorMessage="에러 메세지 디자인은 동일합니다."
          />
        </div>
      </section>
      <section className="flex w-full flex-col gap-4 text-center">
        <h2 className="mb-3 bg-slate-200 p-1 font-extrabold">ToggleInput</h2>
        <ToggleInput
          label="label"
          placeholder="하나의 디자인으로 구성되어있습니다."
        />
        <ToggleInput
          label="label"
          labelText="labelText"
          placeholder="placeholder"
          isError
          errorMessage="에러 메세지 디자인은 동일합니다."
        />
      </section>
    </main>
  );
}
