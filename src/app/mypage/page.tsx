'use client';

import Image from 'next/image';
import Button from '@/components/@shared/Button';
import { useState } from 'react';
import Modal from '@/components/@shared/Modal';
import Input from '@/components/@shared/Input';
import MyGathering from './myGathering';
import MyLike from './myLike';
import MyReview from './myReview';

export default function MyPage() {
  const user = {
    userId: 0,
    email: 'janggh1012@naver.com',
    nickname: 'jisoleil',
    image: '',
    createdAt: '2025-01-03T02:49:27.832Z',
    updatedAt: '2025-01-03T02:49:27.832Z',
  };
  const [isModal, setIsModal] = useState(false);
  const [img, setImg] = useState<string | null>(null);

  const openModalhandler = () => setIsModal(true);
  const closeModalhandler = () => {
    setIsModal(false);
    setImg(null);
  };
  const navLinks = [
    { label: '나의 모임', component: <MyGathering /> },
    { label: '나의 리뷰', component: <MyLike /> },
    { label: '내가 만든 모임', component: <MyReview /> },
  ];
  const [activeTab, setActiveTab] = useState(navLinks[0].label);

  const navClick = (label: string) => {
    setActiveTab(label);
  };

  const renderActiveComponent = () => {
    const activeLink = navLinks.find((link) => link.label === activeTab);
    return activeLink?.component;
  };

  //  파일 선택 변경 이벤트 핸들러
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    //  파일이 없다면
    if (!file) return;

    //  파일이 영어 이름으로만 되어 있다면
    const isEnglishName = /^[a-zA-Z0-9._-]+$/.test(file.name);
    if (!isEnglishName) {
      alert('파일 이름은 영어로만 이루어져야 합니다.');
      return;
    }

    //  파일이 5MB 이하라면
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      alert('파일 크기는 5MB 이하여야만 합니다.');
      return;
    }

    // 이미지 미리보기 로직 추가 (로컬 URL 생성)
    const previewUrl = URL.createObjectURL(file);
    setImg(previewUrl);
  };
  const triggerFileInput = () => {
    const fileInput = document.getElementById(
      'profile_image-input'
    ) as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  return (
    <main className="mx-[150px] my-[130px] flex flex-col justify-center ">
      <p className="text-xl font-bold">{`안녕하세요 ${user.nickname}님!`}</p>
      <div className="mb-12 mt-8 flex h-[130px] items-center justify-around rounded-[25px] border bg-orange-600">
        <div className="text-text-primary">
          <p>{user.nickname}</p>
          <p>{user.email}</p>
        </div>
        <Button
          type="button"
          variant="primary"
          size="small"
          font="14"
          className="border-text-primary "
          onClick={openModalhandler}
        >
          <p>프로필 편집</p>
        </Button>
        <Modal
          isOpen={isModal}
          onClose={closeModalhandler}
          customDimStyle="w-[400px]"
        >
          <div className="flex flex-col gap-5">
            <p className="text-base font-bold">프로필 수정하기</p>

            {/* 프로필 이미지 수정 input */}

            <div className="h-[65px] w-[65px] rounded-full">
              <div
                className={`relative flex items-center justify-center overflow-hidden ${img ? 'w-65 h-65 rounded-full' : ''}`}
              >
                <Image
                  src={img || '/profile_image_default.png'}
                  width={65}
                  height={65}
                  alt="프로필 이미지 미리보기"
                  className={img ? 'h-[65px] rounded-full' : ''}
                />
              </div>
              <button type="button" onClick={triggerFileInput}>
                <Image
                  src="/edit.png"
                  width={30}
                  height={30}
                  alt="프로필이미지 수정 버튼 이미지"
                  className="absolute bottom-[180px] left-[65px]"
                />
              </button>
              <input
                type="file"
                id="profile_image-input"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <Input
              placeholder={user.nickname}
              label="닉네임"
              fontSize="14"
              gap="8"
            />
            <div className="flex justify-center gap-3">
              <Button variant="secondary" size="large" font="14">
                취소하기
              </Button>
              <Button variant="primary" size="large" font="14" disabled>
                수정하기
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <div className="mx-12">
        <nav className="flex gap-5">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              className={`text-lg font-bold ${
                activeTab === link.label ? 'border-b-2 border-black' : ''
              }`}
              onClick={() => navClick(link.label)}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="mt-8">{renderActiveComponent()}</div>
      </div>
    </main>
  );
}
