import React, { ChangeEvent } from "react";
import classNames from "classnames";

/**
 * Props for the Dropdown component.
 */
interface DropdownProps {
  /** The value of the selected option */
  value: string | number | undefined;
  /** The options for the dropdown */
  options: { value: string | number | undefined; label: string }[];
  /** Optional caption text displayed above the dropdown */
  caption?: string;
  /** The autoComplete attribute for the dropdown.  */
  autoComplete?: string;
  /** Callback function to handle changes in the dropdown */
  onChange: (value: string) => void;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** The width of the dropdown container */
  width?: string;
  /** Custom class name for the dropdown container */
  containerClassName?: string;
  /** Custom class name for the caption */
  captionClassName?: string;
  /** Custom class name for the dropdown */
  selectClassName?: string;
  /** Optional error text displayed below the dropdown */
  errorText?: string;
  /** Optional error text color */
  errorTextColor?: string;
}

/**
 * Dropdown component renders a select element with optional caption and options.
 *
 * @param {DropdownProps} props - The props for the Dropdown component.
 * @returns {JSX.Element} The rendered Dropdown component.
 */
const Dropdown: React.FC<DropdownProps> = ({
  value = "",
  options = [],
  autoComplete = "off",
  onChange = () => {},
  disabled = false,
  width = "w-full",
  containerClassName = "",
  captionClassName = "",
  selectClassName = "",
  caption,
  errorText,
  errorTextColor = "text-red",
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={classNames(width, containerClassName)}>
      {caption && (
        <label
          className={classNames(
            "block mb-1 text-sm font-medium text-gray-700",
            captionClassName
          )}
        >
          {caption}
        </label>
      )}
      <select
        value={value}
        autoComplete={autoComplete}
        onChange={handleChange}
        disabled={disabled}
        className={classNames(
          "h-10 block w-full rounded-md border-0 px-3.5 py-2.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-opacity-20 focus:ring-inset hover:ring-blue focus:ring-blue sm:text-sm sm:leading-6 duration-300 ease-in-out transition-all",
          selectClassName
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorText && (
        <p className={classNames("mt-1 text-xs", errorTextColor)}>
          {errorText}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
