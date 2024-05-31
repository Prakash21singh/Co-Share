import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import User from "../../assets/icons/User";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Logout from "../../assets/icons/Logout";
import { LoaderContext } from "../../contexts/loaderContext";
import LoaderTwo from "../../components/LoaderTwo/LoaderTwo";
const Profile = () => {
  let { isLoading, startLoading, stopLoading } = useContext(LoaderContext);
  const navigate = useNavigate();
  let [user, setUser] = useState({});
  function clearAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie =
        name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
  }
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND}/api/v1/user/data`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }, []);

  const handleLogout = function () {
    startLoading();
    axios
      .post(
        `${import.meta.env.VITE_BACKEND}/api/v1/user/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        clearAllCookies();
        localStorage.clear();
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        stopLoading();
      });
  };
  return (
    <>
      <div className="profileContainer">
        {!user.fullname ? <LoaderTwo /> : ""}
        <div className="profileContent">
          <div className="row">
            <div className="coverImage">
              <img
                src={
                  user?.coverImg
                    ? user.coverImg
                    : "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"
                }
                alt="coverImage"
              />
            </div>
            <div className="avatar">
              <img
                src={
                  user?.avatar
                    ? user.avatar
                    : "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                alt="avatar"
              />
            </div>
          </div>
          <div className="row2">
            <div className="name">
              <h3>
                <b>Fullname:</b>
                {user?.fullname}
              </h3>
            </div>
            <div className="name">
              <h3>
                <b>Username:</b>
                {user?.username}
              </h3>
            </div>
            <div className="email">
              <h3>
                <b>Email:</b>
                {user?.email}
              </h3>
            </div>
            <div className="followers">
              <h3>
                <b>Followers:</b>
                {user?.followers?.length}&nbsp;
                <User />
              </h3>
            </div>
            <div className="followers">
              <h3>
                <b>Following:</b>
                {user?.following?.length}&nbsp;
                <User />
              </h3>
            </div>
            <div className="uploads">
              <h3>
                <b>Totol Uploads</b>:{user?.myUpload?.length} uploads
              </h3>
            </div>
            <NavLink onClick={handleLogout}>
              <div className="logout">
                <Logout />
                &nbsp; <h3>Logout</h3>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
