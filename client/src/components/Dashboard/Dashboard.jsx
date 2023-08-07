import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Navbar from '../Navbar/Navbar'; 
import Sidebar from '../Sidebar/Sidebar';
import Table from '../Table/Table'
import Analytics from '../Analytics/Analytics';
import axios from 'axios';

const Dashboard = ({userState}) => {
  const currentUser = userState.value;
  console.log("Dashboard: ", currentUser);
  const [option, setOption] = useState("Dashboard");
  const [inventoryData, setInventoryData] = useState([]);
  const inventoryState = {
    "value": inventoryData,
    "set": setInventoryData
  }
  console.log("state", inventoryState)
  const getInventoryItems = async () => {
    try {
      const { data } = await axios.get(`https://inventory-management-quhz.onrender.com/api/v1/inventory`, {
        withCredentials: true
      })
      console.log("Inventory Data: ", data);
      setInventoryData(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  useEffect(() => {
    console.log(import.meta.env)
    getInventoryItems();
  }, [])

  useEffect(() => {
    // if(option === 1) 
  }, [option])
  

  const toggleMenu = (value) => {
    console.log(value)
    setOption(value);
  }

  const getComponent = () => {
    switch(option){
      case "Dashboard" : return <Table userState={userState} inventoryState={inventoryState} />;
      case "Analytics" : return <Analytics userState={userState} />;
      case "Requests" : return <Table inventoryState={inventoryState} userState={userState} unapproved={true}/>;
      default : return <Table userState={userState} inventoryState={inventoryState} />
    }
  }

  return (
    <div className="dashboard-container">
      <Navbar userState={userState} selectedOption={option} /> 
      <div style={{display:"flex", flexDirection: "column"}}>
        <Sidebar toggleMenu={toggleMenu} userState={userState}/>
        <div>
          <div className="dashboard-content">
          {/* <h1>Welcome to Dashboard!</h1> */}
        </div>
        </div>
      </div>
        {
          inventoryData && getComponent(option)
        }
    </div>
  );
};

export default Dashboard;
