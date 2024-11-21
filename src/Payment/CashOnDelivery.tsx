import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../Layout';

const CashOnDelivery = () => {
  const location = useLocation();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState(''); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const totalAmount = location.state?.totalAmount || 0;
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!deliveryAddress || !mobileNumber) {
      alert('Please enter both your delivery address and mobile number.');
      return;
    }

    setIsModalOpen(true); 
  };

  const handleCancel = () => {
    navigate('/cart');
  };

  const handleModalClose = () => {
    setIsModalOpen(false); 
    navigate('/products'); 
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-semibold text-center mb-6">Cash on Delivery</h1>

          <div className="space-y-4">
            <p className="text-xl font-semibold">Total Amount: ${totalAmount}</p>
          </div>

          {/* Delivery Address Section */}
          <div className="mt-6">
            <label htmlFor="address" className="block text-lg">Delivery Address</label>
            <textarea
              id="address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Enter your delivery address here"
            />
          </div>

          {/* Mobile Number Section */}
          <div className="mt-6">
            <label htmlFor="mobileNumber" className="block text-lg">Mobile Number</label>
            <input
              type="text"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your mobile number"
            />
          </div>

          {/* Checkout and Cancel Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleCheckout}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-2xl font-semibold mb-4">Hurray! Your order is placed.</h2>
            <button
              onClick={handleModalClose}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CashOnDelivery;
