import { Outlet } from "react-router-dom";
import { AuthContext } from "./contexts/authContext";
import { useContext } from "react";
export default function Root() {
  let { isLoggedIn, username } = useContext(AuthContext);
  return (
    <div className="main_section">
      <div className="sidebar_navigation">this is sidebar</div>
      <div className="content_section">
        HEADER
        <div className="body_content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
