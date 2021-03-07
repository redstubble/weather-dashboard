import "semantic-ui-css/semantic.css";
import { graphql, PageProps } from "gatsby";
import React, { useEffect, useState } from "react";
import { Container, Grid } from "semantic-ui-react";
import {
  getMergedWeatherData,
  MergedWeatherDataType,
} from "../api/weatherData";
import { MainLayout } from "../components/layout";
import { TempDashboard } from "./d3.airDashboard";
import { WaveDashboard } from "./d3.waveDashboard";
import { WindDashboard } from "./d3.windDashboard";
import { WaterDashboard } from "./d3.waterDashboard";

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps extends PageProps {
  data: {
    site: {
      siteMetadata: {
        siteName: string;
      };
    };
  };
  location: Location;
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteName
      }
    }
  }
`;

function IndexPage({ location, data }: IndexPageProps): JSX.Element {
  const hello = "Hello";
  const { siteName } = data.site.siteMetadata;

  const [mergedWeatherData, setMergedWeatherData] = useState<
    MergedWeatherDataType[]
  >();

  useEffect(() => {
    const getWeatherData = async () => {
      const weatherDataJson = await getMergedWeatherData();
      console.log(weatherDataJson);
      setMergedWeatherData(weatherDataJson);
    };
    getWeatherData();
  }, []);

  return (
    <MainLayout location={location}>
      <Container>
        <Grid stackable columns={2} padded>
          <Grid.Column color={"red"} key={"red"}>
            <TempDashboard mergedWeatherData={mergedWeatherData} />
          </Grid.Column>
          <Grid.Column color={"blue"} key={"blue"}>
            <WaveDashboard mergedWeatherData={mergedWeatherData} />
          </Grid.Column>
          <Grid.Column color={"olive"} key={"olive"}>
            <WindDashboard mergedWeatherData={mergedWeatherData} />
          </Grid.Column>
          <Grid.Column color={"green"} key={"green"}>
            <WaterDashboard mergedWeatherData={mergedWeatherData} />
          </Grid.Column>
        </Grid>
      </Container>
    </MainLayout>
  );
}

export default IndexPage;
