import React, { ChangeEvent } from "react";
import classNames from "classnames";

/**
 * Props for the TextArea component.
 */
interface TextAreaProps {
  /** The value of the textarea */
  value: string;
  /** The placeholder text for the textarea */
  placeholder: string;
  /** Optional caption text displayed above the textarea */
  caption?: string;
  /** Callback function to handle changes in the textarea */
  onChange: (value: string) => void;
  /** Whether the textarea is disabled */
  disabled?: boolean;
  /** The width of the textarea container */
  width?: string;
  /** Custom class name for the textarea container */
  containerClassName?: string;
  /** Custom class name for the caption */
  captionClassName?: string;
  /** Custom class name for the textarea */
  textAreaClassName?: string;
  /** Optional error text displayed below the textarea */
  errorText?: string;
  /** Optional error text color */
  errorTextColor?: string;
  /** Optional maximum character count */
  maxCharCount?: number;
  /** Optional number of rows for the textarea */
  rows?: number;
  /** Whether the input text should be in uppercase */
  uppercase?: boolean;
}

/**
 * TextArea component renders a textarea with optional caption and error text.
 *
 * @param {TextAreaProps} props - The props for the TextArea component.
 * @returns {JSX.Element} The rendered TextArea component.
 */
const TextArea: React.FC<TextAreaProps> = ({
  value = "",
  placeholder = "Placeholder",
  onChange = () => {},
  disabled = false,
  width = "w-full",
  containerClassName = "",
  captionClassName = "",
  textAreaClassName = "",
  caption,
  errorText,
  errorTextColor = "text-red",
  maxCharCount,
  rows = 4,
  uppercase = false,
}) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    if (uppercase) {
      inputValue = inputValue.toUpperCase();
    }
    if (!maxCharCount || inputValue.length <= maxCharCount) {
      onChange(inputValue);
    }
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
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
        rows={rows}
        className={classNames(
          "block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-opacity-20 focus:ring-inset hover:ring-blue focus:ring-blue sm:text-sm sm:leading-6 duration-300 ease-in-out transition-all",
          textAreaClassName
        )}
      />
      <div className="flex justify-between mt-1 text-xs">
        {errorText && <p className={classNames(errorTextColor)}>{errorText}</p>}
        {maxCharCount && (
          <div className="text-gray-500">
            {value.length}/{maxCharCount} characters
          </div>
        )}
      </div>
    </div>
  );
};

export default TextArea;
