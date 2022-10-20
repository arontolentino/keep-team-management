import { classNames } from '../../utils';

export default function Formlabel({ children, className, ...props }) {
  return (
    <label
      className={classNames('block text-sm font-medium text-black', className)}
      {...props}
    >
      {children}
    </label>
  );
}
