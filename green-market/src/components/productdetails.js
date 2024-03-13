import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "react-use-cart";
import { CartProvider } from "react-use-cart";
import ReactStars from "react-stars";
import { useNavigate } from "react-router-dom";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [reviewStats, setReviewStats] = useState({
    averageRating: 0,
    totalReviews: 0,
  });
  const { addItem, removeItem, cartItems } = useCart();

  const [isInCart, setIsInCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/product/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setIsInCart(cartItems?.some((item) => item.id === data.id));
      });

    fetch(`/reviewstats/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setReviewStats({
          averageRating: data.averageRating,
          totalReviews: data.totalReviews,
        });
      });
  }, [productId, cartItems]);

  const handleClick = (product) => {
    if (isInCart) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const handleReviewClick = (productId) => {
    navigate`(/reviews/${productId});`
  };

  const updateItemQuantity = (productId, quantity) => {
    // Implement logic to update item quantity in the cart
  };

  return (
    <CartProvider>
      <div className="product-details-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-details">
          <h3 className="product-title">{product.name}</h3>
          <div className="product-category">Category: {product.category}</div>
          <div className="product-price">KES{product.price}</div>
          <div className="product-stock">
            stock available: {product.quantity_available}
          </div>
          <div className="product-description">
            Description: {product.description}
          </div>
          <div
            className="review-stats"
            onClick={() => handleReviewClick(product.id)}
          >
            <ReactStars
              count={5}
              size={24}
              color2={"#ffd700"}
              value={reviewStats.averageRating}
              edit={false}
            />
            <p>{reviewStats.totalReviews} reviews</p>
          </div>
          <div className="button-container">
            <div className="btn-cart">
              <button
                className={isInCart ? "btn btn-danger" : "btn btn-success"}
                onClick={() => handleClick(product)}
              >
                {isInCart ? "Remove from cart" : "Add to cart"}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  updateItemQuantity(productId, product.quantity - 1)
                }
              >
                -
              </button>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  updateItemQuantity(productId, product.quantity + 1)
                }
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

export default ProductDetails;