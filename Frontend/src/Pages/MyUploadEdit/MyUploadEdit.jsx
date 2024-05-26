import { useContext, useEffect, useState } from "react";
import InputField from "../../components/Input/Input";
import { FileUploader } from "react-drag-drop-files";
import "./style.scss";
import UploadFileIcon from "../../assets/icons/UploadFileIcon";
import UploadIcon from "../../assets/icons/UploadIcon";
import TickIcon from "../../assets/icons/TickIcon";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const fileTypes = ["DOCX", "DOC", "PDF", "PNG", "JPEG", "JPG"];
const MyUploadEdit = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState({});
  let [error, setError] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let { uploadId } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND}/api/v1/user/upload/${uploadId}`, {
        withCredentials: true,
      })
      .then((res) => {
        let { data } = res.data;
        setTitle(data.title);
        setDescription(data.description);
        setUploadedFile({
          filename: data.filename,
          url: data.upload,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  function handleFileSelect(e) {
    console.log(e);
    setFile(e);
  }
  function handleUploadFile() {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("NewUpload", file || "");
    setIsLoading(true);
    console.log(file);
    axios
      .patch(
        `${import.meta.env.VITE_BACKEND}/api/v1/user/upload/${uploadId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate(`/my-upload`);
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
              value={title && title}
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
              value={description}
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
              {(file && (
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
              )) || (
                <div className="selected_file">
                  <div className="selected_file_left">
                    <UploadFileIcon />
                    <div className="selected_file_left_content">
                      <p style={{ marginRight: 3 }}>{uploadedFile.filename}</p>
                      <span></span>
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
              text={"Edit Now"}
              handleClick={handleUploadFile}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MyUploadEdit;
