import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './Table.css';

const Table = ({inventoryState, userState, unapproved}) => {
  // console.log("table state",currentUser, inventoryState)
  const currentUser = userState.value;
  const [isModalOpen, setModalOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(unapproved);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    category: '',
  });

  useEffect(() => {
    if(unapproved) getUnapprovedInventoryItems()
    console.log("unapproved", unapproved)
  }, [unapproved])

  useEffect(() => {
    setLoading(false);
  }, [requests])

  // useEffect(() => {
  //   setLoading(unapproved);
  // }, [unapproved])

  const getUnapprovedInventoryItems = async () => {
    try {
      const { data } = await axios.get(`https://inventory-management-quhz.onrender.com/api/v1/inventory/unapproved`, {
        withCredentials: true
      })
      console.log("Unapproved Items: ", data);
      setRequests(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  
  const addProduct = async () => {
    // api post call to add Inventory Item
    const { name, description, quantity, category } = formData;
    if(!description || !quantity || !name || !category) return alert("Email or Password cannot be empty\nPlease Try Again.");

    try {
      const {data} = await axios.post(`https://inventory-management-quhz.onrender.com/api/v1/inventory`, formData, {
        withCredentials: true,
      });
      
      console.log("Product added: ", data);
      if(data.approved) inventoryState.set([...inventoryState.value, data])
      toast.success(currentUser.role === "Manager" ? "Product added Successfully" : "Request Sent Successfully");
    } catch (error) {
      const { status, data } = error.response;
      console.log(status, data);
      if(status === 400 || status.status === 401) toast.error(data.message);
      else toast.error("Error while Adding the Product\nPlease try again.");
    }
    // setInventoryData([...inventoryData, formData]);
  }
  
  const handleDelete = async (_id) => {
    try {
      const { data } = await axios.delete(`https://inventory-management-quhz.onrender.com/api/v1/inventory/${_id}`, {
        withCredentials: true
      })
      console.log("Deleted Item: ", data);
      toast.success(data.message);
      inventoryState.set((prevData) => prevData.filter((item) => item._id !== _id));
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error.response.data);
    }
  };

  const handleApprove = async (_id) => {
    try {
      const { data } = await axios.patch(`https://inventory-management-quhz.onrender.com/api/v1/inventory/approve/${_id}`,{}, {
        withCredentials: true
      })
      console.log("Approved Item: ", data.updatedItem);
      toast.success(data.message);
      inventoryState.set([...inventoryState.value, data.updatedItem])
      setRequests((prevData) => prevData.filter((item) => item._id !== _id));
    } catch (error) {
      toast.error(error.response.data.message || `error: ${error.response.status}`)
      console.log(error.response.data);
    }
  }
  
  // Add Product button : Event handler to open the modal
  const handleAddProduct = () => {
    setModalOpen(true);
  };
  
  // Cancel add button : Event handler to open the modal
  const handleCancelAdd = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


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
  
  const getDataArray = () => {
    if(unapproved) return requests;
    return inventoryState.value;
  }

  return (
    <div className="table-container">
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', margin: '0 15rem 0 30rem'}}>
          <Toaster />
          <h2>
            {
              unapproved ? (
                "Requests"
              ) : (
                "Inventory Items"
              )
            }
          </h2>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', margin: '0 12rem 0 0'}}>
          {
            !unapproved && 
            <button className="add-btn" onClick={isModalOpen ? handleCancelAdd : handleAddProduct}>
              {
                (currentUser.role === "Manager") ? (
                    isModalOpen ? " X " : "Add Product"
                  ) : (
                    isModalOpen ? " X " : "Request to Add"
                )
              } 
            </button>
          }
        </div>

      </div>
      
      {
        isModalOpen ? (
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
                <button type="submit" style={{margin:"0 38%"}}>
                  {
                    (currentUser.role === "Manager") ? (
                      "Add"
                    ) : (
                      "Request"
                    )
                  }
                </button>
              {/* <button onClick={() => setIsAdding(false)}>Cancel</button> */}
            </form>
          </div>
        ) : (
          (!unapproved || !loading) &&
          (
            getDataArray().length ? (
            <table className="inventory-table">
              <thead>
                <tr>
                  {/* <th>User Name</th> */}
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  {
                    (currentUser.role === "Manager") &&
                    <th>Action</th>
                  }
                </tr>
              </thead>
              <tbody>
                {getDataArray().map((item) => (
                  <tr key={item._id}>
                    {/* <td>{item?.user?.name || ""}</td> */}
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>{item.category}</td>
                    {
                      (currentUser.role === "Manager") &&
                      <td>
                        <button onClick={() => unapproved ? handleApprove(item._id) : handleDelete(item._id)}>
                          {unapproved ? "Approve" : "Delete"}
                        </button>
                      </td>
                    }
                  </tr>
                ))}
              </tbody>
            </table>
            ) : (
              <h3 style={{margin: "0 38%", width: "50rem", color: "red"}}>
                {
                  (unapproved) ? (
                    "No Requests"
                  ) : (
                    "No Products available"
                  )
                }
              </h3>
            )
          )
        )
      }
    </div>
  );
};

export default Table;
