'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Button from './Button';

export default function Header() {
  const [user, setUser] = useState(true);
  const [searching, setSearching] = useState(true);
  const handleLogin = () => {
    setUser(!user);
  };
  const handleSearching = () => {
    setSearching(!searching);
  };
  const navLinks = [
    { label: '모임 찾기', href: '/' },
    { label: '찜한 모임', href: '/likes' },
    { label: '모든 리뷰', href: '/allreview' },
  ];
  const searchImg = searching
    ? { src: '/search.png', alt: '검색버튼' }
    : { src: '/search_delete.png', alt: '검색닫기버튼' };

  return (
    <div className="relative z-10">
      <div className="fixed top-0 w-full">
        <div className="mx-auto flex h-[70px] w-full max-w-[1920px] items-center justify-between border-b bg-orange-600 px-5 md:h-[80px] md:px-[30px] xl:h-[100px]">
          {/* Navigation Links */}
          <nav className="flex items-center gap-5 text-base font-bold text-white">
            <Button
              type="button"
              variant="secondary"
              size="small"
              font="14"
              onClick={handleLogin}
            >
              {user ? '로그인' : '로그아웃'}
            </Button>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hidden rounded-xl px-4 py-2 transition duration-300 hover:bg-orange-700 md:block"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-5">
            <button type="button" onClick={handleSearching}>
              <Image
                src={searchImg.src}
                width={20}
                height={20}
                alt={searchImg.alt}
              />
            </button>
            {user ? (
              <div className="flex gap-7 text-base font-bold text-white">
                <Link href="/login">
                  <Button
                    type="button"
                    variant="primary"
                    size="small"
                    font="14"
                    className="border border-white"
                  >
                    로그인/회원가입
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex text-base font-bold text-white">
                <Link href="/mypage">
                  <Image
                    src="/default_mypage.png"
                    width={30}
                    height={30}
                    alt="마이페이지 이미지"
                  />
                </Link>
              </div>
            )}
            <Image
              src="/hamburger.png"
              width={20}
              height={20}
              alt="모바일네비게이션바"
              className="md:hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
