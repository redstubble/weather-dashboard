import React from "react";
import styled from "styled-components";
import { Button, Icon } from "semantic-ui-react";
import ReactCardFlip from "react-card-flip";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "gatsby";
import { PageTypes } from "../../../utils/pageType";
import { updatePageState, updatePostState } from "../../../redux-actions";
import { RootState } from "../../../redux-reducer/init";

const CustomIcon = styled(Icon)`
  background-color: "#fff";
  border-bottom-left-radius: 3.5rem;
  border-top-left-radius: 3.5rem;
`;

const ButtonFront = styled(Button)`
  &&& {
    border-radius: inherit;
    border-radius: 3.5rem;
    color: #fff;
    background-color: ${(props: any) => props.colorprop};
    &:hover {
      background-color: ${(props: any) => props.colorprop};
      color: #fff;
    }
  }
`;

const ButtonBack = styled(ButtonFront)`
  &&& {
    border-radius: inherit;
    border-width: 3px;
    border-style: solid;
    border-color: ${(props: { colorprop: string }) => props.colorprop};
    color: ${(props: { colorprop: string }) => props.colorprop};
    background-color: #fff;
    &:hover {
      color: ${(props: { colorprop: string }) => props.colorprop};
      background-color: #fff;
    }
  }
`;

type NavItemProps = {
  type: PageTypes;
  title: string;
  colorHex: string;
};

function NavItem({ type, title, colorHex }: NavItemProps) {
  const { currentPage, previousPage } = useSelector(
    (a: RootState) => a.pageState
  );
  const dispatch = useDispatch();

  if (previousPage === PageTypes.index) {
    /** There is no previous page */
    return (
      <ReactCardFlip isFlipped={currentPage === type}>
        <ButtonFront
          colorprop={colorHex}
          key="front"
          size="large"
          onClick={() => {
            console.log("click", currentPage, previousPage);
            dispatch(updatePageState(type));
            dispatch(updatePostState(currentPage));
          }}
        >
          {title}
        </ButtonFront>
        <ButtonBack
          colorprop={colorHex}
          key="back"
          size="large"
          onClick={() => {
            dispatch(updatePageState(previousPage));
            dispatch(updatePostState(PageTypes.index));
          }}
        >
          {title}
        </ButtonBack>
      </ReactCardFlip>
    );
  }
  return (
    <ButtonBack
      colorprop={colorHex}
      size="large"
      onClick={() => {
        console.log("click", previousPage);
        dispatch(updatePageState(previousPage));
        dispatch(updatePostState(PageTypes.index));
        // if (window.location.pathname !== "/") {
        //   navigate("/");
        // }
      }}
      labelPosition="left"
      icon
    >
      {title}
      <CustomIcon style={{ backgroundColor: "#fff" }} name="left arrow" />
    </ButtonBack>
  );
}
export { NavItem };
