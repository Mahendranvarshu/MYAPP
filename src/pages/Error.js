import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 32vh;
  background-size: cover;
  display: flex;
  border-radius:26px;
  align-items: top;
  justify-content: center;
  flex: 1;
  z-index: 999;
  min-width: 280px;
  display: flex;
  background: 
  url("https://belajarhardwares.files.wordpress.com/2019/12/879663-amazing-windows-server-2018-wallpaper-1920x1080-hd-1080p-1.jpg?w=768")
  center;
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
          color: "white",
          
          fontWeight: "bold",
          fontSize: "30px",
          padding: "20px",
          borderRadius: "66px",
       
          textShadow: "6px 6px 8px red",
          width: `${27}ch`,
          textAlign: "center",
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
