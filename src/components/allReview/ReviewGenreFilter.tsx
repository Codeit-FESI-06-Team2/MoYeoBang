const genres = [
  { label: '#전체', value: 'all' },
  { label: '#미스터리', value: 'mystery' },
  { label: '#공포', value: 'horror' },
  { label: '#판타지', value: 'fantasy' },
  { label: '#코믹', value: 'comic' },
  { label: '#SF', value: 'sci-fi' },
  { label: '#드라마', value: 'drama' },
  { label: '#스릴러', value: 'thriller' },
  { label: '#로맨스', value: 'romance' },
  { label: '#잠입', value: 'stealth' },
];

interface ReviewGenreFilterProps {
  selectedGenre: string;
  onGenreChange: (value: string) => void;
}

export default function ReviewGenreFilter({
  selectedGenre,
  onGenreChange,
}: ReviewGenreFilterProps) {
  const handleGenreClick = (value: string) => {
    onGenreChange(value);
  };

  const buttonClass = (isSelected: boolean) =>
    isSelected ? 'text-white customUnderline' : 'text-text-disabled';

  return (
    <ul className="scrollbar-hidden flex gap-3 overflow-x-auto overflow-y-hidden whitespace-nowrap text-lg font-semibold">
      {genres.map((genre) => (
        <button
          key={genre.value}
          type="button"
          onClick={() => handleGenreClick(genre.value)}
          className={buttonClass(selectedGenre === genre.value)}
        >
          {genre.label}
        </button>
      ))}
    </ul>
  );
}
