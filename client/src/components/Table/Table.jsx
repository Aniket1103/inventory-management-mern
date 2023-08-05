import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Table.css';

const Table = () => {
  const initialData = [
    {
      "_id": "d23175e7-2de2-4c2e-9f9c-cf85715361b2",
      "name": "Laptop",
      "description": "High-performance laptop for business use.",
      "quantity": 20,
      "category": "Electronics"
    },
    {
      "_id": "30f10624-ec9b-4524-88ed-3e5c74007db3",
      "name": "Laptop",
      "description": "High-performance laptop for business use.",
      "quantity": 20,
      "category": "Electronics"
    },
    {
      "_id": "c77520b2-2132-46d1-b6b0-92f6817da448",
      "name": "Laptop",
      "description": "High-performance laptop for business use.",
      "quantity": 20,
      "category": "Electronics"
    },
    {
      "_id": "27f3f5ca-6481-45d6-96fb-3321928b66af",
      "name": "Laptop",
      "description": "High-performance laptop for business use.",
      "quantity": 20,
      "category": "Electronics"
    },
    {
      "_id": "b8ac8792-1ca2-4b9b-8591-6e1af918d2a7",
      "name": "Laptop",
      "description": "High-performance laptop for business use.",
      "quantity": 20,
      "category": "Electronics"
    },
    {
      "_id": "df80456a-7d0c-48ed-864a-c7b9c71c266d",
      "name": "Laptop",
      "description": "High-performance laptop for business use.",
      "quantity": 20,
      "category": "Electronics"
    },
    {
      "_id": "c25b69f8-0fe6-4b13-9d5c-48eeb97d2d58",
      "name": "Laptop",
      "description": "High-performance laptop for business use.",
      "quantity": 20,
      "category": "Electronics"
    },
    {
      "_id": "8be190cc-0b63-46cd-8e1f-2d9f1b0ad756",
      "name": "Laptop",
      "description": "High-performance laptop for business use.",
      "quantity": 20,
      "category": "Electronics"
    },
    {
      "_id": "e4f8a94e-6852-43e2-89c2-1f7a90364b24",
      "name": "Laptop",
      "description": "High-performance laptop for business use.",
      "quantity": 20,
      "category": "Electronics"
    },
    {
      "_id": "8da5d09e-8aa6-46f9-bc65-6840d951b73b",
      "name": "Laptop",
      "description": "High-performance laptop for business use.",
      "quantity": 20,
      "category": "Electronics"
    }
  ]
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [inventoryData, setInventoryData] = useState(initialData);

  const getInventoryItems = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/inventory`)
      console.log(data);
      setInventoryData(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  useEffect(() => {
    console.log(import.meta.env)
    getInventoryItems();
  }, [])

  // Event handler to open the modal
  const handleAddProduct = () => {
    setModalOpen(true);
  };
  
  const handleCancelAdd = () => {
    setModalOpen(false);
  };



  const handleDelete = (_id) => {
    setInventoryData((prevData) => prevData.filter((item) => item._id !== _id));
  };

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    category: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const addProduct = () => {
    // api post call to add Inventory Item

    setInventoryData([...inventoryData, formData]);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addProduct();
    
    setFormData({
      name: '',
      description: '',
      quantity: '',
      category: '',
    });
    setModalOpen(false)
    // setIsAdding(false);
  };


  return (
    <div className="table-container">
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', margin: '0 30rem'}}>
          <h2>Inventory Table</h2>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', margin: '0 4rem 0 0'}}>
          <button className="add-btn" onClick={isModalOpen ? handleCancelAdd : handleAddProduct}>
            {
              isModalOpen ? "X" : "Add Product"
            } 
          </button>
        </div>

      </div>
      
      {isModalOpen ? (
        <div className="form-container">
          <h3>Add New Product</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
            </div>
              <button type="submit">Add</button>
            {/* <button onClick={() => setIsAdding(false)}>Cancel</button> */}
          </form>
        </div>
      ) : (
        <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.category}</td>
              <td>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default Table;
