import React from "react";
import { useCart } from "react-use-cart";

const Cart = () => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  if (isEmpty) return <h1 className="cart-empty">Your Cart is Empty</h1>;

  return (
    <section >
      <div className="cart-section">
        <div>
          <h5>Cart ({totalUniqueItems}) total Items: ({totalItems})</h5>
          <table>
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img  className ="cart-image"src={item.image} alt={item.title} style={{ height: '10rem' }} />
                    </td>
                    <td>{item.title}</td>
                      <td>{item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                      <td>Quantity ({item.quantity})</td>
                    <td >
                      <button className="btn btn-outline-danger"
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        >-</button>
                      <button className="btn btn-outline-success"
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        >+</button>
                      <button className="btn btn-success"
                        onClick={() => removeItem(item.id)}
                        >Remove Item</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <h2>Total Price: {cartTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>
        </div>
        <div className="cart-below">
          <button className="btn btn-success"
            onClick={() => window.confirm("Are you sure you want to clear the cart?") && emptyCart()}
          >Clear Cart</button>
          <button className="btn btn-success">Proceede to checkout</button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
