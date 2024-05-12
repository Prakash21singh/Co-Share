import { NavLink, Outlet } from "react-router-dom";
import "./global.scss";
import Logo from "./assets/icons/Logo";
import Support from "./assets/icons/Support";
import Upload from "./assets/icons/Upload";
import Uploads from "./assets/icons/Uploads";
import Profile from "./assets/icons/Profile";
import Users from "./assets/icons/Users";
import InputField from "./components/Input/Input";
import useAuth from "./contexts/authContext";

export default function Root() {
  let { user } = useAuth();
  console.log(user, "USERDATA");
  function searchInputField() {}

  return (
    <div className="main_section">
      <div className="sidebar_navigation">
        <div className="logo">
          <NavLink to={"/"} className={"navlink"}>
            <Logo /> &nbsp;&nbsp;<h3>ShareNest</h3>
          </NavLink>
        </div>
        <div className="navigations">
          {/* Navigations on sidebar */}
          <NavLink
            to={"/uploads"}
            className={({ isActive }) => (isActive ? "link active" : "link")}>
            <Uploads />
            &nbsp;<h3>All Uploads</h3>
          </NavLink>
          <NavLink
            to={"/upload"}
            className={({ isActive }) => (isActive ? "link active" : "link")}>
            <Upload />
            &nbsp;<h3>Upload</h3>
          </NavLink>
          <NavLink
            to={"/users"}
            className={({ isActive }) => (isActive ? "link active" : "link")}>
            <Users />
            &nbsp;<h3>All Users</h3>
          </NavLink>
          <NavLink
            to={"/profile"}
            className={({ isActive }) => (isActive ? "link active" : "link")}>
            <Profile />
            &nbsp;<h3>My Profile</h3>
          </NavLink>
        </div>
        <div className="support">
          {" "}
          <NavLink to={"/support"} className="navlink">
            <Support /> &nbsp;&nbsp; Help and support
          </NavLink>
        </div>
      </div>
      <div className="content_section">
        <div className="headerSection">
          <div className="searchBar">
            <InputField
              type={"text"}
              placeholder={"Search '/'"}
              width={350}
              handleChange={searchInputField}
              backGroundColor={"#101010"}
              textColor={"#ffffff"}
              borderColor="#d400ff53"
            />
          </div>
          <div className="user">
            <img src={user?.avatar || ""} alt="Profile Pic" />
            <h3>{user?.username || "Anonymous user"}</h3>
          </div>
        </div>
        <div className="body_content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
