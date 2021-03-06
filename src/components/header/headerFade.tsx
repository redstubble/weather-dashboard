import React from "react";

const NoDecorationLink = {
  textDecoration: "none",
  color: "inherit",
};

const HeaderFade = () => (
  <div
    style={{
      backgroundImage: "linear-gradient(rgb(208, 240, 255), #fff)",
      // maxHeight: '80px',
    }}
  ></div>
);

export { HeaderFade };
