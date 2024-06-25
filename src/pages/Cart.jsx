import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import React, { useState,useEffect} from "react";

import { mobile } from "../responsive";

import { RotatingLines } from "react-loader-spinner";
const Container = styled.div`
background-color: #cde1f2; /* Set the background color */
border: 2px solid #c2e8f3; /* Set border thickness and color */
box-shadow: -2px 0 10px rgba(0, 0, 0, 0.6); /* Add shadow for depth */
transition: right 0.3s ease-in-out; /* Transition for smooth appearance */
flex: 1;
  
min-width: 280px;

display: flex;
z-index: 999;
justify-content: center;
background-color: #f5fbfd;
position: relative;
padding: 40px;
`;

const SuccessMessage = styled.div`
width: 70%;
text-align: center;
color: black; /* White text color */
/* Add padding for better spacing */
font-weight:  bold;; /* Bold text */
font-size: 30px; /* Font size */
text-shadow: 6px 6px 8px rgba(32, 71, 227, 0.5);

`;
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;



const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  color:black;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  color:black;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
color:black;
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color:black;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
color:black;
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const OuterContainer = styled.div`
  height: 70vh; /* Set a fixed height for the scrollable container */
  overflow: auto; /* Add a scrollbar if the content overflows the container */
`;



const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  color:black;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}

  background-color: lightblue;
  border: 2px solid #3498db;
  border-radius: 8px;
  padding: 20px;

  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);

`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  color:black;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  
  color:black;
  height: 53vh;
`;

const SummaryTitle = styled.h1`
color:black;
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  color:black;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

  const Cart = ({ onClose }) => {

    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
   // Track progress
  
    const Bookorder = (price) => {

      setLoading(true);
      alert('Order Confirm');
      // Send a DELETE request to your server to remove the product from the cart
      fetch(`https://mahishop-app.onrender.com/Order/Bookorder/${price}`, {
        method: 'POST',
      })
        .then((response) => {
          if (response.status === 201) {
        
            
            setLoading(false);
  
            setSuccessMessage( <h1>Order Placed Successfully </h1>);

        setTimeout(() => setSuccessMessage(""), 4000);

          } else {
            
            // Clear the success message after a certain time (e.g., 3 seconds)
            setTimeout(() => setSuccessMessage(" Order Already Placed check your Mail"), 3000);
            alert('Order Already Placed');
            setLoading(false);
            
          }
        })
        
        .catch((error) => console.error('Error removing product:', error));
       
    };
    

// Update your Product component within the Info section:
const removeProduct = (productId) => {
  alert('Are you sure');
  // Send a DELETE request to your server to remove the product from the cart
  fetch(`https://mahishop-app.onrender.com/Order/removeFromCart/${productId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.status === 200) {
        // Product removed successfully, update the 
        
          const updatedProducts = products.filter(
            (product) => product.id!== productId
          );
        setProducts(updatedProducts);
      } else {
        // Handle errors if needed
      }
    })
    .catch((error) => console.error('Error removing product:', error));
};


    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      setLoading2(true); // Set loading to true before fetching data
      // Fetch product data from your API
      fetch("https://mahishop-app.onrender.com/Order/getcartP")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          setLoading2(false); // Set loading to false after data is fetched
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading2(false); // Ensure loading is set to false on error too
        });
    }, []);
  
    return (
      <Container>
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <TopButton onClick={onClose}>CONTINUE SHOPPING</TopButton>
            <TopTexts>
              <TopText>Shopping Bag({products.length})</TopText>
              <TopText>Your Wishlist (0)</TopText>
            </TopTexts>
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          </Top>
          <Bottom>
          <OuterContainer>
          {loading2 ?  (<SpinnerContainer>
              <RotatingLines
                strokeColor="blue"
                strokeWidth="7"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </SpinnerContainer>
            ):(
            <Info>
            
              {products.map((product) => (
               
                <Product key={product.id}>

                  <ProductDetail>
                    <Image src={`data:image/png;base64,${product.image}`} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.productName}
                      </ProductName>
                      <ProductId>
                        <b>Brand:</b> {product.brandName}
                      </ProductId>
                      <ProductColor color={product.brandName} />
                      <ProductSize>
                        <b>Warrenty:  {product.warranty}Year </b>
                      </ProductSize>


                      <Button
  onClick={() => removeProduct(product.id)}
  style={{
    color: 'white',
    background: 'linear-gradient(45deg, #FF5733, #0052D4)',
    padding: '5px',
    borderRadius: '6px',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.4)'
  }}
>
  Remove
</Button>

                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add />
                      <ProductAmount>{product.stock}</ProductAmount>
                      <Remove />
                    </ProductAmountContainer>
                    <ProductPrice>$ {product.price}</ProductPrice>
                  </PriceDetail>
                  
                </Product>
                
              ))}
              <Hr />
            </Info>
            )}
              </OuterContainer>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {calculateSubtotal(products)}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.5</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Delivery Charge</SummaryItemText>
                <SummaryItemPrice>$ 7.5</SummaryItemPrice>
              </SummaryItem>
               <SummaryItem >
                <SummaryItemText>GST Rate</SummaryItemText>
                <SummaryItemPrice>$ 10</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>
                  $ {calculateSubtotal(products) + 5.5 + 7.5 +10}
                </SummaryItemPrice>
              
              </SummaryItem>
              {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
              
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
            < Button onClick ={() => Bookorder(  calculateSubtotal(products) + 5.5+ 7.5 +10)}><h5>SUBMIT THE ORDER</h5></Button>
           
          )}
              </Summary>
          </Bottom>
        </Wrapper>
      </Container>
    );
  };
  
  export default Cart;
  const calculateSubtotal = (products) => {
    return products.reduce(
      (total, product) => total + product.price,
      0
    );
  };

  


