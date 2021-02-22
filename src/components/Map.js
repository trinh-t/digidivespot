import React from "react";
import styled from "styled-components";

export default function Map({ mapUrl }) {
  const uri = mapUrl.replaceAll("&amp;", "&");
  return (
    <StyledMapContainer
      title="Map"
      width="100%"
      height="250"
      frameBorder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
      src={uri}
    ></StyledMapContainer>
  );
}

const StyledMapContainer = styled.iframe`
  width: 100%;
  height: 250px;
  overflow: hidden;
`;
