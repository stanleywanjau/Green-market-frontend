import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from 'react-use-cart';
import { CartProvider } from 'react-use-cart';
import ReviewComponent from './ReviewComponent';
import { useNavigate } from 'react-router-dom';


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function ProductDetails({ products }) {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const { addItem, removeItem, cartItems } = useCart();
    const shuffledProducts = shuffleArray([...products]);
    const selectedProducts = shuffledProducts.slice(0, 3);

    const [isInCart, setIsInCart] = useState(false);
    const navigate = useNavigate();
 
  function navigateToProductDetails(productId) {
        navigate(`/product/${productId}`); 
      }
      function navigateToLiveChart(receiver_user_id) {
        navigate(`/livechat/${receiver_user_id}`); 
      }

    useEffect(() => {
        fetch(`https://green-market-backend-2es1.onrender.com/product/${productId}`)
            .then(r => r.json())
            .then(data => {
                setProduct(data);
                setIsInCart(cartItems?.some(item => item.id === data.id));
            });
    }, [productId, cartItems]);

    const inCart = (productId) => {
        return cartItems && cartItems.some(item => item.id === productId);
    };

    

  const handleCartClick = () => {
    
    navigate('/cart'); // Navigate to the cart page
  };
    

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

    return (
        <CartProvider>
            <div className='product-details-container'>
                <img src={product.image} className='product-image' />
                <div className='product-details' style={{ marginLeft: "50px" }}>
                    <h3 className='product-title'>{product.name}</h3>
                    <div className='product-category'>Category: {product.category}</div>
                    <div className='product-price'>KSH{product.price}</div>
                    <div className='product-stock'><span>stock available:</span><br />{product.quantity_available}</div>
                    <div className='product-description'><span>Description :</span><br />{product.description}</div>
                    <ReviewComponent/>
                    <div className='button-container'>
                        <div className='btn-cart'>
                            <button
                                className={inCart(product.id) ? 'btn btn-danger' : 'btn btn-success'}
                                onClick={() => handleClick(product)}
                            >
                                {inCart(product.id) ? 'Remove from cart' : 'Add to cart'}
                            </button>
                            {/* console.log({product.farmer_id}) */}
                            <button className='btn btn-success' onClick={()=>navigateToLiveChart(product.farmer_id)}>chat with farmer</button>
                            <button className='btn btn-outline-dark'  onClick={handleCartClick}>Jump to cart</button>
                            <button className="btn btn-secondary" onClick={() => updateItemQuantity(productId, product.quantity - 1)}>-</button>
                            <button className="btn btn-secondary" onClick={() => updateItemQuantity(productId, product.quantity + 1)}>+</button>
                        </div>
                    </div>
                </div>
                <div className='selected-products'>
                    {selectedProducts.map((product) => (
                        <div key={product.id} style={{ marginLeft: "70px", justifyContent: "center" }} onClick={()=>navigateToProductDetails(product.id)} className="list-group">
                            <a href="#" className="list-group-item list-group-item-action" aria-current="true">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{product.name}</h5>
                                </div>
                                <img src={product.image} className="" alt="" style={{ height: '7rem', width: "7rem" }} />
                                <p className="mb-1">{product.price.toLocaleString('en-US', { style: 'currency', currency: 'KSH', marginLeft: "100px" })}</p>
                                <small> </small>
                                <small>{product.description}</small>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            
        </CartProvider>
    );
}

export default ProductDetails;
