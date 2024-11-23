import React, { ChangeEvent } from "react";
import classNames from "classnames";

/**
 * Props for the CheckBox component.
 */
interface CheckBoxProps {
  /** The checked state of the checkbox */
  checked: boolean;
  /** The label text for the checkbox */
  label: string;
  /** Callback function to handle changes in the checkbox state */
  onChange: (checked: boolean) => void;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Custom class name for the checkbox container */
  containerClassName?: string;
  /** Custom class name for the label */
  labelClassName?: string;
  /** Optional error text displayed below the checkbox */
  errorText?: string;
  /** Optional error text color */
  errorTextColor?: string;
}

/**
 * CheckBox component renders a checkbox input with optional label and error text.
 *
 * @param {CheckBoxProps} props - The props for the CheckBox component.
 * @returns {JSX.Element} The rendered CheckBox component.
 */
const CheckBox: React.FC<CheckBoxProps> = ({
  checked = false,
  label = "",
  onChange = () => {},
  disabled = false,
  containerClassName = "",
  labelClassName = "",
  errorText,
  errorTextColor = "text-red",
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className={classNames("flex flex-col", containerClassName)}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue"
        />
        <label
          className={classNames(
            "ml-2 block text-sm text-gray-900",
            labelClassName
          )}
        >
          {label}
        </label>
      </div>
      {errorText && (
        <p className={classNames("mt-1 text-xs", errorTextColor)}>
          {errorText}
        </p>
      )}
    </div>
  );
};

export default CheckBox;
