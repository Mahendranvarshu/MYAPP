import React, { useState, useEffect } from 'react';
import { Container, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    zIndex: 999,
    width: '80%',
    backgroundColor: '#cde1f2',
    justifyContent: 'center',
    boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.6)',
    transition: 'right 0.3s ease-in-out',
    flex: 1,
    position: 'relative',
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
  table: {
    marginTop: theme.spacing(2),
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));

const ProductListview = ({ onClose }) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from your Spring Boot API
    fetch('http://localhost:8080/Product/getAll') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDeleteProduct = (product_ID) => {
    // Make an HTTP request to delete the product with the specified ID
    fetch(`http://localhost:8080/Product/delete/${product_ID}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Update the state by filtering out the deleted product
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.product_ID !== product_ID)
        );
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center" gutterBottom>
          Product List
          <div className={classes.closeButton}>
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </div>
        </Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Brand Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Stack</TableCell>
              <TableCell>Warranty</TableCell>
              <TableCell>Offer End Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.product_ID}>
                <TableCell>{product.product_ID}</TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.brand_name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stack}</TableCell>
                <TableCell>{product.warenty || 'N/A'}</TableCell>
                <TableCell>{product.offerEnd_date || 'N/A'}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteProduct(product.product_ID)}
                    variant="contained"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
       
      </Paper>
    </Container>
  );
};

export default ProductListview;
