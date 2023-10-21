import React, { useState} from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { ProgressBar } from "react-bootstrap";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
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

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [progress, setProgress] = useState(0); // Track progress

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
    try {
      const response = await fetch("http://localhost:8080/Customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        setSuccessMessage( <h1>Login successfully</h1>);
        // Clear the success message after a certain time (e.g., 3 seconds)
        setTimeout(() => setSuccessMessage(""), 3000);
        window.location.href = "http://localhost:3000/"; 
        // You can also redirect to a success page here
      }
      else if (response.status === 202) {
        setSuccessMessage( <h1>User Not Found</h1>);
        // Clear the success message after a certain time (e.g., 3 seconds)
        setTimeout(() => setSuccessMessage(""), 3000);
        // You can also redirect to a success page here
      }
      else if (response.status === 400) {
        setSuccessMessage( <h1>password its Wrong</h1>);
        // Clear the success message after a certain time (e.g., 3 seconds)
        setTimeout(() => setSuccessMessage(""), 3000);
        // You can also redirect to a success page here
      }
       else {
        // Handle the case where the request was not successful (e.g., show an error message)
      }
    } catch (error) {
      console.error("An error occurred while login the customer: ", error);
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
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          
          <Input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">LOGIN</Button>
        
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
