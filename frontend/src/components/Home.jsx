import { BsFillCartFill } from "react-icons/bs";
import { FaUser, FaHeart, FaFacebook, FaInstagramSquare, FaYoutube, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { IoLogOutSharp } from "react-icons/io5";
import '../Style/Home.css'
import bookBYTES from "../components/Pics/bookBYTES.png"
import book1 from "../components/Pics/book1.png"
import book6 from "../components/Pics/book6.png"
import book2 from "../components/Pics/book2.png"
import book4 from "../components/Pics/book4.png"
import Featuredproducts from "./Featured"
import q1 from "../components/Pics/q1.png"
import q3 from "../components/Pics/q3.png"
import { Link } from "react-router-dom";
import { useEffect } from "react";
function Bmain() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userID');
    setIsLoggedIn(false);
    nav('/');
  };
  function shopnow() {
    nav("dy")
  }

  function cart() {
    nav("crt")
  }
  function like() {
    nav("lk")
  }
  function fiction() {
    nav("fic")
  }
  function novel() {
    nav("nov")
  }
  function fantasy() {
    nav("fan")
  }
  function history() {
    nav("his")
  }
  function mystry() {
    nav("mys")
  }
  function romance() {
    nav("rom")
  }
  function biography() {
    nav("bio")
  }
  function thriller() {
    nav("thr")
  }
  function userp() {
    nav("up")
  }
  return (
    <div>
      <div class="topnav">
        <button className='cc' onClick={userp}><FaUser /></button>
        <div ><img className='logo' src={bookBYTES} alt="logo" /></div>
        <div className='topnavicon'>
          <button className='c' onClick={cart}><BsFillCartFill />{cart.length > 0 && <span style={{ fontSize: "15px", color: "white" }}>{cart.length}</span>}</button>
          <button className='l' onClick={like}><FaHeart />{like.length > 0 && <span style={{ fontSize: "15px", color: "white" }}>{like.length}</span>}</button>
          <button className='logi'>  {isLoggedIn ? (
            <b onClick={handleLogout}>LOGOUT</b>
          ) : (
            <Link className="link" to={'/log'}><b>LOGIN</b></Link>
          )}
          </button>
        </div>
      </div>
      <div style={{ height: "px" }}></div>
      <div className="body">
        <div class="slideshow">
          <div class="slide"><img src={book6} alt="Image 1" /></div>
          <div class="slide"><img src={book4} alt="Image 2" /></div>
          <div class="slide"><img src={book2} alt="Image 3" /></div>
          <div class="slide"><img src={book1} alt="Image 4" /></div>
        </div>
      </div>
      <div className="fb"><h1>FEATURED BOOKS </h1></div>
      <button className='btn4 ' onClick={shopnow}>VIEW ALL</button>
      <div style={{ height: "15px" }}></div>
      <Featuredproducts />
      <div style={{ height: "50px", backgroundColorcolor: "black" }}></div>
      <div className='text'>
        <div className='tex1'><h1>EXPLORE GENRES</h1></div>
        <div className="genere">
          <button className='btn8' onClick={fiction}>FICTION </button>
          <button className='btn8' onClick={romance}>ROMANCE</button>
          <button className='btn8' onClick={novel}>NOVEL</button>
          <button className='btn8' onClick={fantasy}>FANTASY</button>
          <button className='btn8' onClick={mystry}>MYSTREY</button>
          <button className='btn8' onClick={thriller}>THRILLER</button>
          <button className='btn8' onClick={biography}>BIOGRAPHY</button>
          <button className='btn8' onClick={history}>HISTORY</button>
        </div>
        <br /><br />
      </div>
      <div style={{ height: "15px" }}></div>
      <div className='bar1'>
        <img className='q1' src={q1} alt="img" />
        <br />
        <img className='q2' src={q3} alt="img" />
        <div>
        </div>
      </div>
      <br />
      <div className="fa"><br />
        <div className='tex1'><h1> FEATURED AUTHOR</h1></div>
        <div className="authores">
          <a href="/a2">
            <img className="auth" src="https://www.rollingstone.com/wp-content/uploads/2018/06/rs-18756-20140422-george-x1800-1398196701.jpg?w=1024" />
          </a>
          <a href="/a3">
            <img className="auth" src="https://jkrowling.com/wp-content/uploads/2016/12/JKROWLINGPR_S01_00057_V4.jpg" />
          </a>
          <a href="/a4">
            <img className="auth" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLu9-HsA3L5H7ju6MA4VxwYWwYs9k2knQRCw&s" />
          </a>
          <a href="/a1">
            <img className="auth" src="https://i.pinimg.com/736x/49/ef/2e/49ef2eb90213e8b88fcb1c0a820f0dc3.jpg" />
          </a>
          <a href="/a5">
            <img className="auth" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe-k6dLXKSag8cipncKyZyLV3viDQd4AiVww&s" />
          </a>
          <a href="/a6">
            <img className="auth" src="https://static.toiimg.com/photo/76180117.cms" />
          </a>
          <a href="/a7">
            <img className="auth" src="https://e1.pxfuel.com/desktop-wallpaper/575/684/desktop-wallpaper-sudha-murty-s-upside-sudha-murthy.jpg" />
          </a>
          <a href="/a8">
            <img className="auth" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkJPZfYDyJ5esRcTmg30aRmPFPywDfMIqKTw&s" />
          </a>
          <a href="/a9">
            <img className="auth" src="https://w0.peakpx.com/wallpaper/491/536/HD-wallpaper-stephen-king-books-people-man-movies-other.jpg" />
          </a>
          <a href="/a10">
            <img className="auth" src="https://c8.alamy.com/comp/2D737H1/author-elif-shafak-attending-a-photocall-for-the-2019-booker-prize-shortlisted-authors-at-the-south-bank-centre-in-london-picture-date-sunday-october-13-2019-photo-credit-should-read-matt-crossickempics-2D737H1.jpg" />
          </a>
        </div>
      </div>
      <div style={{ height: "50px" }}></div>
      <div className='bottomnav' >
        <div>
          <div className='para'>
            <div>
              <p>ABOUT US</p>
              <p>Our Story <br />Our Blog</p>
            </div>
            <div >
              <p>CUSTOMER SERVICE</p>
              <p>Contact Us <br />Delivery <br />Returns <br />Track Order <br />Privacy Policy</p>
            </div>
            <div >
              <p>OUR CATEGORY</p>
              <p> Romance<br />Fiction  <br />Horror <br /> fantasy <br />Mystery <br />Thriller <br />Biography <br />History</p>
            </div> </div> </div>
        <div className='bn1'>
          <div><img className='logo2' src={bookBYTES} alt="logo" /></div><br />
          <div className='logo1'><p><i style={{ fontSize: "20px" }}>Follow Us <br /><FaFacebook /><FaTwitter /><FaInstagramSquare /><FaYoutube /></i></p>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Bmain