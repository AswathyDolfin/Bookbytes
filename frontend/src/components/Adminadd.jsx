
import React, { useContext, useState, useEffect } from "react";
import { myContext } from "./context";
import axios from "axios";
import "../Style/Admin.css";
import { Link } from "react-router-dom";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default function ProductDashboard() {
  const { products, getProducts } = useContext(myContext);
  const [ProdData, setProdData] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedProducts, setExpandedProducts] = useState({});
  const [zoomedImage, setZoomedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!products.length) {
      getProducts();
    }
  }, [products, getProducts]);

  useEffect(() => {
    setProdData(products);
  }, [products]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
      getProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const confirmDelete = (id) => {
    const product = ProdData.find((prod) => prod._id === id);
    if (window.confirm(`Are you sure you want to delete this product, ${product ? product.name : 'this product'}?`)) {
      handleDelete(id);
    }
  };

  const toggleShowMore = (productId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const openFullscreen = (image) => {
    setZoomedImage(image);
  };

  const closeFullscreen = () => {
    setZoomedImage(null);
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditingProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const saveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/put/${editingProduct._id}`, editingProduct);
      getProducts();
      setEditingProduct(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const filteredProducts = selectedCategory === "All"
    ? ProdData
    : ProdData.filter(product => product.genre === selectedCategory);

  return (
    <div className="admin-container">
      <h2 className="pd">PRODUCT DASHBORD</h2>
      <div className="category-dropdown-admin">
        <Link to={'/userinfo'}>
          <button className="userbtnprd">
            Users Information
          </button>
        </Link>
        <Link to={'/add'}>
          <button className="addbtnprd">
            Add new Products
          </button>
        </Link>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Author</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <React.Fragment key={product._id}>
              <tr>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.author}</td>
                <td>{product.price}</td>
                <td>
                  <button className="button-admin" onClick={() => startEditing(product)}>
                    Edit
                  </button>
                  <button className="button-admin" onClick={() => toggleShowMore(product._id)}>
                    {expandedProducts[product._id] ? "Show Less" : "Show More"}
                  </button>
                  <button className="button-admin" onClick={() => confirmDelete(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
              {expandedProducts[product._id] && (
                <tr key={`${product._id}-details`} className="expanded-row">
                  <td colSpan="5">
                    <div className="extra-details">
                      <div className="image-container-admin">
                        <img
                          src={product.image}
                          alt={`${product.name}`}
                          className="image-admin"
                          onClick={() => openFullscreen(product.image1)}
                        />
                      </div>
                      <h4>ID: {product._id}</h4>
                      <p> GENRE:{product.genre}</p>
                      <p>{product.dis}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen}>
  {editingProduct && (
    <div className="modal-content">
      <h3>Edit Product</h3>
      <div className="edit-form">
        <label>
          Name:
          <input className="box" type="text" name="name" value={editingProduct.name} onChange={handleEditChange} />
        </label>
        <label>
          Author:
          <input className="box" type="text" name="author" value={editingProduct.author} onChange={handleEditChange} />
        </label>
        <label className="grid-full">
          Price:
          <input className="box" type="number" name="price" value={editingProduct.price} onChange={handleEditChange} />
        </label>
        <label>
            Genre:
            <input className="box" type="text" name="genre" value={editingProduct.genre} onChange={handleEditChange} />
          </label>
          <label>
            Featured:
            <input className="box" type="text" name="featured" value={editingProduct.featured} onChange={handleEditChange} />
          </label>
        <div className="edit-form grid-4-cols">
          <label>
            Image :
            <input className="img" type="text" name="image1" value={editingProduct.image} onChange={handleEditChange} />
          </label>
        </div>
        <label className="grid-full">
          Description:
          <textarea className="full-width" name="description" value={editingProduct.dis} onChange={handleEditChange} />
        </label>
        <div className="grid-full">
          <button className="button-admin" onClick={saveEdit}>Save</button>
          <button className="button-admin" onClick={cancelEdit}>Cancel</button>
        </div>
      </div>
    </div>
  )}
</Modal>


      {zoomedImage && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <img className="fullscreen-image" src={zoomedImage} alt="Zoomed" />
        </div>
      )}
    </div>
  );
}