/* eslint-disable prettier/prettier */

import Modal from '@/components/@shared/Modal';
import { GatheringCreaterDTO } from '@/types/gathering.types';
import Image from 'next/image';
import GatheringCreaterProfileGatheringList from './GatheringCreaterProfileGatheringList';

interface GatheringCreaterProfileModalProps {
  isModal: boolean;
  onClose: () => void;
  createrProfile: GatheringCreaterDTO['get'];
}
export default function GatheringCreaterProfileModal({
  isModal,
  onClose,
  createrProfile,
}: GatheringCreaterProfileModalProps) {
  const levelImage = Math.min(createrProfile.gatherings.length, 6);

  return (
    <Modal
      isOpen={isModal}
      onClose={onClose}
      customDimStyle="w-full bg-secondary-80 md:w-[694px] lg:w-[1281px] text-default-inverse"
    >
      <div className="bg-primary-30 relative z-0 mb-5 mt-8 flex items-center justify-between overflow-hidden rounded-[25px] border px-3 py-8 md:mb-7 md:px-10">
        <div className="text-default-inverse z-10 flex flex-col gap-3">
          <Image
            src={createrProfile.image || '/profile_image_default.png'}
            width={66}
            height={66}
            alt="프로필 이미지 미리보기"
            className="h-[56px] w-[56px] rounded-full md:h-[66px] md:w-[66px]"
          />
          <div>
            <p className="text-base font-bold md:text-2xl">
              {createrProfile.nickname}
            </p>
            <p className="text-sm md:text-base">{createrProfile.email}</p>
          </div>
        </div>
        <Image
          src={`/myprofile_bg/l/${levelImage}.svg`}
          width={612}
          height={224}
          alt="프로필 배경"
          className="pointer-events-none absolute top-3 -z-10 hidden lg:-top-1 lg:left-72 lg:block"
        />
        <Image
          src={`/myprofile_bg/l/${levelImage}.svg`}
          width={540}
          height={224}
          alt="프로필 배경"
          className="pointer-events-none absolute left-16 top-3 -z-10 hidden md:-top-1 md:left-36 md:block lg:hidden"
        />
        <Image
          src={`/myprofile_bg/s/${levelImage}.svg`}
          width={241}
          height={121}
          alt="프로필 배경"
          className="pointer-events-none absolute left-20 top-5 -z-10 md:hidden"
        />
      </div>
      <hr className="mb-16" />
      <p className="mb-10 text-lg font-bold">
        모집글 ({createrProfile.gatherings.length})
      </p>
      <GatheringCreaterProfileGatheringList
        createrGatheringList={createrProfile.gatherings}
      />
    </Modal>
  );
}
