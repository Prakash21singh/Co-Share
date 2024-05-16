import React, { useEffect, useState } from "react";
import "./style.scss";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import { NavLink } from "react-router-dom";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
const GlobalUpload = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND}/api/v1/user/getAllUploads`, {
        withCredentials: true,
      })
      .then((res) => {
        let { data: apiData } = res.data;
        setData(apiData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  console.log(data[0]);
  return (
    <>
      {data.length !== 0 ? (
        <div className="globalUpload">
          {data
            .map((data, index) => (
              //abnhpm
              <div key={index} className="upload">
                <div className="left">
                  <img src={data.createdBy?.avatar} alt="" />
                </div>
                <div className="middle">
                  <h3>#{data.title}</h3>
                  <p>Description: {data.description}</p>
                  <button
                    onClick={() => {
                      handleFileDownload(data.upload, data.filename);
                    }}>
                    Download
                  </button>
                </div>
              </div>
            ))
            .reverse()}
        </div>
      ) : (
        <div className="globalUpload">
          <SkeletonCard />
        </div>
      )}
    </>
  );
};

export default GlobalUpload;
