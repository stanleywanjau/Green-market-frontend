import React, { useEffect, useState } from "react";
import UpdateProductForm from "./UpdateProduct";
import { useNavigate, useParams } from 'react-router-dom';

function Farmerproduct(){
    const [products, setProducts] = useState([]);
    const navigate=useNavigate()

    useEffect(() => {
        fetch("/farmerproducts", { 
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            } 
        })
        .then(r => r.json())
        .then(data => {
            setProducts(data);
        });
    }, []);

    function navigateToupdateProduct(productId) {
        navigate(`/Updateproduct/${productId}`); 
      }

    const handleDelete = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            fetch(`/deleteproduct/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setProducts((products) => products.filter((product) => product.id !== productId));
            })
            // .catch(error => {
                
            // });
        }
    };

    return (
        <>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: '#f2f2f2', borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                        <th style={{ backgroundColor: '#f2f2f2', borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Description</th>
                        <th style={{ backgroundColor: '#f2f2f2', borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Price</th>
                        <th style={{ backgroundColor: '#f2f2f2', borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Quantity Available</th>
                        <th style={{ backgroundColor: '#f2f2f2', borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Image</th>
                        <th style={{ backgroundColor: '#f2f2f2', borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Delete</th>
                        <th style={{ backgroundColor: '#f2f2f2', borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                            <td style={{ padding: '8px' }}>{product.name}</td>
                            <td style={{ padding: '8px' }}>{product.description}</td>
                            <td style={{ padding: '8px' }}>{product.price}</td>
                            <td style={{ padding: '8px' }}>{product.quantity_available}</td>
                            <td style={{ padding: '8px' }}><img src={product.image} alt={product.name} style={{width: '100px', height: '100px'}} /></td>
                            <td style={{ padding: '8px' }}> <button onClick={()=>{handleDelete(product.id)}}>Delete Product</button></td>
                            <td style={{ padding: '8px' }}> <button onClick={()=>{navigateToupdateProduct(product.id)}}>edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Farmerproduct;
