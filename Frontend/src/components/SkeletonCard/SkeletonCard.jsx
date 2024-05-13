import React from "react";
import "./style.scss";
const SkeletonCard = () => {
  return (
    <>
      <div className="skeletonCard">
        <div class="container">
          <div class="post">
            <div class="avatar"></div>
            <div className="second">
              <div class="line"></div>
              <div class="line"></div>
            </div>
          </div>

          <div class="post">
            <div class="avatar"></div>
            <div className="second">
              <div class="line"></div>
              <div class="line"></div>
            </div>
          </div>

          <div class="post">
            <div class="avatar"></div>
            <div className="second">
              <div class="line"></div>
              <div class="line"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonCard;
