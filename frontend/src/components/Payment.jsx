import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userID");
 
  useEffect(() => {
    const storedTotal = localStorage.getItem('totalPrice');
    if (storedTotal) {
      setTotal(parseFloat(storedTotal));
    } else {
      navigate('/pay');
    }
  }, [navigate]);


  useEffect(() => {
    if (state && state.totalAmount) {
      setTotal(state.totalAmount); // Set total from state
    } else {
      navigate('/pay'); // Fallback in case the total is not passed
    }
  }, [navigate, state]);

  const handlePayment = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/user/addOrder", {
        userId,
        totalAmount: total,
      });

      console.log("Response from server:", response.data);

      alert("Payment successful and order created!");
      navigate("/");
    } catch (error) {
      console.error("Payment failed:", error.response ? error.response.data : error.message);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2>Payment Details</h2>
      </div>
      <form onSubmit={handlePayment}>
        <div style={{ marginBottom: '20px' }}>
          <label>Select Payment Method:</label><br /><br />
          <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
            <button
              type="button"
              style={{
                padding: '10px',
                backgroundColor: paymentMethod === 'cashOnDelivery' ? '#ddd' : '#fff',
                border: '1px solid #ccc',
                width:'600px'
              }}
              onClick={() => setPaymentMethod('cashOnDelivery')}
            >
              Cash on Delivery
            </button>
            <br />
            <button
              type="button"
              style={{
                padding: '10px',
                backgroundColor: paymentMethod === 'upi' ? '#ddd' : '#fff',
                border: '1px solid #ccc',
              }}
              onClick={() => setPaymentMethod('upi')}
            >
              Pay with UPI
            </button>
            <br />
            <button
              type="button"
              style={{
                padding: '10px',
                backgroundColor: paymentMethod === 'creditCard' ? '#ddd' : '#fff',
                border: '1px solid #ccc',
              }}
              onClick={() => setPaymentMethod('creditCard')}
            >
              Credit/Debit Card
            </button>
            <br />
            <button
              type="button"
              style={{
                padding: '10px',
                backgroundColor: paymentMethod === 'netBanking' ? '#ddd' : '#fff',
                border: '1px solid #ccc',
              }}
              onClick={() => setPaymentMethod('netBanking')}
            >
              Net Banking
            </button>
          </div>
        </div>
        {paymentMethod === 'upi' && (
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="upiId">UPI ID:</label>
            <input type="text" id="upiId" required style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
          </div>
        )}
        {paymentMethod === 'creditCard' && (
          <>
            <div style={{ marginBottom: '20px' }}>
              <label className="cardName">Name on Card:</label>
              <input type="text" id="cardName" required style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="cardNumber">Card Number:</label>
              <input type="text" id="cardNumber" required style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="expiryDate">Expiry Date:</label>
              <input type="text" id="expiryDate" placeholder="MM/YY" required style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="cvv">CVV:</label>
              <input type="text" id="cvv" required style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
            </div>
          </>
        )}
        <div style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
          <p>Total: ₹{total}</p>
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Pay Now</button>
        <Link to="/crt">
          <button type="button" style={{ padding: '10px 20px', backgroundColor: '#f44336', color: '#fff', border: 'none', cursor: 'pointer' }}>Back to Cart</button>
        </Link>
      </form>
    </div>
  );
};

export default Payment;