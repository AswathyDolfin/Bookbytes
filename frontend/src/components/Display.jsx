import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { myContext } from "./context";
import { useNavigate } from 'react-router-dom';
import { BsFillCartFill } from "react-icons/bs";
import { FaHeart, FaHome } from "react-icons/fa";
import bookBYTES from "../components/Pics/bookBYTES.png";
import '../Style/Display.css';

function Dspy() {
  const { products } = useContext(myContext);
  const [search, setSearch] = useState("");
  const [likedProducts, setLikedProducts] = useState([]);
  const[cartedProducts,setCartedProducts]=useState([])
  const token = localStorage.getItem("authToken")
  const userId = localStorage.getItem("userID");

  const nav = useNavigate();

  const cart = () => {
    nav("/crt");
  };

  const lik = () => {
    nav("/lk");
  };

  const home = () => {
    nav("/");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.author.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchLikedStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
        const user = response.data;
        setLikedProducts(user?.like?.map(likedProduct => likedProduct.product._id)||[]);
      } catch (error) {
        console.error("Error fetching user liked status:", error);
      }
    };
    fetchLikedStatus();
  }, [userId]);
  useEffect(() => {
    const fetchCartedStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
        const user = response.data;
        setCartedProducts(user?.cart?.map(cartedProduct => cartedProduct.product._id)||[]);
      } catch (error) {
        console.error("Error fetching user cart status:", error);
      }
    };
    fetchCartedStatus();
  }, [userId]);
  const handelAddtoLike = async (product) => {
    if (!token) {
      alert('Please login first before adding items.');
      nav('/');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/user/like', {
        userId,
        product,
      });
      setLikedProducts([...likedProducts, product._id]);
      alert('Item added successfully!');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Item is already in the Wishlist');
      } else {
        console.error('Error adding item to wishlist:', error);
        alert('Error adding item to wishlist. Please try again.');
      }
    }
  };
  const HandleDisplay = (id) => {
    nav(`/dis/${id}`)
  }
  const  handeladdtocart = async (product) => {
    if (!token) {
      alert('Please login first before adding items.');
      nav('/');
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/user/crt", { 
      product, userId });
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

  const isLiked = (productId) => {
    return likedProducts.includes(productId);
  };

  return (
    <div>
      <div className="topnav">
        <div>
          <img className='logo' src={bookBYTES} alt="logo" />
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="icon">
          <button className='cartt' onClick={cart}><BsFillCartFill /></button>
          <button className='likee' onClick={lik}><FaHeart /></button>
          <button className='homee' onClick={home}><FaHome /></button>
        </div>
      </div>
      <div style={{ height: "200px" }}></div>
      <div className="d11">
        {filteredProducts.map((product) =>
          <div className="d33" key={product._id}>
            <img style={{cursor:"pointer"}}
            width={250} height={250} src={product.image} alt="img"  onClick={() => HandleDisplay(product._id)} />
            <h3 className="d22">{product.name}</h3>
            <h3 className="d22">{product.author}</h3>
            <h3 className="d22"><i>Rs.</i>{product.price}</h3>
            <div className="lc">
              <button className='likee' onClick={() => handelAddtoLike(product)}>
                <FaHeart style={{ color: "black" }} /></button>
              
              <button className='cartt' onClick={() => handeladdtocart(product)}>
                <BsFillCartFill style={{ color: "black" }} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dspy;

