import { classNames } from '../utils';

export default function Formlabel({ children, className, ...props }) {
  return (
    <label
      className={classNames(
        'block text-sm font-medium text-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
