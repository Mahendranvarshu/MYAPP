import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState } from 'react';
import styled from "styled-components";
import { mobile } from "../responsive";
import CustomerForm from "./CustomerForm";
import ProductForm from "./ProductForm";
import CustomerList from "./CustomerList";
import Register from "../pages/Register";
import ProductListview from "../Components/ProductListview";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import logo from '../pages/favicon.ico';

const Container = styled.div`
  background: #fcf5f5;/* Blue background */
  color:#fcf5f5; /* White text color */
  
  padding: 15px 0; /* Increased padding to raise the Navbar height */
`;
const Container2 = styled.div`
  background: linear-gradient(15deg, #FF5733, #0052D4); /* Blue background */
  color: #fff; /* White text color */
  box-shadow: 5px 5px 10px rgba(0, 82, 212, 0.7); /* Fixed the shadow property */
  padding: 10px 0; /* Increased padding to raise the Navbar height */
  border-radius: 10px; /* Add rounded corners with a specific radius */
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  ${mobile({ padding: "10px 0" })}
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;

  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  color: #111;
  background: transparent;
  font-size: 14px;
  width: 120px;

  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 32px; /* Increased font size for better visibility */
  color: white; /* A specific color for the logo */
   /* Convert text to uppercase */
  letter-spacing: 4px; /* Add letter spacing for a more stylish look */
  margin: 5; /* Remove any default margins */
  padding: 0px; /* Add some padding for spacing */
  /* Add an underline with a different color */
  text-shadow: 4px 4px 0 #000, 8px 8px 0 #ff5733; /* Create a 3D text effect with text-shadow */
  transition: transform 0.2s ease-in-out; /* Add a transition effect */

  &:hover {
    transform: scale(1.1); /* Scale the text when hovered */
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;
const LogoImage = styled.img`
  width: 70px; /* Set the width and height as per your preference */
  height: auto; /* Maintain aspect ratio */
  margin-right: 10px; /* Add some margin to separate the logo from other elements */
  
  `;


const MenuItem = styled.div`
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 12px;
  text-transform: uppercase; /* Make text uppercase */

  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const openPopup = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const closePopup = () => {
    setSelectedMenuItem(null);
  };

  return (
    <Container>
      <Container2>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
        <LogoImage src={logo} />
          <Logo>MahiShop.in</Logo>
        </Center>
        <Right>
          <MenuItem onClick={() => openPopup('CustomerForm')}>CustomerForm</MenuItem>
          <MenuItem onClick={() => openPopup('ProductForm')}>ProductForm</MenuItem>
          <MenuItem onClick={() => openPopup('ProductList')}>ProductList</MenuItem>
          <MenuItem onClick={() => openPopup('Customerdetails')}>CustomerDetails</MenuItem>
          <MenuItem onClick={() => openPopup('Register')}>REGISTER</MenuItem>
          <MenuItem onClick={() => openPopup('signup')}>SIGN IN</MenuItem>
          <MenuItem onClick={() => openPopup('Shopcart')}>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
      {selectedMenuItem === 'CustomerForm' && <CustomerForm onClose={closePopup} />}
      {selectedMenuItem === 'ProductForm' && <ProductForm onClose={closePopup} />}
      {selectedMenuItem === 'Customerdetails' && <CustomerList onClose={closePopup} />}
      {selectedMenuItem === 'Register' && <Register onClose={closePopup} />}
      {selectedMenuItem === 'ProductList' && <ProductListview onClose={closePopup} />}
      {selectedMenuItem === 'signup' && <Login onClose={closePopup} />}
      {selectedMenuItem === 'Shopcart' && <Cart onClose={closePopup} />}
      </Container2>
    </Container>
  );
};

export default Navbar;
