import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState } from 'react';
import styled from "styled-components";
import { mobile } from "../responsive";
import CustomerForm from "./CustomerForm";
import ProductForm from "./ProductForm";
import CustomerList from "./CustomerList";
import RegistrationForm from "./RegistrationForm";

import ProductListview from "../Components/ProductListview";
import Cart from "../pages/Cart";
import Login from "../pages/Login";




const Container = styled.div`
  height: 90px;
  border: 1.5px solid gray;

  
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
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
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
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
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>MahiShop.</Logo>
        </Center>
        <Right>
        <MenuItem onClick={() => openPopup('CustomerForm')}>CustomerForm</MenuItem>
        <MenuItem onClick={() => openPopup('ProductForm')}>ProductForm</MenuItem>
        <MenuItem onClick={() => openPopup('ProductList')}>ProductList</MenuItem>
        <MenuItem onClick={() => openPopup('Customerdetails')}>CustomerDetails</MenuItem>
          <MenuItem onClick={() => openPopup('RegisterForm')}>REGISTER</MenuItem>
          <MenuItem onClick={() => openPopup('signup')}>SIGN IN </MenuItem>
          <MenuItem onClick={() => openPopup('Shopcart')}>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
      {selectedMenuItem === 'CustomerForm' && (
  <CustomerForm onClose={closePopup} /> )}
  {selectedMenuItem === 'ProductForm' && (
    <ProductForm onClose={closePopup} />
)}
  {selectedMenuItem === 'Customerdetails' && (
    <CustomerList onClose={closePopup} />
)}
 {selectedMenuItem === 'RegisterForm' && (
    <RegistrationForm onClose={closePopup} />
)}
 {selectedMenuItem === 'ProductList' && (
    <ProductListview onClose={closePopup} />
)}
{selectedMenuItem === 'signup' && (
  <Login onClose={closePopup} />
)}
 {selectedMenuItem === 'Shopcart' && (
    <Cart onClose={closePopup} />
)}
    </Container>



  );
};

export default Navbar;
