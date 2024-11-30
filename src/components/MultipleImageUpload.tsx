import React, { ChangeEvent, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "./Button";
import classNames from "classnames";

/**
 * Props for the MultipleImageUpload component.
 */
interface MultipleImageUploadProps {
  /** The name attribute for the file input */
  name: string;
  /** The currently selected files */
  files: File[];
  /** The function to call when files are selected */
  setFiles: (files: File[]) => void;
  /** The maximum file size in bytes */
  maxFileSize?: number;
  /** The maximum number of images allowed */
  maxImageCount?: number;
  /** The caption for the file input */
  caption?: string;
  /** Additional class names for the container */
  containerClassName?: string;
}

/**
 * MultipleImageUpload component renders an image upload input with a preview for multiple images.
 *
 * @param {MultipleImageUploadProps} props - The props for the MultipleImageUpload component.
 * @returns {JSX.Element} The rendered MultipleImageUpload component.
 */
const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  name = "imageInput",
  files = [],
  setFiles,
  maxFileSize,
  maxImageCount = 5,
  caption = "Select Images",
  containerClassName,
}) => {
  const [errorText, setErrorText] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (maxFileSize && selectedFile.size > maxFileSize) {
        setErrorText(`File size should not exceed ${maxFileSize / 1000} KB.`);
      } else {
        setErrorText("");
        setFiles([...files, selectedFile]);
      }
    }
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  const handleRemoveImage = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  return (
    <div className={classNames("w-full", containerClassName)}>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {caption}
      </label>
      <div className="w-full flex flex-wrap items-start">
        {files.map((file, index) => (
          <div
            key={index}
            className="w-48 h-44 flex flex-col items-start me-6 mb-2"
          >
            <img
              src={URL.createObjectURL(file)}
              alt={`Selected ${index}`}
              className="min-w-48 min-h-32 object-cover mb-1 rounded-lg border border-blue/70"
            />
            <Button
              caption="Remove Image"
              width="w-48"
              onClick={() => handleRemoveImage(index)}
            />
          </div>
        ))}
        {files.length < maxImageCount && (
          <div
            className="w-48 h-32 me-6 mb-4 bg-gray-100 border rounded-lg border-blue/70 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-100/20 transition-all ease-in-out duration-300"
            onClick={() => document.getElementById(name)?.click()}
          >
            <FaPlus className="text-green text-2xl mb-2" />
            <span className="text-gray-500">Add Image</span>
            <input
              type="file"
              id={name}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}
        {errorText && <p className="mt-1 text-xs text-red">{errorText}</p>}
      </div>
    </div>
  );
};

export default MultipleImageUpload;
