import { GatheringCreaterDTO } from '@/types/gathering.types';
import Button from '@/components/@shared/button/Button';
import GatheringCreaterProfileModal from '@/components/gatheringDetail/GatheringCreaterProfileModal';
import Image from 'next/image';

interface ProfileSectionProps {
  createrProfile: GatheringCreaterDTO['get'];
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export default function ProfileSection({
  createrProfile,
  isOpen,
  openModal,
  closeModal,
}: ProfileSectionProps) {
  return (
    <section className="w-full max-w-[326px] sm:max-w-[688px] lg:max-w-[805px]">
      <div className="flex h-[66px] w-full items-center justify-between rounded-2xl border border-default-inverse px-4 py-2 md:h-[90px] md:px-7">
        <div className="flex items-center gap-3">
          <Image
            src={createrProfile.image || '/icons/profile_image_default.svg'}
            width={52}
            height={52}
            alt="모임주최자 프로필 이미지"
            className="h-10 w-10 md:h-[52px] md:w-[52px]"
          />
          <div>
            <p className="text-base font-bold md:text-xl">
              {createrProfile.nickname}
            </p>
            <p className="text-xs md:text-sm">
              모집글 ({createrProfile.gatherings.length})
            </p>
          </div>
        </div>
        <Button
          variant="primary"
          fontSize="14"
          padding="12"
          className="hidden md:block"
          onClick={openModal}
        >
          프로필 보기
        </Button>
        <button onClick={openModal} type="button" className="block md:hidden">
          <Image
            src="/icons/right.svg"
            width={24}
            height={24}
            alt="모임 주최자 프로필 상세보기 버튼"
          />
        </button>
      </div>
      {isOpen && (
        <GatheringCreaterProfileModal
          isModal={isOpen}
          onClose={closeModal}
          createrProfile={createrProfile}
        />
      )}
    </section>
  );
}
