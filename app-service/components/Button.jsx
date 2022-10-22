import { classNames } from '../utils';

export default function Button({
  className,
  color = 'primary',
  children,
  ...props
}) {
  const BUTTON_COLORS = {
    primary: 'bg-black text-white hover:bg-opacity-75',
    secondary: 'bg-transparent text-black hover:bg-gray-200 ',
  };

  return (
    <button
      className={classNames(
        'inline-block rounded-md border border-transparent py-2 px-4 text-base font-medium  disabled:cursor-not-allowed disabled:bg-gray-200',
        BUTTON_COLORS[color],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
