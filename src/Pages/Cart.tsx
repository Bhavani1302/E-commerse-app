import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState<any[]>([]);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('authToken') !== null; 

  const handleGoBack = () => {
    navigate('/products'); 
  };

  const handleIncreaseQuantity = (id: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
      return updatedCart;
    });
  };

  const handleDecreaseQuantity = (id: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return updatedCart;
    });
  };

  const handleRemoveItem = (id: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity || 1), 0);
  };

  useEffect(() => {
    if (isLoggedIn) {
     
      localStorage.removeItem('cart');
      setCart([]);  
    } else {
      
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        setCart([]);  
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const handleOnlinePayment = () => {
    const totalAmount = calculateTotal();
    navigate('/online-payment', { state: { totalAmount } }); 
  };

  const handleCashOnDelivery = () => {
    const totalAmount = calculateTotal();
    navigate('/cash-on-delivery', { state: { totalAmount } });
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col justify-between bg-gray-100">
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg mx-auto mb-6 mt-5">
          <h1 className="text-3xl font-semibold text-center mb-6">Your Cart</h1>
          {cart.length === 0 ? (
            <p className="text-center text-lg text-gray-500">Your cart is empty ...</p>
          ) : (
            <div>
              {cart.map((item: any) => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center space-x-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-32 object-cover rounded-md shadow-sm"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-xl font-bold text-gray-700 mt-2">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="text-lg px-2 py-1 bg-gray-300 rounded-full hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold text-gray-800">{item.quantity || 1}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="text-lg px-2 py-1 bg-gray-300 rounded-full hover:bg-gray-400"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="ml-4 text-red-500 text-xl hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-end mt-6">
                <p className="text-xl font-semibold mr-4">Total:</p>
                <p className="text-xl font-semibold">${calculateTotal().toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
        <BackToPurchaseButton onGoBack={handleGoBack} />
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg mx-auto">
          <div className="flex justify-between mt-6">
            <button
              onClick={handleOnlinePayment}
              className="w-1/3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Online Payment
            </button>
            <button
              onClick={handleCashOnDelivery}
              className="w-1/3 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const BackToPurchaseButton = ({ onGoBack }: { onGoBack: () => void }) => (
  <div className="w-full flex justify-center mt-6 mb-4">
    <button
      onClick={onGoBack}
      className="px-3 py-1 w-50 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition transform hover:scale-105 hover:shadow-lg"
    >
      Back to Purchase
    </button>
  </div>
);

export default Cart;
