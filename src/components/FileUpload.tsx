import React, { ChangeEvent, useState } from "react";
import { IconType } from "react-icons";
import Button from "./Button";
import classNames from "classnames";

/**
 * Props for the FileUpload component.
 */
interface FileUploadProps {
  /** The name attribute for the file input */
  name: string;
  /** The caption text displayed above the file input */
  caption?: string;
  /** The icon component to be displayed */
  icon: IconType;
  /** The type of file to accept */
  fileType: string;
  /** The currently selected file */
  file: File | null;
  /** The function to call when a file is selected */
  setFile: (file: File | null) => void;
  /** The maximum file size in bytes */
  maxFileSize?: number;
}

/**
 * FileUpload component renders a file input with an upload button.
 *
 * @param {FileUploadProps} props - The props for the FileUpload component.
 * @returns {JSX.Element} The rendered FileUpload component.
 */
const FileUpload: React.FC<FileUploadProps> = ({
  name = "fileInput",
  caption,
  icon: Icon,
  fileType = "pdf",
  file = null,
  setFile,
  maxFileSize,
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
    <div className="w-full">
      <div className="text-black text-md mb-2 flex items-center">
        {Icon && <Icon className="me-3 text-xl text-gray-700" />}
        <label
          className={classNames("block mb-1 text-sm font-medium text-gray-700")}
        >
          {caption || "Upload File"}
        </label>
      </div>
      <div className="w-full rounded-lg border border-dashed border-blue py-8 flex flex-col justify-center items-center">
        {Icon && <Icon className="text-gray-500 text-2xl" />}
        <input
          type="file"
          id={name}
          accept={`.${fileType}`}
          onChange={handleFileChange}
          className="hidden"
        />
        {file == null ? (
          <span className="text-xs text-gray-500 mt-2 mb-2">
            No file selected
          </span>
        ) : (
          <span className="text-xs text-green mt-2 mb-2">
            {file.name} - {Math.round(file.size / 1000)} KB
          </span>
        )}
        <Button
          caption="Select File"
          onClick={() => document.getElementById(name)?.click()}
        />
        {errorText && <p className="mt-1 text-xs text-red">{errorText}</p>}
      </div>
    </div>
  );
};

export default FileUpload;
