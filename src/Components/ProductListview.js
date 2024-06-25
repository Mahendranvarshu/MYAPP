import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductListview = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://mahishop-app.onrender.com/Customer/getAll')
            .then(response => {
                setCustomers(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading data: {error.message}</p>;
    }

    return (
        <div>
            <h1>Customer List</h1>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>
                        <p><strong>Username:</strong> {customer.username}</p>
                        <p><strong>Last Name:</strong> {customer.lastname}</p>
                        <p><strong>Address:</strong> {customer.address}</p>
                        <p><strong>Email:</strong> {customer.email}</p>
                        <p><strong>Phone Number:</strong> {customer.phone_no}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductListview;
