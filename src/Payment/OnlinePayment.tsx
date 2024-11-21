import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Layout from '../Layout';

const OnlinePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberModalOpen, setIsPhoneNumberModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showHurrayModal, setShowHurrayModal] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { totalAmount } = location.state || {};  

  useEffect(() => {
    if (!totalAmount) {
      navigate('/cart'); 
    }
  }, [totalAmount, navigate]);

  const handleStripeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!isCardComplete) {
      setErrorMessage("Please fill in the card details.");
      return;
    }

    if (!cardElement) {
      setErrorMessage("Card details are missing.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      const response = await fetch('/create-payment-intent', {
        method: 'POST',
      });
      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setErrorMessage(error.message || 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        alert('Payment Successful!');
        navigate('/success');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardChange = (event: any) => {
    setIsCardComplete(event.complete);
  };

  const handleThirdPartyPayment = (paymentMethod: string) => {
    setSelectedPaymentMethod(paymentMethod);
    setIsPhoneNumberModalOpen(true);
  };

  const handlePhoneNumberSubmit = () => {
    if (phoneNumber.length !== 10 || isNaN(Number(phoneNumber))) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    alert(`Payment via ${selectedPaymentMethod} successful!`);
    setPaymentSuccess(true);
    setIsPhoneNumberModalOpen(false);
    setShowHurrayModal(true);
  };

  const handleHurrayModalClose = () => {
    setShowHurrayModal(false);
    navigate('/products');
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  return (
    <Layout>
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">Online Payment</h1>

        {/* Display the total amount */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">Total Amount: ${totalAmount}</h2>
        </div>

        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleStripeSubmit}>
            <div className="mb-4">
              <label className="text-lg font-medium text-gray-700">Credit or Debit Card</label>
              <div className="mt-2">
                <CardElement className="p-2 border border-gray-300 rounded-md" onChange={handleCardChange} />
              </div>
            </div>

            {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

            <button
              type="submit"
              className={`w-full py-2 px-4 text-white font-semibold rounded-md ${isProcessing ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Pay Now (Stripe)'}
            </button>
          </form>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Or Pay with:</h3>

            <button
              onClick={() => handleThirdPartyPayment('Google Pay')}
              className="w-full py-2 px-4 text-white font-semibold rounded-md bg-[#4285F4] hover:bg-[#357ae8]"
            >
              Google Pay
            </button>

            <button
              onClick={() => handleThirdPartyPayment('PhonePe')}
              className="w-full py-2 px-4 text-white font-semibold rounded-md bg-[#2196F3] hover:bg-[#1e88e5]"
            >
              PhonePe
            </button>

            <button
              onClick={() => handleThirdPartyPayment('Paytm')}
              className="w-full py-2 px-4 text-white font-semibold rounded-md bg-[#e41d37] hover:bg-[#d41b31]"
            >
              Paytm
            </button>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleBackToCart}
              className="w-50 py-2 px-4 text-white font-semibold rounded-md bg-gray-500 hover:bg-gray-600"
            >
              Back to Cart
            </button>
          </div>
        </div>

        {/* Phone Number Modal */}
        {isPhoneNumberModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h3 className="text-xl font-semibold text-center mb-4">Enter Your Phone Number</h3>
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <div className="flex justify-between">
                <button
                  onClick={handlePhoneNumberSubmit}
                  className="py-2 px-4 text-white font-semibold rounded-md bg-blue-500 hover:bg-blue-600"
                >
                  Check out
                </button>
                <button
                  onClick={() => setIsPhoneNumberModalOpen(false)}
                  className="py-2 px-4 text-white font-semibold rounded-md bg-gray-500 hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hurray Modal */}
        {showHurrayModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h3 className="text-2xl font-semibold text-center mb-4">Hurray! Payment Successful!</h3>
              <button
                onClick={handleHurrayModalClose}
                className="py-2 px-4 text-white font-semibold rounded-md bg-green-500 hover:bg-green-600"
              >
                Go to Products
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OnlinePayment;
