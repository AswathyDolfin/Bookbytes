import { useState } from "react"
import axios from 'axios'
import '../Style/Admin.css'
import { Link } from "react-router-dom"
function AddP() {
  const [NewProdname, setNewProdName] = useState("")
  const [Newprice, setNewPrice] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [imageurl, setImageurl] = useState("")
  const [featuredprod, setfeaturedprod] = useState("")
  const [genreprod, setgenreprod] = useState("")
  const [disprod, setdisprod] = useState("")
  const addProduct = async () => {
    try {
      await axios.post("http://localhost:5000/api/products/addproduct",
        {
          name: NewProdname,
          price: Newprice,
          author: authorName,
          image: imageurl,
          featured: featuredprod,
          genre: genreprod,
          dis: disprod
        }
      );

      setNewProdName('');
      setNewPrice('');
      setAuthorName('')
      setImageurl('')
      setfeaturedprod('')
      setgenreprod('')
      setdisprod('')
      window.alert("Product added successfully!"); 
    } catch (error) {
      console.log(error);
      window.alert("Failed to add product!"); // Alert when there's an error
    }
  }
  return (
    <div>
      <br /><br /><br />
      <div className="add-product-container">
        <h4>ADD PRODUCT</h4>
        <input
          type="text"
          placeholder='Product name'
          value={NewProdname}
          onChange={(e) => setNewProdName(e.target.value)} />
        <input
          type="text"
          placeholder='Product price'
          value={Newprice}
          onChange={(e) => setNewPrice(e.target.value)} />
        <input
          type="text"
          placeholder='Author'
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)} />
        <input
          type="text"
          placeholder='Image'
          value={imageurl}
          onChange={(e) => setImageurl(e.target.value)} />
        <input
          type="text"
          placeholder='featured'
          value={featuredprod}
          onChange={(e) => setfeaturedprod(e.target.value)} />
        <input
          type="text"
          placeholder='genre'
          value={genreprod}
          onChange={(e) => setgenreprod(e.target.value)} />
        <input
          type="text"
          placeholder='dis'
          value={disprod}
          onChange={(e) => setdisprod(e.target.value)} />
        <button onClick={addProduct}>Add Product</button> <br /> <br />
        <Link to="/adm">
        <button >GO Back</button>
      </Link>
      </div>
    </div>
  )
}
export default AddP
