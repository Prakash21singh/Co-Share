import React, { useEffect, useState } from "react";
import "./style.scss";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
const MyUpload = () => {
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND}/api/v1/user/my-uploads`, {
        withCredentials: true,
      })
      .then((res) => {
        let { data: MyUploads } = res.data;
        setUploads(MyUploads);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="myUploadContainer">
        {uploads && uploads.length > 0 ? (
          uploads.map((upload, index) => (
            <div className="upload" key={Date.now()}>
              <div className="top">
                <div className="title">{upload.title}</div>
                <div className="description">{upload.description}</div>
                <div className="fileName">
                  <b>Filename:</b>
                  {upload.filename}
                </div>
              </div>
              <div className="bottom">
                <button>Download</button>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div>You dont have any uploads yet</div>
        )}
      </div>
    </>
  );
};

export default MyUpload;
