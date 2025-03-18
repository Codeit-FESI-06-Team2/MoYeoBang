import type { Metadata } from 'next';
import localFont from 'next/font/local';

import Header from '../components/@shared/Header';
import { Providers } from '../providers/providers';
import '../styles/globals.css';
import '../styles/scrollbar.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '모여방',
  description: '방탈출 팀원을 모집하고, 방탈출 경험을 나눠요. 일단 모여방!',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/icons/favicon.svg',
  },
  keywords: [
    '방탈출',
    '방탈출 테마',
    '방탈출 모임',
    '방탈출 모집',
    '방탈출 리뷰',
    '모여방',
  ],
  verification: {
    google: 'NO6wWrXA13u8FM27QFz64-jdkx536ZTUfHWtctYID00',
    other: {
      'naver-site-verification': 'd5f646149d5927e1dd0e895454e9a8ca24547e97',
    },
  },
  openGraph: {
    title: '모여방',
    description: '방탈출 팀원을 모집하고, 방탈출 경험을 나눠요. 일단 모여방!',
    url: 'https://moyeobang.vercel.app/',
    images: [
      {
        url: '/images/thumbnail.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${pretendard.className}`}
    >
      <body className="scrollbar-x-hidden default-scrollbar">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
