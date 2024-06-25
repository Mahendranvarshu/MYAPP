import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState } from 'react';
import axios from 'axios';
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
  background: linear-gradient(15deg, #FF5733, #0052D4);
  color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 82, 212, 0.7);
  padding: 10px 20px;
  border-radius: 10px;
  ${mobile({ padding: "10px" })}
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  ${mobile({ flexDirection: "column", padding: "10px" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-top: 10px; /* Adjusted margin for better spacing on mobile */
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  color: #111;
  background: transparent;
  font-size: 14px;
  width: 100%; /* Adjusted width for better responsiveness */
  ${mobile({ width: "80%" })}
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  ${mobile({ flexDirection: "column", alignItems: "center" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ marginTop: "10px" })}
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  ${mobile({ marginTop: "10px", justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin: 5px; /* Adjusted margin for better spacing on mobile */
  text-transform: uppercase;
  ${mobile({ fontSize: "12px", margin: "5px" })}
`;

const LogoImage = styled.img`
  width: 70px;
  height: auto;
  margin-right: 10px;
  ${mobile({ width: "50px", height: "auto" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 24px;
  color: white;
  letter-spacing: 2px;
  margin: 5px;
  padding: 0px;
  text-shadow: 2px 2px 0 #000, 4px 4px 0 #ff5733;
  transition: transform 0.2s ease-in-out;
  ${mobile({ fontSize: "20px" })}
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;

  ${mobile({ display: "none" })}
`;

const Navbar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const openPopup = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const closePopup = () => {
    setSelectedMenuItem(null);
  };

  const [totalCartItems, setTotalCartItems] = useState(0);

  
    axios.get('https://mahishop-app.onrender.com/Order/totalcart')
      .then(response => {
        setTotalCartItems(response.data); // Assuming the response contains the total count
      })
      .catch(error => {
        console.error('Error fetching total cart items:', error);
      });



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
          <Logo>MahiShop.in💖</Logo>
        </Center>
        <Right>
          <MenuItem onClick={() => openPopup('CustomerForm')}>Order Details</MenuItem>
          <MenuItem onClick={() => openPopup('ProductForm')}>ProductForm</MenuItem>
          <MenuItem onClick={() => openPopup('ProductList')}>ProductList</MenuItem>
          <MenuItem onClick={() => openPopup('Customerdetails')}>CustomerDetails</MenuItem>
          <MenuItem onClick={() => openPopup('Register')}>💖REGISTER💖</MenuItem>
          <MenuItem onClick={() => openPopup('signup')}>💖SIGN IN💖</MenuItem>
          <MenuItem onClick={() => openPopup('Shopcart')}>
            <Badge badgeContent={totalCartItems} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
      </Container2>
      {selectedMenuItem === 'CustomerForm' && <CustomerForm onClose={closePopup} />}
      {selectedMenuItem === 'ProductForm' && <ProductForm onClose={closePopup} />}
      {selectedMenuItem === 'Customerdetails' && <CustomerList onClose={closePopup} />}
      {selectedMenuItem === 'Register' && <Register onClose={closePopup} />}
      {selectedMenuItem === 'ProductList' && <ProductListview onClose={closePopup} />}
      {selectedMenuItem === 'signup' && <Login onClose={closePopup} />}
      {selectedMenuItem === 'Shopcart' && <Cart onClose={closePopup} />}
     
    </Container>
  );
};

export default Navbar;
