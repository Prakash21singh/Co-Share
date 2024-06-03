import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import { AuthContext } from "../../contexts/authContext";
import LoaderTwo from "../../components/LoaderTwo/LoaderTwo";
const AllUser = () => {
  const [users, setUsers] = useState([]);
  let { user: loggedInUser } = useContext(AuthContext);
  let [profileClick, setProfileClick] = useState("");
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND}/api/v1/user/getusers`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleFollowUser(id) {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND}/api/v1/user/follow`,
        { id },
        { withCredentials: true }
      )
      .then((res) => {
        setUsers((prevData) =>
          prevData.map((user) =>
            user?._id === id
              ? { ...user, followers: [...user.followers, loggedInUser._id] }
              : user
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUnfollowUser(id) {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND}/api/v1/user/unfollow`,
        { id },
        { withCredentials: true }
      )
      .then((res) => {
        setUsers((prevData) =>
          prevData.map((user) =>
            user?._id === id
              ? {
                  ...user,
                  followers: user.followers.filter(
                    (follower) => follower !== loggedInUser._id
                  ),
                }
              : user
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="allUserContainer">
      {users ? (
        users.map((user, index) => (
          <div
            className="user"
            key={index}
            onMouseLeave={() => {
              setProfileClick("");
            }}>
            <div className="upper">
              <img
                src={user.avatar}
                alt="img"
                onClick={() => {
                  setProfileClick(user._id);
                }}
              />
              <div
                className={`profileCard ${
                  profileClick === user._id
                    ? "profileCard hoverCard"
                    : "profileCard"
                }`}>
                {loggedInUser._id !== user._id ? (
                  <div>
                    {user.followers?.includes(loggedInUser._id) ? (
                      <button
                        onClick={() => {
                          handleUnfollowUser(user?._id);
                        }}>
                        Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleFollowUser(user?._id);
                        }}>
                        Follow
                      </button>
                    )}
                    <button>Approach</button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="middle">
              <h4>{user.username}</h4>
              <div className="bottom">
                <p>Followers:&nbsp;{user.followers?.length}</p>
                <p>Following:&nbsp;{user.following?.length}</p>
                <p>Posts:&nbsp;{user?.myUpload?.length}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <LoaderTwo />
      )}
    </div>
  );
};

export default AllUser;
