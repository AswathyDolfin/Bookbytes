import { useContext } from "react"
import { myContext } from "./context"
import { useParams } from "react-router-dom"
import { BsFillCartFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import axios from 'axios';
import '../Style/Featured.css'
import'../Style/Cb.css'
import Nav from "./nav"
import { useNavigate } from "react-router-dom";
function Es() {
    const { products } = useContext(myContext)
    const [likedProducts, setLikedProducts] = useState([]);

    const userId = localStorage.getItem("userID");
    const { author } = useParams()
    const nav = useNavigate();
    const HandleDisplay = (id) => {
      nav(`/dis/${id}`)
    }
    const authorProd = products.filter(item => item.author === "ELIF SHAFAK")

    console.log("prod", authorProd, author);
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
        <Nav/>
        <div className="cb1">
            <h1 className="cb2">ELIF SHAFAK</h1>
            <img className="cb3" width={250} height={250}src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Elif_Shafak_photo.jpg/330px-Elif_Shafak_photo.jpg"  />
        <h4 className="cb4">
        Elif Shafak FRSL (Tborn 25 October 1971) 
        is a Turkish-British novelist, essayist, public speaker, political scientist and activist.
        </h4>
        </div>
       < h1 className="cb2" >BOOKS</h1>
    <div className="d11">
        {authorProd.map((prod) => (
          <div className="d33">
            <img width={250} height={250} src={prod.image} alt="img"onClick={() => HandleDisplay(prod._id)}/>
            <h3 className="d22">{prod.name}</h3>
            <h3 className="d22">{prod.author}</h3>
            <h3 className="d22"><i>Rs.</i>{prod.price}</h3>
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
export default Es