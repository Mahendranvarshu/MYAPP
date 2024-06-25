import React from "react";
import styled from "styled-components";
import scooterImage from "../img/scooter-4657.gif"; 

const Container = styled.div`
  width: 100%;
  height: 82vh;
  background-size: cover;
  display: flex;
  border-radius: 26px;
  align-items: top;
  justify-content: center;
  flex: 1;
  z-index: 999;
  min-width: 280px;
  background-image: url(${scooterImage}); // Use the imported image
  background-color: #fcf5f5;
  padding: 20px;
`;

const Error = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <Container>
    <h1
    className="c1"
    style={{
      color: "black",
      fontWeight: "bold",
      fontSize: "60px",
      padding: "50px",
      borderRadius: "66px",
      textShadow: "6px 6px 9px red",
      width: `${27}ch`,
      textAlign: "right", // Adjust this property for horizontal alignment
      marginTop: "50px",
      marginRight:"-220px",// Example of vertical alignment using margin
    }}
      >
        Backend Service Is Not Live. Wait for the Connection. Refresh the App...
        <button
        onClick={refreshPage}
        style={{
          color: 'white',
    background: 'rgba(32, 71, 227, 0.5)',
    padding: '5px',
    fontSize: "30px",
    fontWeight: "bold",
    borderRadius: '16px',
    boxShadow: '5px 5px 10px red'
        }}
      >
        Refresh
      </button>
      </h1>
      
    </Container>
  );
};

export default Error;
