import { graphql, PageProps } from "gatsby";
import React from "react";
import { Container, Grid } from "semantic-ui-react";
import { MainLayout } from "../components/layout";
import Source from "../components/source";

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

  return (
    <MainLayout location={location}>
      <Container>
        <Grid stackable columns={2} padded>
          <Grid.Column color={"red"} key={"red"}>
            Hello
          </Grid.Column>
          <Grid.Column color={"blue"} key={"blue"}>
            How
          </Grid.Column>
          <Grid.Column color={"olive"} key={"olive"}>
            Are
          </Grid.Column>
          <Grid.Column color={"green"} key={"green"}>
            You
          </Grid.Column>
        </Grid>
      </Container>
      <h1>{hello} TypeScript world!</h1>
      <p>
        This site is named <strong>{siteName}</strong>
      </p>
      <Source description="Interested in details of this site?" />
    </MainLayout>
  );
}

export default IndexPage;
