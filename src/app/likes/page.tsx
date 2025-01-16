'use client';

import HeaderTitle from '@/components/@shared/HeaderTitle';
import PageContainer from '@/components/@shared/PageContainer';
import LikesGatheringList from '@/components/likes/LikesGatheringList';

export default function LikeGathering() {
  const getLocalStorageItem = localStorage.getItem('favorites');
  const getLocalStorageArray = getLocalStorageItem
    ? JSON.parse(getLocalStorageItem)
    : [];
  const likesGatherings = getLocalStorageArray; // 추후 이 부분에 gatheringID 값을 활용해 데이터를 불러올 것

  return (
    <PageContainer>
      <HeaderTitle
        title="찜한 모임"
        content="마감되기 전에 지금 바로 참여해보세요"
      />
      <LikesGatheringList likesGatherings={likesGatherings} />
    </PageContainer>
  );
}
