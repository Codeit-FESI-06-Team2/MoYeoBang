import Input from '@/components/@shared/Input';
import Button from '@/components/@shared/Button';
import { themeList } from '@/constants/themeList';

interface ThemeSelectorProps {
  location: string;
  inputThemeName: string;
  setInputThemeName: (themeName: string) => void;
  searchThemes: () => void;
  filteredThemes: string[];
  setThemeName: (name: string) => void;
  selectedThemeName: string;
  setSelectedThemeName: (themeName: string) => void;
  searchAttempted: boolean;
}

export default function ThemeSelector({
  location,
  inputThemeName,
  setInputThemeName,
  searchThemes,
  filteredThemes,
  setThemeName,
  selectedThemeName,
  setSelectedThemeName,
  searchAttempted,
}: ThemeSelectorProps) {
  return (
    <div className="text-md flex w-full flex-col items-start gap-3">
      <h2 className="font-semibold text-gray-800">{`${themeList[location].label}의 방탈출 테마`}</h2>
      <div className="flex w-full items-center gap-2 md:gap-3">
        <Input
          placeholder="테마 제목을 입력하세요."
          inputProps={{
            type: 'text',
            value: inputThemeName,
            onChange: (e) => setInputThemeName(e.target.value),
          }}
        />
        <Button size="small" variant="secondary" onClick={searchThemes}>
          검색
        </Button>
      </div>
      {filteredThemes.length > 0 ? (
        <div className="mt-1 flex flex-wrap gap-1">
          {filteredThemes.map((filteredTheme) => (
            <button
              type="button"
              key={filteredTheme}
              onClick={() => {
                setSelectedThemeName(filteredTheme);
                setThemeName(filteredTheme);
              }}
              className={`rounded-full bg-slate-200 px-2 text-left ${
                selectedThemeName === filteredTheme
                  ? 'bg-brand-primary text-white'
                  : 'bg-brand-inverse text-black'
              }`}
            >
              {filteredTheme}
            </button>
          ))}
        </div>
      ) : (
        searchAttempted && (
          <div className="mb-2 mt-1 text-gray-500">검색 결과가 없습니다.</div>
        )
      )}
    </div>
  );
}
