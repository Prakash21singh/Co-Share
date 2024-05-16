import React, { useEffect, useState } from "react";
import "./style.scss";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import { NavLink } from "react-router-dom";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
import DownloadIcon from "../../assets/icons/DownloadIcon";
const GlobalUpload = () => {
  const [data, setData] = useState([]);
  const [profileClickId, setProfileClickId] = useState(false);
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

  function handleProfileClick(id) {
    setProfileClickId(id);
  }
  return (
    <>
      {data.length !== 0 ? (
        <div className="globalUpload">
          {data
            .map((data, index) => (
              //abnhpm
              <div
                key={index}
                className="upload"
                onMouseLeave={() => {
                  handleProfileClick();
                }}>
                <div className="left">
                  <div
                    className={
                      data._id === profileClickId
                        ? "profileCard hoverCard"
                        : "profileCard"
                    }>
                    <NavLink to={`/profile/${data._id}`}>Go to Profile</NavLink>
                  </div>
                  <img
                    src={data.createdBy?.avatar}
                    alt=""
                    onClick={(e) => {
                      handleProfileClick(data._id);
                    }}
                  />
                </div>
                <div className="middle">
                  <h3 className="title">{data.title}</h3>
                  <p>Description: {data.description}</p>
                  <div className="timing">
                    <button
                      role="button"
                      onClick={() => {
                        handleFileDownload(data.upload, data.filename);
                      }}>
                      <DownloadIcon />
                    </button>
                    Posted at:
                    {`${new Date(data.createdAt).getDate()}/${new Date(
                      data.createdAt
                    ).getMonth()}/${new Date(
                      data.createdAt
                    ).getFullYear()} - ${new Date(
                      data.createdAt
                    ).getHours()}:${new Date(data.createdAt).getMinutes()}hr`}
                  </div>
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
