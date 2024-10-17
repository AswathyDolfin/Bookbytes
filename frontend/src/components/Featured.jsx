import { useContext } from "react"
import { myContext } from "./context"
import { useParams } from "react-router-dom"
import { BsFillCartFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import axios from 'axios';
import '../Style/Featured.css'
import { useNavigate } from "react-router-dom";
function Featuredproducts() {
    const { products } = useContext(myContext)

    const { featured } = useParams()
    const [likedProducts, setLikedProducts] = useState([]);

    const userId = localStorage.getItem("userID");
    const featuredProd = products.filter(item => item.featured === "yes")

    console.log("prod", featuredProd, featured);
    const nav = useNavigate();
    const HandleDisplay = (id) => {
      nav(`/dis/${id}`)
    }
    const handelAddtoLike = async (product) => {
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
    const handelAddtoCart = async (product) => {
      try {
        await axios.post(
          "http://localhost:5000/api/user/crt",
          { product, userId }
        );
        alert("Item added successfully!");
      } catch (error) {
        console.error("Error adding item to cart:", error);
        alert("Please login before adding books to cart.");
      }
    };
  return (
    <div>
    <div className="d1">
        
        {featuredProd.map((prod) => (
          <div className="d3">
            <img width={250} height={250} src={prod.image} alt="img" onClick={() => HandleDisplay(prod._id)}/>
            <h3 className="d2">{prod.name}</h3>
            <h3 className="d2">{prod.author}</h3>
            <h3 className="d2">{prod.genre}</h3>
            <div className="lc">
              <button className='likee' onClick={() => handelAddtoLike(prod)}>
                <FaHeart style={{ color: "black" }} /></button>
              
              <button className='cartt' onClick={() => handelAddtoCart(prod)}>
                <BsFillCartFill style={{ color: "black" }} />
              </button>
            </div>
            </div>
        ))}
    </div>
    </div>
  )
}
export default Featuredproducts
