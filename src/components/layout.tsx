import React from "react";
import "semantic-ui-css/semantic.css";
import { Header } from "./header";
import { Footer } from "./footer";
import { colors } from "../utils/colors";
import styled from "styled-components";
import { getWeatherDataCSV, getWeatherDataJson } from "../api/weatherData";

type MainLayoutProps = {
  children: React.ReactNode;
  location: Location | undefined;
};

const LineBreak = styled.div`
  width: 100%;
  border-top-width: 2px;
  border-top-style: solid;
  border-top-color: ${colors.orange};
  transform: skew(1.5deg, -1.5deg);
`;

const MainLayout = ({ children, location }: MainLayoutProps): JSX.Element => {
  const getWeatherData = async () => {
    const weatherDataJson = getWeatherDataJson();
    const weatherDataCsv = await getWeatherDataCSV();
    console.log(weatherDataJson, weatherDataCsv);
    debugger;
  };
  getWeatherData();
  return (
    <div style={{ marginBottom: "20px" }}>
      <Header />
      <div style={{ margin: "15px 0" }}>{children}</div>
    </div>
  );
};

export { MainLayout };
