import React from "react";
import { HeaderTitle } from "./headerTitle";
import { HeaderIconLinks } from "./headerIconLinks";

import "./header-clouds.scss";

function HeaderBanner() {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(#87cefa, rgb(208, 240, 255))",
      }}
      className={["header-banner", "clouds"].join(" ")}
    >
      <div className={["cloud", "one"].join(" ")} data-speed="35000" />
      <div
        className={["cloud", "two"].join(" ")}
        data-speed="45000"
        data-delay="15000"
      />
      <HeaderTitle />
      <div className={["cloud", "three"].join(" ")} data-speed="40000" />
      <div
        className={["cloud", "four"].join(" ")}
        data-speed="38000"
        data-delay="20000"
      />
    </div>
  );
}

export { HeaderBanner };
