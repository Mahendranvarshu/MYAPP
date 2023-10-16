import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  makeStyles,
  FormLabel,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    zIndex: 999,
    backgroundColor: '#cde1f2',
    width: '75%',
    border: '2px solid #c2e8f3',
    boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.6)',
    transition: 'right 0.3s ease-in-out',
    flex: 1,
    position: 'relative',
  },
  paper: {
    padding: theme.spacing(3),
  },
  uploadButton: {
    marginTop: theme.spacing(2),
  },
}));

function ProductForm() {
  const [product, setProduct] = useState({
    product_name: '',
    brand_name: '',
    price: '',
    category: '',
    stack: '',
    warenty: '',
    offer_end_date: '',
  });
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

    fetch('http://localhost:8080/Product/create', {
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
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Add Product
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                name="product_name"
                label="Product Name"
                fullWidth
                value={product.product_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="brand_name"
                label="Brand Name"
                fullWidth
                value={product.brand_name}
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
                name="stack"
                label="Stack"
                fullWidth
                type="number"
                value={product.stack}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="warenty"
                label="Warranty"
                fullWidth
                type="number"
                value={product.warenty}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="offer_end_date"
                label="Offer End Date"
                fullWidth
                type="text"
                value={product.offer_end_date}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.uploadButton}
          >
            Add Product
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default ProductForm;
