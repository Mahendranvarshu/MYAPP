import React, { useState } from 'react';
import { RotatingLines } from "react-loader-spinner";
import {
  TextField,
  Button,
  
  Grid,
  Typography,
  Paper,
  makeStyles,
  FormLabel,
} from '@material-ui/core';

import { mobile } from "../responsive";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background:
  url("https://c8.alamy.com/comp/KXDA03/devices-top-view-3d-rendering-KXDA03.jpg")
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
  background-color: #fcf5f5;
  position: relative;
  padding: 20px;
`;
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Wrapper = styled.div`
  width: 70%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;


const useStyles = makeStyles((theme) => ({
 
  paper: {
    padding: theme.spacing(3),
  },
  uploadButton: {
    marginTop: theme.spacing(2),
  },
}));

function ProductForm() {


  
  const [product, setProduct] = useState({
    productName: '',
    brandName: '',
    price: '',
    category: '',
    stock: '',
    warranty: '',
    offerEndDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [File, setFile] = useState(null);

  const classes = useStyles();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
   
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('file', File);
    formData.append('product', JSON.stringify(product));
    try{
      setLoading(true);
    fetch('https://mahishop-app.onrender.com/Product/create', {
      method: 'POST',
      body: formData,
      headers: {
        // Make sure to set the correct content type for multi-part form data
        // 'Content-Type' will be automatically set by FormData
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
    finally{
      setLoading(false);
    }
  };


  return (
    <Container>
    <Wrapper>
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Add Product
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                name="productName"
                label="Product Name"
                fullWidth
                value={product.productName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="brandName"
                label="Brand Name"
                fullWidth
                value={product.brandName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="price"
                label="Price"
                fullWidth
                type="number"
                value={product.price}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="category"
                label="Category"
                fullWidth
                value={product.category}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="stock"
                label="Stack"
                fullWidth
                type="number"
                value={product.stock}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="warranty"
                label="Warranty"
                fullWidth
                type="number"
                value={product.warranty}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="offerEndDate"
                label="Offer End Date"
                fullWidth
                type="text"
                value={product.offerEndDate}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Product Image:</FormLabel>
              <input
                type="file"
                accept=".jpg, .jpeg"
                name="file"
                onChange={handleFileChange}
              />
            </Grid>
          </Grid>
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
            <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.uploadButton}
          >
            Add Product
          </Button>
          )}
          
        </form>
      </Paper>
    
      </Wrapper>
    </Container>
  );
}

export default ProductForm;
