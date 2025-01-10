import Image from 'next/image';

/**
 * 폼 필드 컴포넌트의 Props 인터페이스
 * @interface FormFieldProps
 */
interface FormFieldProps {
  /** 입력 필드의 고유 식별자 */
  id: string;
  /** 입력 필드의 레이블 텍스트 */
  label: string;
  /** 입력 필드의 타입 (기본값: 'text') */
  type?: 'text' | 'email' | 'password';
  /** 입력 필드의 placeholder 텍스트 */
  placeholder: string;
  /** 비밀번호 토글 아이콘 표시 여부 */
  showPasswordIcon?: boolean;
}

/**
 * 재사용 가능한 폼 입력 필드 컴포넌트
 * @param {string} id - 입력 필드의 고유 식별자
 * @param {string} label - 입력 필드의 레이블
 * @param {('text'|'email'|'password')} [type='text'] - 입력 필드의 타입
 * @param {string} placeholder - 입력 필드의 placeholder 텍스트
 * @param {boolean} [showPasswordIcon=false] - 비밀번호 토글 아이콘 표시 여부
 */
export default function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  showPasswordIcon = false,
}: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm text-text-secondary">
        {label}
        <div className={`${showPasswordIcon ? 'relative' : ''} mt-1`}>
          <input
            id={id}
            type={type}
            name={id}
            aria-label={`${label} 입력`}
            placeholder={placeholder}
            className="w-full rounded bg-brand-tertiary px-4 py-2.5 text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-1 focus:ring-status-focus"
          />
          {/* 비밀번호 관련 필드에만 토글 아이콘 표시 */}
          {showPasswordIcon && type === 'password' && (
            <button
              type="button"
              aria-label="비밀번호 보기/숨기기"
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Image
                src="/password-hide.svg"
                alt="비밀번호 보기/숨기기"
                width={24}
                height={24}
                className="object-contain"
              />
            </button>
          )}
        </div>
      </label>
    </div>
  );
}
