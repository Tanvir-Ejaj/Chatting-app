import React, { useState } from "react";
import "./style.css";
import { IoIosImages } from "react-icons/io";
import { useRef } from "react";
import ImageCropper from "./ImageCropper";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../Features/Slice/UserSlice";

const UploadProfile = ({ setOpen }) => {
  const auth = getAuth();
  const chooseFile = useRef(null);
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const storage = getStorage();
  const dispatch = useDispatch();
  const user = useSelector((user) => user.loginSlice.login);
  const storageRef = ref(storage, user.uid);

  const handleUploadProfile = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            setOpen(false);
            dispatch(LoginUser({ ...user, photoURL: downloadURL }));
            localStorage.setItem(
              "users",
              JSON.stringify({ ...user, photoURL: downloadURL })
            );
          });
        });
      });
    }
  };

  return (
    <>
      <div className="upload-box">
        <input
          type="file"
          hidden
          ref={chooseFile}
          onChange={handleUploadProfile}
        />
        <div
          className="upload-inner"
          onClick={() => chooseFile.current.click()}
        >
          <div className="upload-icon">
            <IoIosImages />
          </div>
          <h6>Upload Photo</h6>
        </div>
        {image && (
          <ImageCropper
            image={image}
            setCropper={setCropper}
            setImage={setImage}
            cropData={cropData}
            getCropData={getCropData}
          />
        )}
      </div>
    </>
  );
};

export default UploadProfile;
