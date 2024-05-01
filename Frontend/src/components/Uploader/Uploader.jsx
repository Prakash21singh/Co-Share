import React, { useState } from "react";
import "./uploader.scss";
import { MdCloudUpload } from "react-icons/md";
import DeleteIcon from "../../assets/icons/DeleteIcon";

const Uploader = ({ width, height, text, name, onFileSelect }) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");

  const handleFileChange = (event) => {
    const {
      target: { files },
    } = event;

    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0]));
      setFileName(files[0].name);
      onFileSelect(files[0]);
    } else {
      setImage(null);
      setFileName("No selected file");
    }
  };

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
          onChange={handleFileChange}
        />
        {image ? (
          <>
            <img src={image} />
            <span
              onClick={(e) => {
                e.stopPropagation();
                setImage(null);
                setFileName("No selected file");
                // Optionally, trigger onFileSelect with null to indicate removal
                onFileSelect(null);
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
