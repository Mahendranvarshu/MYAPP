import React, { useState, useEffect } from 'react';


import styled from "styled-components";
const Container = styled.div`
  width: 100vw;
  height: 30vh;
  
  background-color:black;
  background-size: cover;
  display: flex;
  align-items: top;
  justify-content: center;
  flex: 1;
  z-index: 999;
  min-width: 8px;
  display: flex;
  justify-content: center;
   color:black;
  position: relative;
  padding: 10px;
`;
const CustomerList = ({ onClose }) => {
  const TopButton = styled.button`
  
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  color:white;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "white" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;


  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch data from your Spring Boot API
    fetch('https://mahishop-app.onrender.com/Customer/getAll') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDeleteCustomer = (customerId) => {
    // Make an HTTP request to delete the customer with the specified ID
    fetch(`https://mahishop-app.onrender.com/Customer/delete/${customerId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Update the state by filtering out the deleted customer
        setCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer.id !== customerId)
        );
      })    
      
      .catch((error) => {
        console.error('Error deleting customer:', error);
      });
  };

  return (
    <div className="popCL">
      <Container>
      <h1>Customer List</h1>
      <div className="close-button2">
        <TopButton onClick={onClose} >
          Close
        </TopButton>
      </div>

      <table className="table" style={{ backgroundColor: 'red' }}>
        <thead >
          <tr >
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Action</th> {/* Add a new column for the delete button */}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.username}</td>
              <td>{customer.email}</td>
              <td>{customer.address}</td>
              <td>{customer.phone_no}</td>
              <td>
                <button
                  onClick={() => handleDeleteCustomer(customer.id)} // Pass the customer ID to the delete function
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </Container>
    </div>
  );
};

export default CustomerList;
