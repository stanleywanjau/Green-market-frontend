import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from 'react-use-cart';
import { CartProvider } from 'react-use-cart';


function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const { addItem, removeItem, cartItems } = useCart();
    
    const [isInCart, setIsInCart] = useState(false);

    const handleClick = (product) => {
        if (isInCart) {
            removeItem(product.id);
        } else {
            addItem(product);
        }
    }

    const updateItemQuantity = (productId, quantity) => {
        // Implement logic to update item quantity in the cart
    };

    useEffect(() => {
        fetch(`/product/${productId}`)
            .then(r => r.json())
            .then(data => {
                console.log(data);
                setProduct(data);
                setIsInCart(cartItems?.some(item => item.id === data.id));
            });
    }, [productId, cartItems]);

    return (
        <CartProvider>
        <div className='product-details-container'>
            <img src={product.image} className='product-image' />
            <div className='product-details'  style ={{marginLeft:"100px"}}>
                <h3 className='product-title'>{product.name}</h3>
                <div className='product-category'>Category: {product.category}</div>
                <div className='product-price'>KES{product.price}</div>
                <div className='product-stock'><span>stock available:</span><br />{product.quantity_available}</div>
                <div className='product-description'><span>Description :</span><br />{product.description}</div>
                <div className='button-container'>
                    <div className='btn-cart'>
                        <button
                            className={(isInCart) ? 'btn btn-danger' : 'btn btn-success'}
                            onClick={() => handleClick(product)}
                        >
                            {isInCart ? 'Remove from cart' : 'Add to cart'}
                        </button>
                        <button className="btn btn-secondary" onClick={() => updateItemQuantity(productId, product.quantity - 1)}>-</button>
                        <button className="btn btn-secondary" onClick={() => updateItemQuantity(productId, product.quantity + 1)}>+</button>
                    </div>
                </div>
            </div>
        </div>
        </CartProvider>
    );
}

export default ProductDetails;
