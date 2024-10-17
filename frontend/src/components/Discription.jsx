import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BsFillCartFill } from "react-icons/bs";
import { FaHeart, FaHome } from "react-icons/fa";
import bookBYTES from "../components/Pics/bookBYTES.png";
import '../Style/Display.css';
import { myContext } from "./context";
import { Link } from "react-router-dom";
import { MdPersonPin } from "react-icons/md";
function Dis() {
    const { id } = useParams(); // Get the productId from URL
    const { products } = useContext(myContext);
    const [likedProducts, setLikedProducts] = useState([]);
    const [cartedProducts, setCartedProducts] = useState([]);
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userID");
    const nav = useNavigate();
    const product = products.find((product) => product._id === id);
    const cart = () => {
        nav("/crt");
    };

    const lik = () => {
        nav("/lk");
    };

    const home = () => {
        nav("/");
    };

    useEffect(() => {
        const fetchLikedStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
                const user = response.data;
                setLikedProducts(user?.like?.map(likedProduct => likedProduct.product._id) || []);
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
                setCartedProducts(user?.cart?.map(cartedProduct => cartedProduct.product._id) || []);
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

    const handeladdtocart = async (product) => {
        if (!token) {
            alert('Please login first before adding items.');
            nav('/');
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/user/crt", {
                product, userId
            });
            setCartedProducts([...cartedProducts, product._id]);
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
                <div>
                    <img className='logo' src={bookBYTES} alt="logo" />
                </div>
                <div className="icons">
                    <button className='cartt' onClick={cart}><BsFillCartFill /></button>
                    <button className='likee' onClick={lik}><FaHeart /></button>
                    <button className='homee' onClick={home}><FaHome /></button>
                </div>
            </div>
            <div style={{ height: "200px" }}></div>
            <div className="d3s">
                <div className="imgs">
                    <img style={{ cursor: "pointer" }}
                        width={350} height={350} src={product.image} alt="img" />
                </div>
                <div className="d1s" >
                    <h3 style={{ fontSize: "35px" }}>{product.name}</h3>
                    <h3 >AUTHOR:{product.author}</h3>
                    <h3 >{product.dis}</h3>
                    <h3>PRICE:<i>Rs.</i>{product.price}</h3>
                    <div className="lcS">
                        <button className='likee' onClick={() => handelAddtoLike(product)}>
                            <FaHeart style={{ color: "black" }} /></button>

                        <button className='cartt' onClick={() => handeladdtocart(product)}>
                            <BsFillCartFill style={{ color: "black" }} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dis;
