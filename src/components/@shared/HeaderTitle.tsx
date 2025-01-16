import clsx from 'clsx';

interface HeaderTitleProps {
  title: string;
  content: string;
  order?: 'inverse';
}

export default function HeaderTitle({
  title,
  content,
  order,
}: HeaderTitleProps) {
  return (
    <header className="flex flex-col gap-2">
      <h1
        className={clsx('text-2xl font-semibold', {
          'order-2': order === 'inverse',
        })}
      >
        {title}
      </h1>
      <p
        className={clsx('text-sm font-medium', {
          'order-1': order === 'inverse',
        })}
      >
        {content}
      </p>
    </header>
  );
}
