import React, { useState, useEffect } from 'react';


import styled from "styled-components";
const Container = styled.div`
  width: 100vw;
  height: 60vh;
 
  background: linear-gradient(
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://c8.alamy.com/comp/KXDA03/devices-top-view-3d-rendering-KXDA03.jpg")
  center;
  background-size: cover;
  display: flex;
  align-items: top;
  justify-content: center;
  flex: 1;
  z-index: 999;
  min-width: 28px;
  display: flex;
  justify-content: center;

  position: relative;
  padding: 20px;
`;
const CustomerList = ({ onClose }) => {
  const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;


  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch data from your Spring Boot API
    fetch('http://43.207.42.133:8080/Customer/getAll') // Replace with your API endpoint
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
    fetch(`http://43.207.42.133:8080/Customer/delete/${customerId}`, {
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
      <h2 className="h22">Customer List</h2>
      <div className="close-button2">
        <TopButton onClick={onClose} >
          Close
        </TopButton>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Action</th> {/* Add a new column for the delete button */}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
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
