import React, { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import InputField from "../../components/Input/Input";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { LoaderContext } from "../../contexts/loaderContext";
import useAuth from "../../contexts/authContext";
const Login = () => {
  const { isLoading, startLoading, stopLoading } = useContext(LoaderContext);
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function handleLogin() {
    startLoading();
    if (!email) {
      alert("Email is required");
    }
    if (!password) {
      alert("Password is required");
    }
    let formData = new FormData();
    formData.append("identification", identity);
    formData.append("password", password);

    axios
      .post(`${import.meta.env.VITE_BACKEND}/api/v1/user/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        let { accessToken, loggedInUser, refreshToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userData", JSON.stringify(loggedInUser));
        setError("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError(error.response?.data.message);
      })
      .finally(() => {
        stopLoading();
      });
  }
  return (
    <>
      {isLoading && <Loader />}

      <div className="login_Container">
        <div className="left_content">
          <div className="inner_content">
            <div className="back_button"></div>
            <br />
            <div className="content">
              <h2>Co-Share Login</h2>
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
                handleChange={(e) => {
                  setIdentity(e.target.value);
                }}
                value={identity}
                width={"100%"}
                id={"email"}
                placeholder={"Email or username"}
                type={"text"}
                key={"email"}
                margin="10px"
              />
              <InputField
                value={password}
                handleChange={(e) => {
                  setPassword(e.target.value);
                }}
                width={"100%"}
                id={"password"}
                placeholder={"Password"}
                type={"password"}
                key={"password"}
                margin="0px 0px 10px 0px"
              />
              {error ? (
                <div className="errorMsg">{error ? `Error:${error}` : ""}</div>
              ) : (
                ""
              )}
              <Button
                text={"Log In"}
                width={"100%"}
                key={"Login"}
                handleClick={handleLogin}
              />
              <br />
              <div className="login_message">
                <p>
                  Doesn't have an account?.. <Link to="/register">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
