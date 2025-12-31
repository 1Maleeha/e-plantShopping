import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.substring(1)) * item.quantity;
  };
  
  const calculateTotalAmount = () => {
        return cart.reduce((total, item) => total + parseFloat(item.cost.substring(1)) * item.quantity, 0);
      };
      

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>{item.cost}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="subtotal">Subtotal: ${calculateTotalCost(item)}</div>
                <button className="delete-button" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))}
          <div className="cart-footer">
            <h2>Total: ${calculateTotalAmount()}</h2>
            <button className="continue-button" onClick={handleContinueShopping}>Continue Shopping</button>
            <button className="checkout-button" onClick={handleCheckoutShopping}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
