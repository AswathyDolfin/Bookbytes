import { useContext } from "react"
import { myContext } from "./context"
import { useParams } from "react-router-dom"
import '../Style/Featured.css'
import'../Style/Cb.css'
import Nav from "./nav"
function Es() {
    const { products } = useContext(myContext)

    const { author } = useParams()

    const authorProd = products.filter(item => item.author === "ELIF SHAFAK")

    console.log("prod", authorProd, author);
  return (
    <div>
        <Nav/>
        <div className="cb1">
            <h1 className="cb2">ELIF SHAFAK</h1>
            <img className="cb3" width={250} height={250}src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Elif_Shafak_photo.jpg/330px-Elif_Shafak_photo.jpg"  />
        <h4 className="cb4">
        Elif Shafak FRSL ( born 25 October 1971) is a Turkish-British novelist, essayist, public speaker, political scientist and activist.
        </h4>
        </div>
       < h1 className="cb2" >BOOKS</h1>
    <div className="d11">
        {authorProd.map((prod) => (
          <div className="d33">
            <img width={250} height={250} src={prod.image} alt="img"/>
            <h3 className="d22">{prod.name}</h3>
            <h3 className="d22">{prod.author}</h3>
            <h3 className="d22"><i>Rs.</i>{prod.price}</h3>
            </div>
        ))}
    </div>
    </div>
  )
}
export default Es