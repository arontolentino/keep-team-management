import Spinner from './Spinner';

export default function TableLoading({ title }) {
  return (
    <div className="py-4 flex flex-col items-center justify-center">
      <Spinner size={60} />
      {title && <p className="mt-2">{title}</p>}
    </div>
  );
}
