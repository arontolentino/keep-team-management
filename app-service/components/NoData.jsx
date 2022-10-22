import { BanIcon } from '@heroicons/react/outline';

export default function NoData({ title }) {
  return (
    <div className="py-6 space-y-6 flex text-lg flex-col items-center justify-center">
      <BanIcon className="w-8 h-8" />
      {title && title}
    </div>
  );
}
