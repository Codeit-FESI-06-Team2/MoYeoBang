import Image from 'next/image';

interface CapacitySelectorProps {
  capacity: number;
  setCapacity: (newCapacity: number) => void;
}

export default function CapacitySelector({
  capacity,
  setCapacity,
}: CapacitySelectorProps) {
  const updateCapacity = (type: 'increment' | 'decrement') => {
    const newCapacity = capacity + (type === 'increment' ? 1 : -1);
    if (newCapacity >= 2 && newCapacity <= 6) setCapacity(newCapacity);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-semibold text-gray-800">
        모집 정원 (본인을 포함한 모집 정원)
      </h2>
      <div className="flex items-center justify-center">
        <Image
          src="/icons/minus.svg"
          alt="마이너스 아이콘"
          width={24}
          height={24}
          onClick={() => updateCapacity('decrement')}
          className={`${capacity <= 2 ? 'cursor-default opacity-50' : 'cursor-pointer'}`}
        />
        <span className="mx-5 text-5xl font-bold">{capacity}</span>
        <Image
          src="/icons/plus.svg"
          alt="플러스 아이콘"
          width={24}
          height={24}
          onClick={() => updateCapacity('increment')}
          className={`${capacity >= 6 ? 'cursor-default opacity-50' : 'cursor-pointer'}`}
        />
      </div>
    </div>
  );
}
