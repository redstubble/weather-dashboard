import React, { useState } from "react";
import { NavItemsPresenter } from "./navItems-presenter";
import { colors } from "../../../utils/colors";
import { PageTypes } from "../../../utils/pageType";

type PageLayout = {
  title: string;
  color: string;
  pageType: typeof PageTypes[keyof typeof PageTypes];
};

export type PageStructure = PageLayout[];

type PagesState = {
  index: PageStructure;
  post: {
    Post: PageLayout;
  };
};

const getPages = (): PageStructure => [
  {
    title: "Projects",
    color: colors.red,
    pageType: PageTypes.projects,
  },
  {
    title: "Experience",
    color: colors.blue,
    pageType: PageTypes.experiences,
  },
  {
    title: "Resume",
    color: colors.orange,
    pageType: PageTypes.resume,
  },
];

function NavItemsCont() {
  return <NavItemsPresenter items={getPages()} />;
}

export { NavItemsCont };
