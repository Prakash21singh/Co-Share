import React from "react";
import Button from "../../components/Button/Button";
import InputField from "../../components/Input/Input";
import "./style.scss";
import Uploader from "../../components/Uploader/Uploader";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <>
      <div className="register_Container">
        <div className="left_content">
          <div className="inner_content">
            <div className="back_button">
              <Button
                text={"◀ Go Back"}
                key={"back"}
                width={100}
                borderRadius={3}
                fontSize="14px"
              />
            </div>
            <br />
            <div className="content">
              <h2>Co-Share</h2>
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
              <h1>Co-Share Register</h1>
              <InputField
                width={"100%"}
                id={"fullname"}
                placeholder={"Fullname"}
                type={"text"}
                key={"fullname"}
                margin="10px"
              />
              <InputField
                width={"100%"}
                id={"username"}
                placeholder={"Username"}
                type={"text"}
                key={"username"}
                margin="10px"
              />
              <InputField
                width={"100%"}
                id={"Email"}
                placeholder={"Email"}
                type={"email"}
                key={"Email"}
                margin="0px 0px 10px 0px"
              />
              <InputField
                width={"100%"}
                id={"password"}
                placeholder={"Password"}
                type={"password"}
                key={"password"}
                margin="0px 0px 10px 0px"
              />
              <div className="uploader">
                <Uploader name={"Avatar"} text={"Upload Avatar"} width={49} />
                <Uploader
                  name={"CoverImg"}
                  text={"Upload CoverImg"}
                  width={49}
                />
              </div>
              <br />
              <Button text={"Register"} width={"100%"} key={"register"} />
              <br />
              <div className="register_message">
                <p>
                  Already have an account?.. <Link to="/login">Log In Now</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="display_panel"></div>
      </div>
    </>
  );
};

export default Register;
