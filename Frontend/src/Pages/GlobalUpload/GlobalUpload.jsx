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

  function handleFileDownload(url) {
    console.log(url);
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
                  <img src={data.createdBy.avatar} alt="" />
                </div>
                <div className="middle">
                  <h3>#{data.title}</h3>
                  <p>Description: {data.description}</p>
                  <button onClick={() => handleFileDownload(data.upload)}>
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
