import styles from '../CartButton/Cart.module.scss';
import React, { useState } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Headphones', price: 99 },
    { id: 3, name: 'Mouse', price: 29 },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

    return (

        <div className="p-4">
      <button 
        className="bg-blue-500 text-white p-2 rounded mb-4"
        onClick={() => setShowCart(!showCart)}
      >
        Cart ({cart.length})
      </button>

      <div className="grid gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button 
              onClick={() => addToCart(product)}
              className="bg-green-500 text-white p-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {showCart && (
        <div className="mt-4 border p-4">
          <h2>Cart Items:</h2>
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <span>{item.name} - ${item.price}</span>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 font-bold">
            Total: ${cart.reduce((sum, item) => sum + item.price, 0)}
          </div>
        </div>
      )}
    </div>
    )
}

Cart()