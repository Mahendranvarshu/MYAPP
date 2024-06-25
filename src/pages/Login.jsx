import React, { useState} from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { ProgressBar } from "react-bootstrap";
import { RotatingLines } from "react-loader-spinner";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://st3.depositphotos.com/1607243/17947/i/1600/depositphotos_179477944-stock-photo-different-modern-devices-collection-rendering.jpg")
  center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  z-index: 999;
  min-width: 280px;
  display: flex;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  padding: 20px;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;


const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  color:black;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const SuccessMessage = styled.div`
  width: 100%;
  text-align: center;
  color: green;
`;


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [progress, setProgress] = useState(0); // Track progress
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Calculate progress based on the number of completed fields
    const fields = Object.values(formData).filter(Boolean);
    const newProgress = (fields.length / Object.keys(formData).length) * 100;
    setProgress(newProgress);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner

    try {
      const response = await fetch("https://mahishop-app.onrender.com/Customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setSuccessMessage(<h1>Login successfully</h1>);
        // Clear the success message after a certain time (e.g., 3 seconds)
        setTimeout(() => setSuccessMessage(""), 3000);
        window.location.reload();
      } else {
        if (response.status === 202) {
          setSuccessMessage(<h1>User Not Found</h1>);
        } else if (response.status === 400) {
          setSuccessMessage(<h1>Password is Wrong</h1>);
        } else {
          setSuccessMessage(<h1>BACKEND IS NOT ALIVE</h1>);
        }
        // Clear the success message after a certain time (e.g., 3 seconds)
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      setSuccessMessage(<h1>BACKEND IS NOT ALIVE</h1>);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };


  return (
    <Container>
      <Wrapper>
        <Title>LOGIN AN ACCOUNT</Title>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        <ProgressBar progress={progress} /> {/* Progress bar component */}
        <Form onSubmit={handleSubmit}>
          <Input
            type="mail"
            name="email"
            placeholder="EMail"
            value={formData.email}
            onChange={handleInputChange}
          />
          
          <Input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        {loading ? ( // Display the spinner if loading is true
            <SpinnerContainer>
              <RotatingLines
                strokeColor="blue"
                strokeWidth="7"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </SpinnerContainer>
          ) : (
            <Button type="submit">LOGIN</Button>
          )}

          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
       
        
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
