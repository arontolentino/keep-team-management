import { classNames } from '../utils';

export default function Button({ className, children, ...props }) {
  return (
    <button
      className={classNames(
        'inline-block rounded-md border border-transparent bg-black py-2 px-4 text-base text-white font-medium  hover:bg-opacity-75',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
