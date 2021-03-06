import React from "react";
import { HeaderBanner } from "./header/header-banner";
import { HeaderFade } from "./header/headerFade";
import "./header/header-clouds.scss";

function Header(): JSX.Element {
  return (
    <div>
      <HeaderBanner />
      <HeaderFade />
    </div>
  );
}

export { Header };
