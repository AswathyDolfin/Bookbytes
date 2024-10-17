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
function Jk() {
    const { products } = useContext(myContext)
    const [likedProducts, setLikedProducts] = useState([]);

    const userId = localStorage.getItem("userID");
    const { author } = useParams()

    const authorProd = products.filter(item => item.author === "J.K ROWLING")

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
    const nav = useNavigate();
    const HandleDisplay = (id) => {
      nav(`/dis/${id}`)
    }
  return (
    <div>
        <Nav/>
        <div className="cb1">
            <h1 className="cb2">J. K. ROWLING</h1>
            <img className="cb3" width={250} height={250}src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/J._K._Rowling_2010.jpg/330px-J._K._Rowling_2010.jpg"  />
        <h4 className="cb4">
        Joanne Rowling CH OBE FRSL (born 31 July 1965), known by her pen name J. K. Rowling, is a British author and philanthropist. 
        She wrote Harry Potter, a seven-volume fantasy series published from 1997 to 2007.
         The series has sold over 600 million copies, been translated into 84 languages, and spawned a global media franchise including films and video games.
          The Casual Vacancy was her first novel for adults. 
        She writes Cormoran Strike, an ongoing crime fiction series, under the alias Robert Galbraith.
       </h4>
        </div>
       < h1 className="cb2" >BOOKS</h1>
    <div className="d11">
        {authorProd.map((prod) => (
          <div className="d33">
            <img width={250} height={250} src={prod.image} alt="img" onClick={() => HandleDisplay(prod._id)}/>
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
export default Jk