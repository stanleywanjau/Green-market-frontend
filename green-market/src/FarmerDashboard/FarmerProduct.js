import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import AddProductForm from "./Addfarmerproducts";
import "./Table.css"

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
        <Accordion >
      <Accordion.Item eventKey="0">
        <Accordion.Header>add new product</Accordion.Header>
        <Accordion.Body>
          <AddProductForm/>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
            <table style={{ borderCollapse: 'collapse', width: '100%' }} className="table table-striped table-bordered mt-3" >
                <thead>
                    <tr>
                        <th style={{  borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }} scope="col">Name</th>
                        <th style={{  borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }} scope="col">Description</th>
                        <th style={{  borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }} scope="col">Price</th>
                        <th style={{  borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }} scope="col">Quantity Available</th>
                        <th style={{  borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }} scope="col">Image</th>
                        <th style={{  borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }} scope="col">Delete</th>
                        <th style={{  borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }} scope="col">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                            <td style={{ padding: '8px' }} data-label="Name">{product.name}</td>
                            <td style={{ padding: '8px' }} data-label="description">{product.description}</td>
                            <td style={{ padding: '8px' }} data-label="price">{product.price}</td>
                            <td style={{ padding: '8px' }} data-label="quantity available">{product.quantity_available}</td>
                            <td style={{ padding: '8px' }} data-label="Image"><img src={product.image} alt={product.name} style={{width: '100px', height: '100px'}} /></td>
                            <td style={{ padding: '8px' }}> <button onClick={()=>{handleDelete(product.id)}}  type="button" class="btn btn-success">Delete Product</button></td>
                            <td style={{ padding: '8px' }} > <button onClick={()=>{navigateToupdateProduct(product.id)}}  type="button" class="btn btn-success">edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Farmerproduct;
