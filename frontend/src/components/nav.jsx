import '../Style/Display.css'
import { BsFillCartFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import bookBYTES from "../components/Pics/bookBYTES.png"
import { FaHome } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
function Nav(){
  const [search, setSearch] = useState("");
    const nav=useNavigate()
    function cart() {
      nav("/crt")
    }
    function like() {
      nav("/lk")
    }
    function home(){
      nav("/")
    }
return (
    <div>
     <div class="topnav">
         <div ><img className='logo'src={bookBYTES} alt="logo" /></div>
        <div className='icons'>
          <button className='cartt' onClick={cart}><BsFillCartFill /></button>
          <button className='likee' onClick={like}><FaHeart /></button>
          <button className='homee' onClick={home}><FaHome /></button>
        </div>
    </div>
    <div style={{ height: "120px" }}></div>
    </div>
)
}
export default Nav