import React, { FC, useState } from "react";
import TextBox from "./TextBox";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import Button from "./Button";
import classNames from "classnames";

interface SingleFieldSearchBoxProps {
  /** The type of input field (text, number, date, time) */
  inputType?: "text" | "number" | "date" | "time";
  /** The caption text for the search input field */
  caption: string;
  /** The placeholder text for the search input field */
  placeholder: string;
  /** The caption text for the button */
  buttonCaption: string;
  /** Callback function to handle search button click */
  onSearch: (query: string) => void;
  /** Optional maximum character count for the search input */
  maxCharCount?: number;
  /** Whether the search input field is disabled */
  disabled?: boolean;
  /** Custom class name for the search container */
  containerClassName?: string;
  /** Custom class name for the text box container */
  textBoxContainerClassName?: string;
  /** Custom class name for the text box input field */
  textBoxInputClassName?: string;
  /** Custom class name for the text box caption */
  textBoxCaptionClassName?: string;
  /** Custom class name for the search button */
  buttonClassName?: string;
  /** Custom class name for the button icon */
  buttonIconClassName?: string;
}

const SingleFieldSearchBox: FC<SingleFieldSearchBoxProps> = ({
  inputType = "text",
  caption,
  placeholder,
  buttonCaption,
  onSearch,
  maxCharCount,
  disabled = false,
  containerClassName = "",
  textBoxContainerClassName = "",
  textBoxInputClassName = "",
  textBoxCaptionClassName = "",
  buttonClassName = "",
  buttonIconClassName = "",
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const renderInputField = () => {
    switch (inputType) {
      case "text":
      case "number":
        return (
          <TextBox
            type={inputType}
            caption={caption}
            value={query}
            placeholder={placeholder}
            onChange={setQuery}
            maxCharCount={maxCharCount}
            disabled={disabled}
            inputClassName={textBoxInputClassName}
            captionClassName={textBoxCaptionClassName}
          />
        );
      case "date":
        return (
          <DatePicker
            value={query}
            placeholder={placeholder}
            onChange={setQuery}
            disabled={disabled}
            inputClassName={textBoxInputClassName}
            captionClassName={textBoxCaptionClassName}
            caption={caption}
          />
        );
      case "time":
        return (
          <TimePicker
            value={query}
            placeholder={placeholder}
            onChange={setQuery}
            disabled={disabled}
            inputClassName={textBoxInputClassName}
            captionClassName={textBoxCaptionClassName}
            caption={caption}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={classNames("flex flex-col", containerClassName)}>
      <div className={classNames(textBoxContainerClassName)}>
        {renderInputField()}
      </div>
      <div className="flex justify-end mt-2">
        <Button
          caption={buttonCaption}
          onClick={handleSearch}
          disabled={disabled}
          buttonClassName={buttonClassName}
          iconClassName={buttonIconClassName}
        />
      </div>
    </div>
  );
};

export default SingleFieldSearchBox;
