import React, { useState} from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { ProgressBar } from "react-bootstrap";

import { RotatingLines } from "react-loader-spinner";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const CloseButton = styled.button`
position: absolute;
top: 10px;
left: 10px;
background: transparent;
border: none;
color: black;
font-size: 20px;
cursor: pointer;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  
  background-color: black;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
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
  padding: 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;


const SuccessMessage = styled.div`
  width: 100%;
  text-align: center;
  color: green;
`;

const Register =({ onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    lastname: "",
    phone_no: "",
    address: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [progress, setProgress] = useState(0); // Track progress

  const handleInputChange = (e) => {
    const { name, value } = e.target;
   
    if(formData.password.charAt(0)!=='@'){
      setSuccessMessage( <h1>Add @ symbal in front</h1>);
        // Clear the success message after a certain time (e.g., 3 seconds)
        setTimeout(() => setSuccessMessage(""), 10000);
     

    }
   else if(formData.password.length<=6){
      setSuccessMessage( <h1>More Then 6 Char </h1>);
        // Clear the success message after a certain time (e.g., 3 seconds)
        setTimeout(() => setSuccessMessage(""), 10000);

    }
    else{
    
      // You can also redirect to a success page here
    }
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
    setLoading(true);
    try {
      const response = await fetch("https://mahishop-app.onrender.com/Customer/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
     
      if (response.status === 400) {
        setSuccessMessage( <h1>Username already exists.</h1>);
        // Clear the success message after a certain time (e.g., 3 seconds)
        setTimeout(() => setSuccessMessage(""), 3000);
        // You can also redirect to a success page here
      } 
      else if (response.status === 200) {
        setSuccessMessage( <h1>Customer created successfully</h1>);
        // Clear the success message after a certain time (e.g., 3 seconds)
        setTimeout(() => setSuccessMessage(""), 3000);
        window.location.reload(); 
        // You can also redirect to a success page here
      }else {
        // Handle the case where the request was not successful (e.g., show an error message)
      }
    } catch (error) {
      console.error("An error occurred while creating the customer: ", error);
    }
  finally {
    setLoading(false); // Hide loading spinner
  }
  };
  const handleClose = () => {
    // Logic to close the component goes here
    onClose();
  };
 
  return (
    <Container>
      <Wrapper>
        <div >
        <CloseButton onClick={handleClose}>
           ❌ <h2>close</h2>      
        </CloseButton>
        </div>
      
        <Title>CREATE AN ACCOUNT</Title>
        
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        <ProgressBar progress={progress} /> {/* Progress bar component */}
        
        <Form onSubmit={handleSubmit}>
      
          <Input
            type="text"
            name="username"
            placeholder="UserName"
            value={formData.username}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="lastname"
            placeholder="last name"
            value={formData.lastname}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="phone_no"
            placeholder="PhoneNo"
            value={formData.phone_no}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
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
            <Button type="submit">SIGN IN</Button>
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

export default Register;
