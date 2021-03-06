import { PageProps } from "gatsby";
import * as React from "react";
import { MainLayout } from "../components/layout";

const Error404Page: React.FC<PageProps> = () => (
  <MainLayout location={undefined}>
    <h1>You are here!</h1>
    <h2>But nothing found for you #404</h2>
  </MainLayout>
);

export default Error404Page;
