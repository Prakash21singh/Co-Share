import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./global.scss";
import UploadIcon from "./assets/icons/UploadIcon";
import Uploads from "./assets/icons/Uploads";
import Profile from "./assets/icons/Profile";
import Users from "./assets/icons/Users";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Logout from "./assets/icons/Logout";
import { LoaderContext } from "./contexts/loaderContext";
import Loader from "./components/Loader/Loader";
import LoaderTwo from "./components/LoaderTwo/LoaderTwo";

export default function Root() {
  // let { user } = useAuth();
  const { isLoading, startLoading, stopLoading } = useContext(LoaderContext);
  let [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND}/api/v1/user/data`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }, []);
  return (
    <>
      {isLoading && <Loader />}
      <div className="root_container">
        <div className="container_item">
          <div className="left_container">
            <NavLink
              to={"/uploads"}
              className={({ isActive }) => (isActive ? "link active" : "link")}>
              <Uploads /> &nbsp; Global Uploads
            </NavLink>
            <NavLink
              to={"/upload"}
              className={({ isActive }) => (isActive ? "link active" : "link")}>
              <UploadIcon /> &nbsp; Upload File
            </NavLink>
            <NavLink
              to={"/users"}
              className={({ isActive }) => (isActive ? "link active" : "link")}>
              <Users /> &nbsp; Users
            </NavLink>
            <NavLink
              to={"/my-upload"}
              className={({ isActive }) => (isActive ? "link active" : "link")}>
              <UploadIcon /> &nbsp; MyUploads
            </NavLink>
            <NavLink
              to={"/profile"}
              className={({ isActive }) => (isActive ? "link active" : "link")}>
              <Profile /> &nbsp; My Profile
            </NavLink>
          </div>
          <div className="middle_container">
            <Outlet />
          </div>
          <div className="right_container">
            {/* Social media handle with all the thing */}
            {!user?.avatar ? (
              <LoaderTwo />
            ) : (
              <div className="userProfile">
                <div className="coverImg">
                  <img
                    src={
                      (user && user.coverImg) ||
                      "https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    }
                    alt="Cover Image"
                    className="coverImg"
                  />
                  <img
                    src={user && user.avatar}
                    alt="Profile Img"
                    className="avatar"
                  />
                </div>
                <div className="userAbout">
                  <span>
                    <h3>{user && user.username}</h3>
                  </span>
                  <span>
                    <h4>{user && user.fullname}</h4>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      ;
    </>
  );
}
