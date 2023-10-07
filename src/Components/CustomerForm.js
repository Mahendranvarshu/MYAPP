import React, { useState } from 'react';
import { FormLabel } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style2.css';



const CustomerForm = ({ onClose }) =>  {
    const [customer, setCustomer] = useState({
        name: '',
        address: '',
        phone_no: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCustomer({
            ...customer,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:8080/Customer/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Customer created:', data);
                // Handle success, reset form, or navigate to a different page
                toast.success('Customer created successfully!', {
                    position: 'top-right',
                    autoClose: 3000, // Close the message after 3 seconds
                });
                // Handl
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle the error, show an error message, etc.
            });
    };

    return (
        
        
        <div className="popup">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="popup-content">
                <button onClick={onClose} className="btn btn-primary">
                  Close
                </button>
                <div className="enter">
                  <h2>PLEASE ENTER</h2>
                </div>
      
                <div className="form-group">
                  <FormLabel htmlFor="name">Name:</FormLabel>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={customer.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={customer.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone_no">Phone Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone_no"
                    name="phone_no"
                    value={customer.phone_no}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Create Customer
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
      
    );
}

export default CustomerForm;
