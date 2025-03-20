'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/@shared/button/Button';
import Modal from '@/components/@shared/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  cancelParticipation,
  checkParticipationStatus,
  participateGathering,
} from '@/axios/gather/apis';
import { useState, useEffect } from 'react';

interface JoinBoxSectionProps {
  gatheringId: number;
  name: string;
  themeName: string;
  participantCount: number;
  capacity: number;
  registrationEnd: string;
}

export default function JoinBoxSection({
  gatheringId,
  name,
  themeName,
  participantCount: initialParticipantCount,
  capacity,
  registrationEnd,
}: JoinBoxSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const storageKey = `participation-${gatheringId}`;
  const [isParticipating, setIsParticipating] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(storageKey) === 'true';
    }
    return false;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentParticipantCount, setCurrentParticipantCount] = useState(
    initialParticipantCount
  );

  const participationRate = (currentParticipantCount / capacity) * 100;
  const isRecruiting = currentParticipantCount < capacity;
  const isExpanded = searchParams.has('joinbox');
  const isExpired = new Date(registrationEnd) < new Date();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, isParticipating.toString());
    }
  }, [isParticipating, storageKey]);

  useEffect(() => {
    const checkParticipationState = async () => {
      try {
        const response = await checkParticipationStatus(gatheringId);
        if (response?.data) {
          setIsParticipating(response.data.isParticipating);
          setCurrentParticipantCount(response.data.participantCount);
        }
      } catch (error: any) {
        // 500 에러는 무시하고 기존 상태 유지
        if (error.response?.status === 401) {
          localStorage.removeItem(storageKey);
          setIsParticipating(false);
        }
        // 500 에러 시 기존 상태 유지
        if (error.response?.status !== 500) {
          console.error('참여 상태 확인 실패:', error);
        }
      }
    };

    const handleFocus = () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        checkParticipationState();
      } else {
        // 토큰이 없는 경우 처리
        setIsParticipating(false);
        localStorage.removeItem(storageKey);
      }
    };

    window.addEventListener('focus', handleFocus);

    // 초기 실행
    const token = localStorage.getItem('accessToken');
    if (token) {
      checkParticipationState();
    }

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [gatheringId, storageKey]);

  const { mutate: participate } = useMutation({
    mutationFn: () => participateGathering(gatheringId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['gathering-detail', gatheringId],
      });
      setIsParticipating(true);
      setCurrentParticipantCount((prev) => prev + 1);
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        localStorage.removeItem(storageKey);
        setIsParticipating(false);
      }
    },
  });

  const { mutate: cancel } = useMutation({
    mutationFn: () => cancelParticipation(gatheringId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['gathering-detail', gatheringId],
      });
      setIsParticipating(false);
      setCurrentParticipantCount((prev) => prev - 1);
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        localStorage.removeItem(storageKey);
        setIsParticipating(false);
      }
    },
  });

  const handleParticipation = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsModalOpen(true);
      return;
    }

    if (isParticipating) {
      cancel();
    } else {
      participate();
    }
  };

  const getStatusConfig = () => {
    if (isExpired) {
      return {
        text: '마감',
        className: 'text-status-danger',
      };
    }
    if (isRecruiting) {
      return {
        text: '모집중',
        className: 'text-primary-40',
      };
    }
    return {
      text: '모집완료',
      className: 'text-status-danger',
    };
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (isExpanded) {
      current.delete('joinbox');
    } else {
      current.set('joinbox', 'expanded');
    }
    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.replace(`${pathname}${query}`, { scroll: false });
  };

  const getButtonText = () => {
    if (isExpired) return '마감된 모임입니다';
    if (isParticipating) return '참여 취소';
    if (isRecruiting) return '참여하기';
    return '모집완료';
  };

  const isButtonDisabled = () => {
    if (isExpired) return true;
    if (isParticipating) return false;
    return !isRecruiting;
  };

  const status = getStatusConfig();

  return (
    <>
      <aside className="w-full lg:w-[369px]">
        {/* 모바일 뷰 */}
        <div className="lg:hidden">
          <div className="fixed bottom-0 left-0 right-0 z-50">
            <div className="mx-auto w-full max-w-screen-xl">
              {isExpanded && (
                <div className="mx-4 rounded-lg border border-secondary-70 bg-[#17171C] p-4 sm:mx-6">
                  <div className="mb-6">
                    <h2 className="mb-2 text-xl font-bold text-text-default">
                      {name}
                    </h2>
                    <p className="text-secondary-50">{themeName}</p>
                  </div>

                  <div className="mb-6">
                    <div className="mb-2 flex items-center text-sm text-text-default">
                      <Image
                        src="/icons/human.svg"
                        alt="participants"
                        width={16}
                        height={16}
                        className="mr-1"
                      />
                      <span>
                        {currentParticipantCount}/{capacity}
                      </span>
                      <span className="mx-2">·</span>
                      <span className={status.className}>{status.text}</span>
                    </div>
                    <div className="relative h-1 w-full rounded-full bg-secondary-90">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full bg-primary-40 transition-all duration-300"
                        style={{ width: `${participationRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="mx-4 flex items-center justify-between gap-4 py-4 sm:mx-6">
                <Button
                  onClick={toggleExpand}
                  className="flex h-11 items-center justify-center rounded-lg p-2"
                  aria-label={isExpanded ? '접기' : '펼치기'}
                >
                  <Image
                    src="/icons/chevron_vector.svg"
                    alt="toggle button"
                    width={24}
                    height={24}
                    className={`transform transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </Button>

                <div className="flex-1">
                  <Button
                    variant="primary"
                    onClick={handleParticipation}
                    className="h-11 w-full text-base font-semibold"
                    disabled={isButtonDisabled()}
                  >
                    {getButtonText()}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 데스크톱 뷰 */}
        <div className="hidden lg:block">
          <div className="rounded-xl border border-secondary-70 bg-[#17171C]">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="mb-2 text-xl font-bold text-text-default">
                  {name}
                </h2>
                <p className="text-secondary-50">{themeName}</p>
              </div>

              <div className="mb-5">
                <div className="mb-2 flex items-center text-sm text-text-default">
                  <Image
                    src="/icons/human.svg"
                    alt="participants"
                    width={16}
                    height={16}
                    className="mr-1"
                  />
                  <span>
                    {currentParticipantCount}/{capacity}
                  </span>
                  <span className="mx-2">·</span>
                  <span className={status.className}>{status.text}</span>
                </div>
                <div className="relative h-1 w-full rounded-full bg-secondary-90">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-primary-40 transition-all duration-300"
                    style={{ width: `${participationRate}%` }}
                  />
                </div>
              </div>

              <Button
                variant="primary"
                onClick={handleParticipation}
                className="h-11 w-full text-base font-semibold"
                disabled={isButtonDisabled()}
              >
                {getButtonText()}
              </Button>
            </div>
          </div>
        </div>
      </aside>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customDimStyle="w-[309px] h-[209px]"
      >
        <div className="flex h-full flex-col items-center justify-center">
          <h2 className="mb-4 text-xl font-bold">로그인이 필요해요</h2>
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(false)}
            className="h-11 w-[192px] text-center text-base font-semibold"
          >
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
}
