import React, { createContext, useContext, useState, useEffect } from 'react';
import styles from '../CartButton/Cart.module.scss';

// Create Context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Create Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

// Cart Component
const Cart = () => {
  const { cart, addToCart, removeFromCart, total } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [productIndex, setProductIndex] = useState(null);

  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Headphones', price: 99 },
    { id: 3, name: 'Mouse', price: 29 },
  ];

  // useEffect to find index of a specific product in the cart, for example purposes
  useEffect(() => {
    const index = cart.findIndex(item => item.id === 1); // finding the index of the product with id 1
    setProductIndex(index);
  }, [cart]);

  return (
    <div className={styles.Carts}>
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
            Total: ${total}
          </div>
        </div>
      )}

      {/* Optional: Displaying the found index */}
      <div>
        {productIndex !== -1 && productIndex !== null && (
          <p>Index of product with ID 1 in cart: {productIndex}</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
