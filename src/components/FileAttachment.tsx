import React from "react";
import { FaFilePdf, FaFileExcel, FaFileWord, FaFileAlt } from "react-icons/fa";
import classNames from "classnames";

interface FileAttachmentProps {
  fileUrl: string;
  fileType: "pdf" | "excel" | "word" | "other";
  caption: string;
  width?: string;
  containerClassName?: string;
}

const FileAttachment: React.FC<FileAttachmentProps> = ({
  fileUrl,
  fileType,
  caption,
  width = "w-auto",
  containerClassName = "",
}) => {
  const MAX_CAPTION_LENGTH = 25;

  const getFileIcon = () => {
    switch (fileType) {
      case "pdf":
        return <FaFilePdf className="text-red text-xl" />;
      case "excel":
        return <FaFileExcel className="text-green text-xl" />;
      case "word":
        return <FaFileWord className="text-light-green text-xl" />;
      default:
        return <FaFileAlt className="text-black text-xl" />;
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = caption;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const truncatedCaption =
    caption.length > MAX_CAPTION_LENGTH
      ? `${caption.substring(0, MAX_CAPTION_LENGTH)}...`
      : caption;

  return (
    <div
      className={classNames(
        `${width} flex items-center max-h-12 min-w-60 px-4 py-3 border border-gray-400 rounded-lg cursor-pointer hover:bg-gray-600/10`,
        containerClassName
      )}
      onClick={handleDownload}
    >
      <div className="mr-3">{getFileIcon()}</div>
      <div className="text-black font-bold text-sm">{truncatedCaption}</div>
    </div>
  );
};

export default FileAttachment;
