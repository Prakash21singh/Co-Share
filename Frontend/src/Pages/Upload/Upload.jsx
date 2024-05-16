import { useContext, useState } from "react";
import InputField from "../../components/Input/Input";
import { FileUploader } from "react-drag-drop-files";
import "./style.scss";
import UploadFileIcon from "../../assets/icons/UploadFileIcon";
import UploadIcon from "../../assets/icons/UploadIcon";
import TickIcon from "../../assets/icons/TickIcon";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import { LoaderContext } from "../../contexts/loaderContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const fileTypes = ["DOCX", "DOC", "PDF", "PNG", "JPEG", "JPG"];
const Upload = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  let [error, setError] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  function handleFileSelect(e) {
    console.log(e);
    setFile(e);
  }
  function handleUploadFile() {
    setError("");
    if (!title) {
      setError("");
      setError("Title is required");
      return;
    }
    if (!description) {
      setError("");
      setError("Description is required");
      return;
    }
    if (!file) {
      setError("");
      setError("File is Required");
      return;
    }
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("Upload", file);
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND}/api/v1/user/upload`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/uploads");
      })
      .catch((error) => {
        console.log(error);
        setError(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="upload_container">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="upload_form">
            <InputField
              handleChange={(e) => {
                setError("");
                setTitle(e.target.value);
              }}
              placeholder={"Title"}
              backGroundColor="#131313"
              padding="15px"
              textColor="#f2f2f2"
              margin="10px 0px"
            />
            <InputField
              handleChange={(e) => {
                setError("");
                setDescription(e.target.value);
              }}
              placeholder={"Description"}
              backGroundColor="#131313"
              padding="15px"
              textColor="#f2f2f2"
              margin="10px 0px"
            />
            <div className="drag_drop_section">
              <div>
                <FileUploader
                  handleChange={(e) => {
                    setError("");
                    handleFileSelect(e);
                  }}
                  name="file"
                  types={fileTypes}
                  label="Drag and drop or browse"
                  children={
                    <div className="drag_drop">
                      <div className="inner_drag_drop">
                        <UploadIcon />
                        <p>
                          <a href="#">Click to upload</a>or drag and drop
                        </p>
                        <span>PDF , DOCX , JPEG ,JPG (max. 3MB)</span>
                      </div>
                    </div>
                  }
                />
              </div>
              {file && (
                <div className="selected_file">
                  <div className="selected_file_left">
                    <UploadFileIcon />
                    <div className="selected_file_left_content">
                      <p>{file.name}</p>
                      <span>
                        {(file.size / 1024 / 1024).toFixed(2)}Mb • Complete
                      </span>
                    </div>
                  </div>
                  <div className="selected_file_right">
                    <button onClick={() => setFile(null)}>
                      <DeleteIcon />
                    </button>
                    <TickIcon />
                  </div>
                </div>
              )}
            </div>
            {error ? <div className="errorMsg">Error:{error}</div> : ""}

            <Button
              width={"100%"}
              text={"Upload Now"}
              handleClick={handleUploadFile}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Upload;
