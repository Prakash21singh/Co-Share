import React, { useState } from "react";
import "./uploader.scss";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import DeleteIcon from "../../assets/icons/DeleteIcon";
const Uploader = ({ width, height, text, name }) => {
  const [image, setImage] = useState(null);
  const [fileName, setfileName] = useState("No selected file");
  return (
    <>
      <div
        onClick={() => document.querySelector(`input[name="${name}`).click()}
        className="uploadContainer"
        style={{ width: { width }, height: { height } }}>
        <input
          name={name}
          type="file"
          placeholder="Avatar"
          className="uploadField"
          hidden
          accept="image/*"
          onChange={({ target: { files } }) => {
            files[0] && setfileName(files[0].name);
            if (files) {
              setImage(URL.createObjectURL(files[0]));
            }
          }}
        />
        {image ? (
          <>
            <img src={image} />
            <span
              onClick={(e) => {
                e.stopPropagation();
                setImage(null);
              }}>
              <DeleteIcon />
            </span>
          </>
        ) : (
          <>
            <MdCloudUpload
              color="#1475cf"
              size={40}
              style={{ paddingRight: 10 }}
            />
            <p>{text || "Upload"}</p>
          </>
        )}
      </div>
    </>
  );
};

export default Uploader;
