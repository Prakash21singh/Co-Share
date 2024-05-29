import React, { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import InputField from "../../components/Input/Input";
import "./style.scss";
import Uploader from "../../components/Uploader/Uploader";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { LoaderContext } from "../../contexts/loaderContext";

const Register = () => {
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useContext(LoaderContext);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImg, setCoverImg] = useState();
  const [error, setError] = useState("");
  function handleAvatar(selectedFile) {
    selectedFile ? setAvatar(selectedFile) : "";
  }
  function handleCoverImage(selectedFile) {
    selectedFile ? setCoverImg(selectedFile) : "";
  }

  async function handleRegister() {
    if (!fullname) {
      alert("Fullname cannnot be empty");
    }

    if (!username) {
      alert("Username cannot be empty");
    }

    if (!email) {
      alert("Email cannot be empty");
    }

    if (!password) {
      alert("Password cannot be empty");
    }

    if (!avatar) {
      alert("Avatar cannot be empty");
    }
    let formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("coverImg", coverImg ? coverImg : "");
    startLoading();
    axios
      .post(`${import.meta.env.VITE_BACKEND}/api/v1/user/signup`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response?.data?.message);
      })
      .finally(() => {
        stopLoading();
      });
  }

  function handleFullname(e) {
    setFullname(e.target.value);
  }
  function handleUsername(e) {
    setUsername(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="register_Container">
        <div className="left_content">
          <div className="inner_content">
            <div className="back_button"></div>
            <br />
            <div className="content">
              <h2>Co-Share Sign Up</h2>
              <br />
              <p>Welcome to Co-share</p>
              <p>
                <b>Co-share</b> is a collaborative sharing platform designed to
                connect users worldwide through the exchange of files, ideas,
                and expertise. Whether you're a creative professional, a
                student, or an enthusiast, our platform provides a space where
                you can easily upload, share, and discover content from
                like-minded individuals.
              </p>
            </div>
          </div>
        </div>
        <div className="right_content">
          <div className="inner_content">
            <div className="input_Fields">
              <InputField
                value={fullname}
                width={"100%"}
                id={"fullname"}
                placeholder={"Fullname"}
                type={"text"}
                key={"fullname"}
                handleChange={handleFullname}
              />
              <InputField
                value={username}
                width={"100%"}
                id={"username"}
                placeholder={"Username"}
                type={"text"}
                key={"username"}
                margin="10px"
                handleChange={handleUsername}
              />
              <InputField
                value={email}
                width={"100%"}
                id={"Email"}
                placeholder={"Email"}
                type={"email"}
                key={"Email"}
                margin="0px 0px 10px 0px"
                handleChange={handleEmail}
              />
              <InputField
                value={password}
                width={"100%"}
                id={"password"}
                placeholder={"Password"}
                type={"password"}
                key={"password"}
                margin="0px 0px 10px 0px"
                handleChange={handlePassword}
              />
              <div className="uploader">
                <Uploader
                  name={"Avatar"}
                  text={"Upload Avatar"}
                  width={49}
                  onFileSelect={handleAvatar}
                />
                <Uploader
                  name={"CoverImg"}
                  text={"Upload CoverImg"}
                  width={49}
                  onFileSelect={handleCoverImage}
                />
              </div>
              {error ? (
                <div className="errorMsg">{error ? `Error:${error}` : ""}</div>
              ) : (
                ""
              )}
              <br />
              <Button
                text={"Sign Up"}
                width={"100%"}
                key={"register"}
                handleClick={handleRegister}
              />
              <br />
              <div className="register_message">
                <p>
                  Already have an account?.. <Link to="/login">Log In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
