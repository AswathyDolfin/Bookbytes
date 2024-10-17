import axios from 'axios';
import { useState, useEffect } from 'react';
import { BsFillCartFill } from "react-icons/bs";
import bookBYTES from "../components/Pics/bookBYTES.png";
import { FaHome } from "react-icons/fa";
import { FaHeart } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { IoIosRemoveCircle } from "react-icons/io";
import '../Style/Display.css';

function Like() {
  const nav = useNavigate();

  const cart = () => {
    nav("/crt");
  };

  const home = () => {
    nav("/");
  };

  const [like, setLike] = useState([]);
  const [cartedProducts, setCartedProducts] = useState([])
  const token = localStorage.getItem("authToken")
  const userId = localStorage.getItem("userID");

  useEffect(() => {
    displayLike();
  }, []);

  const displayLike = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/getlike", { userId });
      setLike(response.data.userLike || []);
    } catch (error) {
      console.error("Error fetching liked items:", error);
    }
  };

  const handeladdtolike = async (product) => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/like", { product, userId });
      console.log("Response data:", response.data);
      alert("Item added to liked successfully!");
      displayLike();
    } catch (error) {
      console.error("Error adding item to liked:", error);
      alert("Error adding item to liked. Please try again.");
    }
  };

  const handelRemoveFromLike = async (productId) => {
    if (!token) {
      alert('Please login first before adding items.');
      nav('/');
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/user/unlike", { productId, userId });
      console.log("Response data:", response.data);
      alert("Item removed from liked successfully!");
      displayLike();
    } catch (error) {
      console.error("Error removing item from liked:", error);
      alert("Error removing item from liked. Please try again.");
    }
  };

  const isLiked = (productId) => {
    return like.some(item => item.product._id === productId);
  };

  const handelAddtoCart = async (product) => {
    try {
      await axios.post("http://localhost:5000/api/user/crt", {
        product, userId
      });
      setCartedProducts([...cartedProducts, product._id])
      alert("Item added to cart successfully!");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Item is already in the cart');
      } else {
        console.error("Error adding item to cart:", error);
        alert("Error adding item to cart. Please try again.");
      }
    };
  }


  return (
    <div>
      <div className="topnav">
        <div><img className='logo' src={bookBYTES} alt="logo" /></div>
        <h1 className='head'>WISHLIST</h1>
        <div className='topnavicons'>
          <button className='ccc' onClick={cart}><BsFillCartFill /></button>
          <button className='logiii' onClick={home}><FaHome /></button>
        </div>
      </div>
      <div style={{ height: "120px" }}></div>
      <br /><br />
      <div className='d11'>
        {
          like.length === 0 ? (
            <div className='empty'>
              <br />
              <h1>YOUR WISHLIST IS EMPTY!</h1>
              <br />
              <p>Add books to your wishlist to see them here.</p>
              <img style={{ height: "240px", width: "270px" }} src="https://img.freepik.com/free-vector/heart_53876-25531.jpg?size=626&ext=jpg&ga=GA1.1.217980272.1706538922&semt=sph" alt="empty wishlist" />
            </div>
          ) : (
            like.filter(item => item.product !== null).map((item, index) => (
              <div className="d33" key={`${item.product._id}-${index}`}>
                <img width={250} height={250} src={item.product.image} alt={item.product.name} />
                <h3 className="d22">{item.product.name}</h3>
                <h3 className="d22">{item.product.author}</h3>
                <h3 className="d22"><i>Rs.</i>{item.product.price}</h3>
                {
                  isLiked(item.product._id) ? (
                    <button className='likee' onClick={() => handelRemoveFromLike(item.product._id)}><IoIosRemoveCircle style={{ color: "red" }} /></button>
                  ) : (
                    <button className='likee' onClick={() => handeladdtolike(item.product)}><FaHeart style={{ color: "black" }} /></button>
                  )
                }
                <button className='cartt' onClick={() => handelAddtoCart(item.product)}>
                  <BsFillCartFill style={{ color: "black" }} />
                </button>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
}

export default Like;
