'use client';

import Image from 'next/image';
import { useModal } from '@/hooks/useModal';
import GatheringModal from '../GatheringModal';

export default function CreateGatheringBtn() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <button
        type="button"
        className="fixed bottom-12 right-8 xl:bottom-16 xl:right-1/10"
        onClick={openModal}
      >
        <Image
          src="/icons/creator.svg"
          alt="모임 생성 아이콘"
          width={64}
          height={64}
          quality={100}
          className="h-14 w-14 md:h-16 md:w-16"
        />
      </button>

      {isOpen && <GatheringModal isOpen={isOpen} onClose={closeModal} />}
    </>
  );
}
