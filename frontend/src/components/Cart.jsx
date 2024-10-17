import { useEffect, useState } from "react"
import axios from 'axios'
import { FaHeart, FaHome } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import bookBYTES from "../components/Pics/bookBYTES.png"
import { IoIosRemoveCircle } from "react-icons/io";
import { BsFillCartFill } from "react-icons/bs";
function Cart() {
  const nav = useNavigate()
  function lik() {
    nav("/lk")
  }
  function home() {
    nav("/")
  }

  const [NewProdname, setNewProdName] = useState("")
  const [Newprice, setNewPrice] = useState("")
  const [cart, setCart] = useState([])
  const [like, setLike] = useState([])
  const [likedProducts, setLikedProducts] = useState([])
  const userId = localStorage.getItem("userID")

  useEffect(() => {
    displayCart()
  }, [])
  const displayCart = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/getcart", { userId });
      const updatedCart = response.data.userCart.map(item => ({
        ...item,
        quantity: 1 // Initialize quantity to 1 for each product
      }));
      setCart(updatedCart || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

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
        //console.error('Error adding item to wishlist:', error);
        //alert('Error adding item to wishlist. Please try again.');
      }
    }
  };

  const handeladdtocart = async (product) => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/crt", { product, userId });
      console.log("Response data:", response.data);
      alert("Item added to cart successfully!");
      displayCart();
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Error adding item to cart. Please try again.");
    }
  };
  const handelRemoveFromLike = async (productId) => {
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
  const handelRemoveFromCart = async (productId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/uncart", { productId, userId });
      console.log("Response data:", response.data);
      alert("Item removed from cart successfully!");
      displayCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Error removing item from cart. Please try again.");
    }
  };

  const isCarted = (productId) => {
    return cart.some(item => item.product._id === productId);
  };
  console.log("cart", cart);

  const increaseQuantity = (productId) => {
    setCart(cart.map(item =>
      item.product._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (productId) => {
    setCart(cart.map(item =>
      item.product._id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const calculateProductTotal = (item) => {
    return item.product.price * item.quantity;
  };
  const calculateTotalAmount = () => {
    return cart.reduce((acc, item) => acc + calculateProductTotal(item), 0);
  };

  const Payment = () => {
    const totalAmount = calculateTotalAmount();
    nav("/pay", { state: { totalAmount } }); // Pass totalAmount to Payment component
  };
  return (
    <div>
      <div class="topnav">
        <div ><img className='logo' src={bookBYTES} alt="logo" /></div>
        <h1 className='head'>CART</h1>
        <div className='topnavicons'>
          <button className='ccc' onClick={lik}><FaHeart /></button>
          <button className='logiii' onClick={home}><FaHome /></button>
        </div>
      </div>
      <div style={{ height: "120px" }}></div>
      <br /> <br />
      <div className='d11'>
        {
          cart.length === 0 ? (
            <div className='emptyy'>
              <br />
              <h1>YOUR CART IS EMPTY!</h1> <br />
              <p>Looks like you haven't added anything to your cart.</p>
              <img style={{ height: "240px", width: "270px" }} src="https://i.pinimg.com/564x/92/8b/b3/928bb331a32654ba76a4fc84386f3851.jpg" alt="" />
            </div>
          ) : (
            cart.filter(item => item.product !== null).map((item, index) => (
              <div className="d33" key={`${item.product._id}-${index}`}>
                <img width={250} height={250} src={item.product.image} />
                <h3 className="d22">{item.product.name}</h3>
                <h3 className="d22">Rs.  {calculateProductTotal(item)}</h3>
                <div>
                  <button className='quantity-btn' onClick={() => decreaseQuantity(item.product._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button className='quantity-btn' onClick={() => increaseQuantity(item.product._id)}>+</button>
                </div>
                {
                  isCarted(item.product._id) ? (
                    <button className='cartt' onClick={() => handelRemoveFromCart(item.product._id)}> <IoIosRemoveCircle style={{ color: "red" }} /></button>
                  ) : (
                    <button className='cartt' onClick={() => handeladdtocart(item.product)}> <BsFillCartFill
                      style={{ color: "black" }} /></button>
                  )
                }
                <button className='likee' onClick={() => handeladdtolike(item.product)}>
                  <FaHeart style={{ color: "black" }} />
                </button>
              </div>
            ))
          )
        }

      </div>
      {cart.length > 0 && (
        <div className="total-amount" style={{ width: "100%", textAlign: "center" }}>
          <h2>Total Amount: Rs. {calculateTotalAmount()}</h2>
          <button style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer', marginRight: '10px' }} onClick={Payment}>CHECK OUT</button>
        </div>
      )}
      <br /><br /><br /><br />
    </div>


  )
}

export default Cart
