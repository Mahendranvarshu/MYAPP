import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: black;
  border: 2px solid #c2e8f3;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.6);
  transition: right 0.3s ease-in-out;
  flex: 1;
  min-width: 280px;
  display: flex;
  z-index: 999;
  justify-content: center;
  position: relative;
  padding: 40px;
  color: white;
`;
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f5f5f5;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  margin-top: 20px;
  background-color: #e53935;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const CustomerDetails = ({ onClose }) => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch('https://mahishop-app.onrender.com/OrderManage/getOrderDetails'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCustomerData(data);
      } catch (error) {
        setError('Orders is Empty. Please order again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  
  const handleCancelOrder = async (orderid) => {
    try {setLoading(true);
      alert('Are you sure to cancel the order');
      // Perform cancellation logic here, e.g., interacting with your API
      const response = await fetch(`https://mahishop-app.onrender.com/OrderManage/cancelorder/${orderid}`, {
        method: 'DELETE', // Corrected method to DELETE
        headers: {
          'Content-Type': 'application/json',
        },
      });
      

      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }

      // Handle cancellation success - you might want to update the UI or take further actions
      console.log('Order canceled successfully');
      
    } catch (error) {
      setError('Orders is Empty. Please order again ');
      // Handle error state or display an error message to the user
    }
    
  };

  const handleClose = () => {
    // Logic to close the component goes here
    onClose();
  };


  if (error) return <Container>Error: {error}</Container>;
  if (!customerData) return <Container>No customer details available</Container>;

  return (
    <Container>
      <CloseButton onClick={handleClose}>❌</CloseButton>
      <div className="customer-details-container">
        <h1>Order Details</h1>
        <p><strong>🆔 ID:</strong> {customerData.id}</p>
      <p><strong>👤 Name:</strong> {customerData.customerName}</p>
      <p><strong>🏠 Address:</strong> {customerData.customerAddress}</p>
      <p><strong>☎️ Phone:</strong> {customerData.customerPhone}</p>
      <p><strong>💵 Order Cost:</strong> ${customerData.orderCost}</p>
      <p><strong>📅 Delivery Date:</strong> {customerData.delivery}</p>
      <p><strong>📅 Booking Date:</strong> {customerData.bookingDate}</p>

        {/* ... (other customer details) */}

        <div className="product-list">
          <h2>🛍️ Products</h2>
          <ProductTable>
            <thead>
              <tr>
                <th>Product</th>
                <th>Brand</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {customerData.listOfProduct.map((product, index) => (
                <tr key={index}>
                  <td>{product.productName}</td>
                  <td>{product.brandName}</td>
                  <td>${product.price}</td>
                </tr>
              ))}
            </tbody>
          </ProductTable>
        </div>
        {loading ? ( // Display the spinner if loading is true
            <SpinnerContainer>
              <h1>Order is cancelled</h1>
             
            </SpinnerContainer>
          ) : (
            <CancelButton onClick={() => handleCancelOrder(customerData.id)}>Cancel Order</CancelButton>

          )}
       
   </div>
    </Container>
  );
};

export default CustomerDetails;
