export default function FormSelect({
  className,
  options,
  optionDisplay,
  ...props
}) {
  return (
    <select
      className="block w-full rounded-md border border-gray-300 pl-3 pr-8 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
      {...props}
    >
      {options &&
        options.length &&
        options.map((option) =>
          optionDisplay ? (
            <option value={JSON.stringify(option)}>
              {optionDisplay(option)}
            </option>
          ) : (
            <option value={JSON.stringify(option)}>{option.label}</option>
          )
        )}
    </select>
  );
}
