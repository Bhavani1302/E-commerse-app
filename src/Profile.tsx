import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Layout from './Layout';

const Profile = () => {
  const navigate = useNavigate(); 

  
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  
  useEffect(() => {
    const savedOrderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    if (savedOrderHistory.length > 0) {
      setOrderHistory(savedOrderHistory); 
    } else {
      
      setOrderHistory([
        { product: 'Mens Casual Premium Slim Fit T-Shirts', deliveryStatus: 'Delivered' },
        { product: 'ACER Laptop', deliveryStatus: 'Delivered' },
        { product: 'BOAT Headphones', deliveryStatus: 'Ready to Ship' },
      ]);
    }
  }, []);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(user));
    alert('Profile updated!');
    navigate('/products'); 
  };

  
  const handleOrderHistoryClick = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">User Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)} 
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Back
            </button>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleOrderHistoryClick}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                View Order History
              </button>
            </div>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4 ml-20">Order History</h3>
            {orderHistory.length > 0 ? (
              <ul className="space-y-4">
                {orderHistory.map((order, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-gray-800 font-semibold">{order.product}</span>
                    <span className={`text-sm ${order.deliveryStatus === 'Delivered' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {order.deliveryStatus}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No orders found. Make your first order!</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
