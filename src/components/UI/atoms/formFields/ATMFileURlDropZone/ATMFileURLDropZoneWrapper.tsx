import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import CircularProgress  from "@mui/material/CircularProgress";
import {
  useUpdateFileUploadImageMutation,
  useUpdateFileUploadPdfMutation,
} from "src/services/FileUploadService";

type Props = {
  label?: string;
  required?: boolean;
  placeholder?: string;
  onSelect: (file: File | string | null) => void;
  selectedFile: any;
  disabled?: boolean;
  onRemove: () => void;
};

const ATMFileURLDropZoneWrapper = ({
  label = "",
  required = false,
  placeholder = "Select Image",
  onSelect,
  selectedFile,
  disabled = false,
  onRemove,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [updateFileUploadImage] = useUpdateFileUploadImageMutation();
  const [updateFileUploadPdf] = useUpdateFileUploadPdfMutation();

  const handleUpload = (value: File) => {
    let formData = new FormData();
    formData.append("fileType", "image-upload");
    formData.append(value?.type.includes("pdf")  ? "file": "image",value ) ;
    value?.type.includes("image")
    ?
    updateFileUploadImage(formData).then((res: any) => {
      if (res.error) {
        setIsUploading(false);
      } else {
        if (res?.data?.status) {
          onSelect(res?.data?.data?.image);
          setIsUploading(false);
        } else {
          setIsUploading(false);
        }
      }
    }):
    updateFileUploadPdf(formData).then((res: any) => {
      if (res.error) {
        setIsUploading(false);
      } else {
        if (res?.data?.status) {
          onSelect(res?.data?.data?.image);
          setIsUploading(false);
        } else {
          setIsUploading(false);
        }
      }
    })

  }
  return (
    <div className="w-full ">
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
        className={`flex items-center p-[1px]  border-[1.5px] border-slate-400 rounded bg-white border-dashed w-full h-[150px]   ${
          label && "mt-1"
        } text-slate-400`}
      >
        {selectedFile ? (
          <div className="w-full h-full border rounded shadow relative">
            <img
              src={
                typeof selectedFile === "string"
                  ? selectedFile
                  : URL.createObjectURL(selectedFile)
              }
              alt=""
              className="w-full h-full rounded"
            />

            {isUploading ? (
              <>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full h-full absolute top-0 left-0 opacity-50 bg-slate-300"
                ></div>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute -top-2 -right-2 bg-stone-200 rounded-full h-[20px] w-[20px]"
                >
                  <CircularProgress size={20} />
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="absolute -top-2 -right-2 h-[20px] w-[20px] rounded-full bg-slate-700 border-[1px] border-white  flex justify-center items-center text-white text-xl "
              >
                <IoClose />
              </button>
            )}
          </div>
        ) : (
          <div className="text-center w-full"> Select Image </div>
        )}
      </button>

      {/* Input Type File - Hidden */}
      <input
        type="file"
        ref={inputRef}
        onChange={(e: any) => {
          setIsUploading(true);
          onSelect(e.target.files[0]);
          handleUpload(e.target.files[0]);
        }}
        value={""}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
};

export default ATMFileURLDropZoneWrapper;
