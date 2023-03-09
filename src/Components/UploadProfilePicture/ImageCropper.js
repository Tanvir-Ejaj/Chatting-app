import React from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { AiOutlineClose } from "react-icons/ai";
import Button from "@mui/material/Button";

const ImageCropper = ({
  image,
  setCropper,
  cropData,
  setImage,
  getCropData,
}) => {
  return (
    <>
      <div className="cropimage-box">
        <div className="upload-header">
          <h4>Upload Profile Picture</h4>
          <div className="close" onClick={() => setImage()}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="preview-image">
          <div className="img-preview" />
        </div>
        <div className="image-cropper">
          <Cropper
            style={{ height: 400, width: "100%" }}
            zoomTo={0}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
        </div>
        <div className="upload-btn" onClick={getCropData}>
          <Button variant="contained">Upload Now</Button>
        </div>
      </div>
    </>
  );
};

export default ImageCropper;
