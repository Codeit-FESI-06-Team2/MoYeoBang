'use client';

import FormField from '@/components/@shared/form/Formfield';

/**
 * 회원가입 폼 데이터 인터페이스
 * @interface SignUpFormData
 */
interface SignUpFormData {
  /** 사용자 이메일 */
  email: string;
  /** 사용자 닉네임 */
  nickname: string;
  /** 사용자 비밀번호 */
  password: string;
}

/**
 * 회원가입 폼 컴포넌트
 * 사용자의 회원가입 정보를 입력받는 폼을 렌더링
 */
export default function SignUpForm() {
  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black pt-32">
      <div className="w-full max-w-md rounded-lg bg-brand-secondary p-6">
        <h2 className="text-center text-2xl font-bold text-text-primary">
          회원가입
        </h2>

        <form className="mt-6 space-y-4">
          <FormField
            id="nickname"
            label="이름"
            placeholder="이름을 입력해주세요."
          />
          <FormField
            id="email"
            label="아이디"
            type="email"
            placeholder="이메일을 입력해주세요."
          />
          <FormField
            id="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            showPasswordIcon
          />
          <FormField
            id="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            showPasswordIcon
          />

          <button
            type="submit"
            className="bg-status-signup-red mt-6 w-full rounded py-2.5 text-text-primary hover:opacity-90 focus:ring-2"
          >
            회원가입
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-text-secondary">
          이미 회원이신가요?
          <a
            href="/login"
            className="text-status-danger hover:text-status-hover"
          >
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}
