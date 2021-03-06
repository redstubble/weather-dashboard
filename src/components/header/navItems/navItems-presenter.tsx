import React, { Component } from "react";
import { Container, Grid } from "semantic-ui-react";
import { NavItem } from "./navItems";
import { colors } from "../../../utils/colors";
import { PageTypes } from "../../../utils/pageType";
import { PageStructure } from "./navItems-container";

type NavItemsPresProps = {
  items: PageStructure;
};

function NavItemsPresenter({ items }: NavItemsPresProps) {
  const returnItems = () => {
    return items.map((it) => {
      const key = PageTypes[it.pageType];
      return (
        <Grid.Column
          key={key}
          mobile={16}
          tablet={5}
          computer={4}
          textAlign="center"
          style={{ height: "5rem" }}
        >
          <NavItem
            type={PageTypes[it.pageType]}
            colorHex={`${it.color}`}
            title={`${it.title}`}
          />
        </Grid.Column>
      );
    });
  };
  return (
    <Container className="NavItems-presenter" style={{ padding: "20px" }}>
      <Grid centered>{returnItems()}</Grid>
      <div
        style={{
          display: "table",
          clear: "both",
        }}
      />
    </Container>
  );
}

export { NavItemsPresenter };
