import React, { FC, useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import Button from "./Button";
import classNames from "classnames";

interface SingleFieldDropdownSearchBoxProps {
  /** The caption text for the dropdown */
  caption: string;
  /** The caption text for the button */
  buttonCaption: string;
  /** Callback function to handle search button click */
  onSearch: (query: string) => void;
  /** The options for the dropdown */
  options: { value: string; label: string }[];
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Custom class name for the search container */
  containerClassName?: string;
  /** Custom class name for the dropdown container */
  dropdownContainerClassName?: string;
  /** Custom class name for the dropdown */
  dropdownClassName?: string;
  /** Custom class name for the dropdown caption */
  dropdownCaptionClassName?: string;
  /** Custom class name for the search button */
  buttonClassName?: string;
  /** Custom class name for the button icon */
  buttonIconClassName?: string;
}

const SingleFieldDropdownSearchBox: FC<SingleFieldDropdownSearchBoxProps> = ({
  caption,
  buttonCaption,
  onSearch,
  options,
  disabled = false,
  containerClassName = "",
  dropdownContainerClassName = "",
  dropdownClassName = "",
  dropdownCaptionClassName = "",
  buttonClassName = "",
  buttonIconClassName = "",
}) => {
  const [query, setQuery] = useState(
    options.length > 0 ? options[0].value : ""
  );

  useEffect(() => {
    if (options.length > 0) {
      setQuery(options[0].value);
    }
  }, [options]);

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className={classNames("flex flex-col", containerClassName)}>
      <div className={classNames(dropdownContainerClassName)}>
        <Dropdown
          value={query}
          options={options}
          onChange={setQuery}
          disabled={disabled}
          containerClassName={dropdownContainerClassName}
          selectClassName={dropdownClassName}
          captionClassName={dropdownCaptionClassName}
          caption={caption}
        />
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

export default SingleFieldDropdownSearchBox;
