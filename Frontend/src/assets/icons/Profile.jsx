import React from "react";

const Profile = () => {
  return (
    <>
      <svg
        width="25"
        height="25"
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_656_41795)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17 10C17 6.68629 19.6863 4 23 4C26.3137 4 29 6.68629 29 10C29 13.3137 26.3137 16 23 16C19.6863 16 17 13.3137 17 10ZM23 0C17.4772 0 13 4.47715 13 10C13 15.5228 17.4772 20 23 20C28.5228 20 33 15.5228 33 10C33 4.47715 28.5228 0 23 0ZM15 22C12.1216 22 9.3904 22.8771 7.34385 24.6095C5.26556 26.3688 4 28.9275 4 32V35C4 36.6569 5.34315 38 7 38H39C40.6569 38 42 36.6569 42 35V32C42 28.9275 40.7344 26.3688 38.6562 24.6095C36.6096 22.8771 33.8784 22 31 22H15ZM8 32C8 30.102 8.74916 28.6606 9.92823 27.6625C11.139 26.6376 12.9079 26 15 26H31C33.0921 26 34.861 26.6376 36.0718 27.6625C37.2508 28.6606 38 30.102 38 32V34H8V32Z"
            fill="#8D1BF7"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_656_41795"
            x="0"
            y="0"
            width="46"
            height="46"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_656_41795"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_656_41795"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default Profile;
