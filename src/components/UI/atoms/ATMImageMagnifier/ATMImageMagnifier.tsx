import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import ReactImageMagnify from "react-image-magnify";

type Props = {
  onClose: () => void; 
  selectedImage: string;
  imagesList: string[];
};
const ATMImageMagnifier = ({
  onClose, 
  selectedImage,
  imagesList,
}: Props) => {
  const [imageSelected, setImageSelected] = useState(selectedImage);

  return (
    <>
      <Dialog open={true} maxWidth="lg" fullWidth>
        <DialogTitle>
          <div className="flex justify-between items-center text-primary-main font-bold">
            Image Magnifier
            <button onClick={onClose}>
              <MdCancel className="text-red-500 text-2xl" />
            </button>
          </div>
          <div className="flex justify-between">
            <div className="flex py-2"></div>
            <div className="flex pt-1.5 justify-end">
              <div></div>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className=" rounded ">
            <div className="w-fit m-5 border-slate-200 border-2">
              <ReactImageMagnify 
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: false,
                    src: imageSelected,
                    width: 400,
                    height: 400,
                  },
                  largeImage: {
                    src: imageSelected,
                    width: 500,
                    height: 650,
                    
                  },
                }}
              />
            </div>

              <div className="flex gap-2 border-2 w-full  m-5 items-center justify-self-center rounded ">
                {imagesList.map((image: string, index: number) => {
                  return (
                    
                      <div
                        className={`h-[120px] w-[120px]   border-2 rounded m-2 hover:scale-105 cursor-pointer ${
                          imageSelected === image && "border-red-300 scale-105"
                        }`}
                      >
                        <img
                          src={image}
                          alt=""
                          className="w-full h-full"
                          onClick={() => setImageSelected(image)}
                        />
                      </div>
                    
                  );
                })}
              </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ATMImageMagnifier;
