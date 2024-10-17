import { useEffect, useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import axios from 'axios'
import AddP from './components/Addproduct';
import ProductDashboard from './components/Adminadd';
import ProductList from './components/Display';
import { myContext } from './components/context';
import Bmain from './components/Home';
import Dspy from './components/Display';
import Featuredproducts from './components/Featured';
import Cb from './components/Cb';
import Nav from './components/nav';
import Grr from './components/Grr';
import Jk from './components/JK';
import Pc from './components/Pc';
import Ar from './components/Ar';
import St from './components/St';
import Sm from './components/Sm';
import Jg from './components/Jg';
import Sk from './components/Sk';
import Es from './components/Es';
import Nov from './components/Novel';
import Fic from './components/Fiction';
import Fan from './components/Fantasy';
import Mys from './components/Mystry';
import Thr from './components/Thriller';
import Bio from './components/Biography';
import His from './components/History';
import Rom from './components/Romance';
import Like from './components/Like';
import LogUser from './components/Login';
import RegisterUser from './components/Register';
import Cart from './components/Cart';
import AdminLogin from './components/Adminlogin';
import UserInfo from './components/Userinfo';
import Payment from './components/Payment';
import UserProfile from './components/Userprofile';
import Dis from './components/Discription';
function App() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/get")
      setProducts(response.data)


    } catch (error) {
      console.log(error);
    }
  }
  const val={products,setProducts,getProducts}
  return (
    <myContext.Provider value={val}>
    <BrowserRouter>
    <Routes>
     <Route path='/Adm' element ={<ProductDashboard/>}/>
    <Route path='/add' element={<AddP/>}/>
    <Route path='/dis' element={<ProductList/>}/>
    <Route path='/' element={<Bmain/>}/>
    <Route path='/dy' element={<Dspy/>}/>
    <Route path='/fe' element={<Featuredproducts/>}/>
    <Route path='/n' element={<Nav/>}/>
    <Route path='/a1' element={<Cb/>}/>
    <Route path='/a2' element={<Grr/>}/>
    <Route path='/a3' element={<Jk/>}/>
    <Route path='/a4' element={<Pc/>}/>
    <Route path='/a5' element={<Ar/>}/>
    <Route path='/a6' element={<St/>}/>
    <Route path='/a7' element={<Sm/>}/>
    <Route path='/a8' element={<Jg/>}/>
    <Route path='/a9' element={<Sk/>}/>
    <Route path='/a10' element={<Es/>}/>
    <Route path='/nov' element={<Nov/>}/>
    <Route path='/fic' element={<Fic/>}/>
    <Route path='/fan' element={<Fan/>}/>
    <Route path='/mys' element={<Mys/>}/>
    <Route path='/thr' element={<Thr/>}/>
    <Route path='/bio' element={<Bio/>}/>
    <Route path='/rom' element={<Rom/>}/>
    <Route path='/his' element={<His/>}/>
    <Route path='/lk' element={<Like/>}/>
    <Route path='/log' element={<LogUser/>}/>
    <Route path='/reg' element={<RegisterUser/>}/>
    <Route path='/crt' element={<Cart/>}/>
    <Route path='/adl' element={<AdminLogin/>}/>
    <Route path='/userinfo' element={<UserInfo/>}  />
    <Route path='/pay' element={<Payment/>}  />
    <Route path='/up' element={<UserProfile/>}  />
    <Route path='/dis/:id' element={<Dis/>}  />
    </Routes>
    </BrowserRouter>
    </myContext.Provider>
  );
}

export default App;
