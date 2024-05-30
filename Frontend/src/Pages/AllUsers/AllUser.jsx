import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
const AllUser = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND}/api/v1/user/getusers`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        let data = res.data;
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="allUserContainer">
      {users.map((user) => (
        <div className="user" key={user._id}>
          <div className="upper">
            <img src={user.avatar} alt="img" />
          </div>
          <div className="middle">
            <h4>{user.username}</h4>
            <h5>{user.email}</h5>
          </div>
          <div className="bottom">
            <div className="btm">
              <p>Followers:{user.followers?.length}</p>
            </div>
            <div className="btm">
              <p>Following:{user.following?.length}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUser;
