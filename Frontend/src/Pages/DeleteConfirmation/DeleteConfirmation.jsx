import React from "react";
import "./style.scss";
import Confirmation from "../../assets/icons/Confirmation";
import { Link } from "react-router-dom";

const DeleteConfirmation = () => {
  return (
    <>
      <div className="deleteConfirmation">
        <Confirmation />
        <h3>Upload has been deleted successfully</h3>
        <div className="button">
          <Link to={"/upload"}>
            <button className="one btn">Create Upload</button>
          </Link>
          <Link to={"/my-upload"}>
            <button className="two btn">View MyUploads</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmation;
