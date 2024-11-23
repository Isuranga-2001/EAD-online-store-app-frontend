import React, { ChangeEvent } from "react";
import classNames from "classnames";

/**
 * Props for the RadioGroup component.
 */
interface RadioGroupProps {
  /** The value of the selected radio button */
  value: string;
  /** The options for the radio group */
  options: { value: string; label: string }[];
  /** Optional caption text displayed above the radio group */
  caption?: string;
  /** Callback function to handle changes in the radio group */
  onChange: (value: string) => void;
  /** Whether the radio group is disabled */
  disabled?: boolean;
  /** The width of the radio group container */
  width?: string;
  /** Custom class name for the radio group container */
  containerClassName?: string;
  /** Custom class name for the caption */
  captionClassName?: string;
  /** Custom class name for the radio buttons */
  radioClassName?: string;
  /** Optional error text displayed below the radio group */
  errorText?: string;
  /** Optional error text color */
  errorTextColor?: string;
  /** Alignment of the radio buttons inside the container (e.g., 'left', 'center', 'right') */
  alignment?: "left" | "center" | "right";
}

/**
 * RadioGroup component renders a group of radio buttons with optional caption and error text.
 *
 * @param {RadioGroupProps} props - The props for the RadioGroup component.
 * @returns {JSX.Element} The rendered RadioGroup component.
 */
const RadioGroup: React.FC<RadioGroupProps> = ({
  value = "",
  options = [],
  onChange = () => {},
  disabled = false,
  width = "w-full",
  containerClassName = "",
  captionClassName = "",
  radioClassName = "",
  caption,
  errorText,
  errorTextColor = "text-red",
  alignment = "left",
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const alignmentClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
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
      <div className={classNames("flex flex-wrap", alignmentClass[alignment])}>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center mr-4 mb-2 text-black"
          >
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              disabled={disabled}
              className={classNames("mr-2", radioClassName)}
            />
            {option.label}
          </label>
        ))}
      </div>
      {errorText && (
        <p className={classNames("mt-1 text-xs", errorTextColor)}>
          {errorText}
        </p>
      )}
    </div>
  );
};

export default RadioGroup;
