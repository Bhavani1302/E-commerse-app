import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './Pages/Cart';
import OnlinePayment from './Payment/OnlinePayment';
import Login from './Pages/Login';
import Products from './Pages/Products';
import CashOnDelivery from './Payment/CashOnDelivery';
import Profile from './Profile';
import GoogleLoginButton from './Googleauthentication/GoogleLoginButton'; 
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('your-publishable-key-here');

function App() {
  return (
    <Router>
      <Elements stripe={stripePromise}>
        <Routes>
         
          <Route path="/" element={<Login />} />
          <Route path="/google-login" element={<GoogleLoginButton />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/online-payment" element={<OnlinePayment />} />
          <Route path="/cash-on-delivery" element={<CashOnDelivery />} />
          <Route path="/products" element={<Products />} />

         
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Elements>
    </Router>
  );
}

export default App;
