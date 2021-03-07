import "semantic-ui-css/semantic.css";
import { graphql, PageProps } from "gatsby";
import React, { useEffect, useState } from "react";
import { Container, Grid } from "semantic-ui-react";
import {
  getMergedWeatherData,
  MergedWeatherDataType,
} from "../api/weatherData";
import { MainLayout } from "../components/layout";
import { TempDashboard } from "./d3.temperature";
import { WaveHeightDashboard } from "./d3.waveHeight";
import { WindDashboard } from "./d3.windDirSpd";

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
            Wave Max Height / Significant Height
            <WaveHeightDashboard mergedWeatherData={mergedWeatherData} />
          </Grid.Column>
          <Grid.Column color={"olive"} key={"olive"}>
            Wind Direction / Wind Speed
            <WindDashboard mergedWeatherData={mergedWeatherData} />
          </Grid.Column>
          <Grid.Column color={"green"} key={"green"}>
            Wave Direction / Water Speed
          </Grid.Column>
        </Grid>
      </Container>
    </MainLayout>
  );
}

export default IndexPage;
