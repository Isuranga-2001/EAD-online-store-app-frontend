import React, { ChangeEvent } from "react";
import classNames from "classnames";

/**
 * Props for the TimePicker component.
 */
interface TimePickerProps {
  /** The value of the date input field */
  value: string;
  /** The placeholder text for the date input field */
  placeholder: string;
  /** The autoComplete attribute for the date input field */
  autoComplete?: string;
  /** Callback function to handle changes in the date input field */
  onChange: (value: string) => void;
  /** Whether the date input field is disabled */
  disabled?: boolean;
  /** The width of the date input field container */
  width?: string;
  /** Custom class name for the date input field container */
  containerClassName?: string;
  /** Custom class name for the caption */
  captionClassName?: string;
  /** Custom class name for the date input field */
  inputClassName?: string;
  /** Optional caption text displayed above the date input field */
  caption?: string;
  /** Optional error text displayed below the date input field */
  errorText?: string;
  /** Optional error text color */
  errorTextColor?: string;
}

/**
 * TimePicker component renders a date input field with optional caption and error text.
 *
 * @param {TimePickerProps} props - The props for the TimePicker component.
 * @returns {JSX.Element} The rendered TimePicker component.
 */
const TimePicker: React.FC<TimePickerProps> = ({
  value = "",
  placeholder = "Select a date",
  autoComplete = "off",
  onChange = () => {},
  disabled = false,
  width = "w-full",
  containerClassName = "",
  captionClassName = "",
  inputClassName = "",
  caption,
  errorText,
  errorTextColor = "text-red",
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      <input
        type="time"
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
        className={classNames(
          "block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-opacity-20 focus:ring-inset hover:ring-blue focus:ring-blue sm:text-sm sm:leading-6 duration-300 ease-in-out transition-all",
          inputClassName
        )}
      />
      {errorText && (
        <p className={classNames("mt-1 text-xs", errorTextColor)}>
          {errorText}
        </p>
      )}
    </div>
  );
};

export default TimePicker;
