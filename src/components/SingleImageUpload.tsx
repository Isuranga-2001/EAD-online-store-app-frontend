import React, { ChangeEvent, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "./Button";
import classNames from "classnames";

/**
 * Props for the SingleImageUpload component.
 */
interface SingleImageUploadProps {
  /** The name attribute for the file input */
  name: string;
  /** The currently selected file */
  file: File | null;
  /** The function to call when a file is selected */
  setFile: (file: File | null) => void;
  /** The maximum file size in bytes */
  maxFileSize?: number;
  /** The caption for the file input */
  caption: string;
  /** Additional class names for the container */
  containerClassName?: string;

  currentImage?: string | null;
}

/**
 * SingleImageUpload component renders an image upload input with a preview.
 *
 * @param {SingleImageUploadProps} props - The props for the SingleImageUpload component.
 * @returns {JSX.Element} The rendered SingleImageUpload component.
 */
const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  name = "imageInput",
  file = null,
  setFile,
  maxFileSize,
  caption = "Select Image",
  containerClassName,
  currentImage = null,
}) => {
  const [errorText, setErrorText] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (maxFileSize && selectedFile.size > maxFileSize) {
        setErrorText(`File size should not exceed ${maxFileSize / 1000} KB.`);
        setFile(null);
      } else {
        setErrorText("");
        setFile(selectedFile);
      }
    }
  };

  return (
    <div className={classNames(containerClassName)}>
      <label className={"block mb-2 text-sm font-medium text-gray-700"}>
        {caption}
      </label>
      <div className="w-48 flex flex-col items-center">
        <input
          type="file"
          id={name}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {file ? (
          <div className="w-48 h-44 flex flex-col items-center">
            <img
              src={URL.createObjectURL(file)}
              alt="Selected"
              className="w-48 h-32 object-cover mb-1 rounded-lg border border-blue/70"
            />
            <Button
              caption="Change Image"
              width="w-48"
              onClick={() => document.getElementById(name)?.click()}
            />
          </div>
        ) : !currentImage ? (
          <div
            className="w-48 h-32 bg-gray-100 border rounded-lg border-blue/70 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-100/20 transition-all ease-in-out duration-300"
            onClick={() => document.getElementById(name)?.click()}
          >
            <FaPlus className="text-blue text-2xl mb-2" />
            <span className="text-gray-500">Select Image</span>
          </div>
        ) : (
          <div className="w-48 h-44 flex flex-col items-center">
            <img
              src={currentImage}
              alt="Current Featured Image"
              className="w-48 h-32 object-cover mb-1 rounded-lg border border-blue/70"
            />
            <Button
              caption="Change Image"
              width="w-48"
              onClick={() => document.getElementById(name)?.click()}
            />
          </div>
        )}
        {errorText && <p className="mt-1 text-xs text-red">{errorText}</p>}
      </div>
    </div>
  );
};

export default SingleImageUpload;
