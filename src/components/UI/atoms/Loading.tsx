import React from "react";
import styled from "styled-components";

const Loading = () => {
  return <LoadingStyle>...Loading</LoadingStyle>;
};

const LoadingStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  ${(props) => props.theme.typography.h4};

  background-color: rgba(255, 255, 255, 0.6);
`;

export default Loading;
