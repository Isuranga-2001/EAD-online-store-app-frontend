import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import TextBox from "./TextBox";

export interface TableColumn<T> {
  header: string;
  accessor: keyof T;
  isButton?: boolean;
  buttonCaption?: string;
  onClick?: (row: T) => void;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  width?: string;
  height?: string;
  headerBgColor?: string;
  headerTextColor?: string;
  headerTextAlign?: string;
  showPagination?: boolean;
}

export const Table = <T,>({
  columns,
  data,
  currentPage,
  totalPages,
  onPageChange,
  width = "w-full",
  height = "h-auto",
  headerBgColor = "bg-green",
  headerTextColor = "text-white",
  headerTextAlign = "text-center",
  showPagination = true,
}: TableProps<T>) => {
  const [jumpPage, setJumpPage] = useState(currentPage.toString());

  useEffect(() => {
    setJumpPage(currentPage.toString());
  }, [currentPage]);

  const handleJumpToPage = () => {
    let pageNumber = parseInt(jumpPage, 10);
    if (!isNaN(pageNumber)) {
      if (pageNumber < 1) {
        pageNumber = 1;
      } else if (pageNumber > totalPages) {
        pageNumber = totalPages;
      }
      onPageChange(pageNumber);
    }
  };

  return (
    <div className={` min-w-60 ${width} ${height} overflow-hidden`}>
      <div className="overflow-x-auto h-full">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={classNames(
                    "py-3 px-4 border-b text-sm font-semibold",
                    headerBgColor,
                    headerTextColor,
                    headerTextAlign,
                    {
                      "rounded-l-md": index === 0,
                      "rounded-r-md": index === columns.length - 1,
                    }
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-2 px-4 border-b border-gray-200 text-sm text-gray-700 text-center`}
                  >
                    {column.isButton ? (
                      <button
                        onClick={() => column.onClick && column.onClick(row)}
                        className="px-3 py-1 rounded-full text-light-green hover:text-white bg-transparent hover:bg-green text-center transition-all ease-in-out duration-200"
                      >
                        {column.buttonCaption}
                      </button>
                    ) : (
                      String(row[column.accessor])
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPagination && (
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-700">
            Showing page {currentPage} of {totalPages} pages
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-900 hover:text-gray-100 transition-all ease-in-out duration-300"
            >
              <FaAngleLeft />
            </button>
            <TextBox
              value={jumpPage}
              placeholder="Jump to page"
              onChange={setJumpPage}
              width="w-16"
              inputClassName="text-center"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleJumpToPage();
                }
              }}
            />
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-900 hover:text-gray-100 transition-all ease-in-out duration-300"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
