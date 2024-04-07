import { Outlet } from "react-router-dom";

export default function Root() {
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
