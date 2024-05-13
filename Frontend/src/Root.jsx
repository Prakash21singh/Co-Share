import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./global.scss";
import Logo from "./assets/icons/Logo";
import Support from "./assets/icons/Support";
import Upload from "./assets/icons/Upload";
import Uploads from "./assets/icons/Uploads";
import Profile from "./assets/icons/Profile";
import Users from "./assets/icons/Users";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Logout from "./assets/icons/Logout";

export default function Root() {
  // let { user } = useAuth();
  let [user, setUser] = useState();
  const navigate = useNavigate();
  const handleLogout = useCallback(async (e) => {
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/v1/user/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      clearAllCookies();
      localStorage.clear();
      navigate("/login");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  });
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
  return (
    <>
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
              <Upload /> &nbsp; Upload File
            </NavLink>
            <NavLink
              to={"/users"}
              className={({ isActive }) => (isActive ? "link active" : "link")}>
              <Users /> &nbsp; Users
            </NavLink>
            <NavLink
              to={"/my-upload"}
              className={({ isActive }) => (isActive ? "link active" : "link")}>
              <Upload /> &nbsp; MyUploads
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
              <NavLink to={"/"} onClick={handleLogout}>
                <Logout />
                &nbsp; <h3>Logout</h3>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
