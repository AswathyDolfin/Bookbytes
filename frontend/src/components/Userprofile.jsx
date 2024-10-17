import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Style/Profile.css';

const UserProfile = () => {
  const [cart, setCart] = useState([]);
  const [like, setLike] = useState([]);
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [activeTab, setActiveTab] = useState('cart');
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userID");
  const nav = useNavigate();

  useEffect(() => {
    if (!token) {
      nav('/log');
      return;
    }


    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5000/api/user/getUser`, {
          params: { userId }
        });
        const user = userResponse.data.find(u => u._id === userId);
        setUsername(user.name);
        setEmail(user.email);
        setPassword(user.password);

        setFormData({
          username: user.name,
          email: user.email,
          password: user.password
        });

        const cartResponse = await axios.post("http://localhost:5000/api/user/getcart", { userId });
        setCart(cartResponse.data.userCart || []);
        console.log("cartResppons", cartResponse.data);


        const likeResponse = await axios.post("http://localhost:5000/api/user/getlike", { userId });
        setLike(likeResponse.data.userLike || []);

        console.log("like res", likeResponse.data);


        const ordersResponse = await axios.post(`http://localhost:5000/api/user/getOrders`, { userId });
        setOrders(ordersResponse.data.orders || []);
        console.log("order res", ordersResponse.data);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId, token, nav]);

  const handleEditClick = () => {
    if (window.confirm("Are you sure you want to edit your details?")) {
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/updateUser`, {
        userId, email,
        ...formData
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setUsername(formData.username);
        setEmail(formData.email);
        setPassword(formData.password);
        setIsEditing(false);
      } else {
        console.error('Failed to update user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      username,
      email,
      password,
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="profile">
      <h1>User Profile</h1>
      <div className="profile-details">
        {isEditing ? (
          <div>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            <div>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <h3>USERNAME: {username}</h3>
            <h3>EMAIL: {email}</h3>
          </div>
        )}
      </div>

      <div className="profile-tabs">
        <button onClick={() => handleTabChange('cart')} className={activeTab === 'cart' ? 'profile active' : 'profile'}>Cart</button>
        <button onClick={() => handleTabChange('like')} className={activeTab === 'like' ? 'profile active' : 'profile'}>Liked Items</button>
        <button onClick={() => handleTabChange('orders')} className={activeTab === 'orders' ? 'profile active' : 'profile'}>Orders</button>
      </div>

      {activeTab === 'cart' && (
        <div className="profile-cart">
          <h2>CART ITEMS</h2>
          {cart && cart.length > 0 ? (
            <ul>
              {cart.map(item => (
                <li key={item.product._id} className="profile-cart-item">
                  <div>
                    <h5>{item.product.name}</h5>
                    <h4>Rs.{item.product.price}</h4>
                    <img width={250} height={250} src={item.product.image} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in cart.</p>
          )}
        </div>
      )}

      {activeTab === 'like' && (
        <div className="profile-like">
          <h2>LIKED ITEMS</h2>
          {like && like.length > 0 ? (
            <ul>
              {like.map(item => (
                <li key={item.product._id} className="profile-like-item">
                  <div>
                    <h5>{item.product.name}</h5>
                    <h4>Rs.{item.product.price}</h4>
                    <img width={250} height={250} src={item.product.image} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No liked items.</p>
          )}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="profile-orders">
          <h2>ORDERS</h2>
          {orders && orders.length > 0 ? (
            <ul>
              {orders.map((order, index) => (
                <li key={index} className="profile-orders-item">

                  <h5>Order Date: {formatDate(order.orderDate)}</h5>
                  <ul className="profile-order-details">
                    {order.products.map((item, idx) => (
                      <li key={idx}>
                        <div>
                          <p>Name: {item.product.name}</p>
                          <p>Price: Rs.{item.product.price}</p>
                          <img width={50} height={50} src={item.product.image} />
                          <p>Estimated Arrival Date: {formatDate(item.arrivalDate)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <h4>Total Amount: ${order.totalAmount}</h4>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders placed.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;

