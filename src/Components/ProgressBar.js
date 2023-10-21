import React from "react";
import styled from "styled-components";

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 10px;
  background-color: #ddd;
`;

const ProgressBarFill = styled.div`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: teal;
  transition: width 0.3s;
`;

const ProgressBar = ({ progress }) => {
  return (
    <ProgressBarWrapper>
      <ProgressBarFill progress={progress} />
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
