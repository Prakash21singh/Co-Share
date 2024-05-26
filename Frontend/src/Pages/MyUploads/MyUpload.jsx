import React, { memo, useEffect, useState } from "react";
import "./style.scss";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const MyUpload = memo(() => {
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
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

  function handleFileDeletion(id) {
    setIsLoading(true);
    axios
      .delete(`${import.meta.env.VITE_BACKEND}/api/v1/user/upload/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        let { data } = res.data;
        console.log(data);
        navigate("delete/confirmation");
        setUploads((uploads) =>
          uploads.filter((upload) => upload.id !== data._id)
        );
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function handleFileDownload(upload, filename) {
    let uploadType = upload.split(".").at(-1);
    if (uploadType === "pdf" || uploadType === "docx") {
      const link = document.createElement("a");
      link.href = upload;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    if (uploadType === "jpeg" || uploadType === "png" || uploadType === "jpg") {
      const response = await fetch(upload);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  }

  return (
    <>
      <div className="myUploadContainer">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="uploadContainerScroll">
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
                    <button
                      onClick={() => {
                        handleFileDownload(upload.upload, upload.filename);
                      }}>
                      Download
                    </button>
                    <Link to={`edit/${upload._id}`}>
                      <button>Edit</button>
                    </Link>
                    <button
                      onClick={() => {
                        handleFileDeletion(upload._id);
                      }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>You dont have any uploads yet</div>
            )}
          </div>
        )}
      </div>
    </>
  );
});

export default MyUpload;
