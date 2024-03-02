import React, { ReactNode } from "react";
import LightGallery from "lightgallery/react";
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

type Props = {
  children: ReactNode;
};

const ATMImageZoomer = ({ children }: Props) => {
  return (
    <div className="gallery">
      <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom ]}
        actualSize
      >
        {children}
      </LightGallery>
    </div>
  );
};

export default ATMImageZoomer;
