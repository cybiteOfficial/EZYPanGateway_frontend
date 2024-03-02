import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { getInputHeight, Size } from "src/utils/formUtils/getInputHeight";

type Props = {
  size?: Size;
  label?: string;
  required?: boolean;
  placeholder?: string;
  onSelect: (file: File | null) => void;
  selectedFile: any;
  accept: string;
  disabled?: boolean;
  hideCloseButton?: boolean;
};

const ATMFileUploader = ({
  size = "small",
  label = "",
  required = false,
  placeholder = "Select Image",
  onSelect,
  selectedFile,
  accept,
  disabled = false,
  hideCloseButton = false,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<undefined | "">(undefined);

  return (
    <div className="w-full">
      {label && (
        <label className=" font-medium text-primary-main text-sm">
          {label} {required && <span className="text-red-500"> * </span>}
        </label>
      )}
      <button
        type="button"
        onClick={() => {
          inputRef?.current?.click();
        }}
        className={`flex items-center px-2 w-full border border-slate-400 rounded bg-white  ${getInputHeight(
          size
        )} ${label && "mt-1"} text-slate-400`}
      >
        {/* {selectedFile ? ( */}
        <div className=" py-2 text-slate-900 font-medium flex gap-2 items-center w-full ">
          <div className="text-sm border border-slate-500  font-normal bg-slate-100 px-3 py-1 rounded min-w-[100px]">
            Choose File
          </div>
          <div className=" text-[12px]  grow">{selectedFile?.name || ""}</div>
        </div>
      </button>

      {selectedFile && (
        <div className="w-full h-[200px] mt-4 border rounded shadow relative">
          {selectedFile?.type?.includes("pdf") ? (
            <iframe
              title="Pdf"
              src={
                typeof selectedFile === "string"
                  ? selectedFile
                  : URL.createObjectURL(selectedFile)
              }
              className="w-full h-full rounded"
            />
          ) : (
            <>
              <img
                src={
                  typeof selectedFile === "string"
                    ? selectedFile
                    : URL.createObjectURL(selectedFile)
                }
                alt=""
                className="w-full h-full rounded"
              />
            </>
          )}

          {!hideCloseButton && (
            <button
              onClick={() => {
                onSelect(null);
                setValue((prev) => (prev === undefined ? "" : undefined));
              }}
              type="button"
              className="absolute -top-3 -right-3 h-7 w-7 rounded-full bg-red-400 hover:bg-stone-200 text-white  flex justify-center items-center hover:text-slate-500 text-xl "
            >
              <IoClose />
            </button>
          )}
        </div>
      )}

      {/* Input Type File - Hidden */}
      <input
        type="file"
        ref={inputRef}
        onChange={(e: any) => {
          // setValue((prev) => (prev === undefined ? "" : undefined));
          onSelect(e.target.files[0]);
        }}
        value={value}
        className="hidden"
        accept={accept}
        disabled={disabled}
      />
    </div>
  );
};

export default ATMFileUploader;
