import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Navbar from '../Navbar/Navbar'; 
import Sidebar from '../Sidebar/Sidebar';
import Table from '../Table/Table'

const Dashboard = () => {
  const [option, setOption] = useState("Dashboard");

  useEffect(() => {
    // if(option === 1) 
  }, [option])
  

  const toggleMenu = (value) => {
    console.log(value)
    setOption(value);
  }

  const getComponent = () => {
    switch(option){
      case "Dashboard" : return <Table />;
      case "Analytics" : return 1;
      case 2 : return 2;
      default : return <Table />
    }
  }

  return (
    <div className="dashboard-container">
      <Navbar /> 
      <div style={{display:"flex", flexDirection: "column"}}>
        <Sidebar toggleMenu={toggleMenu}/>
        <div>
          <div className="dashboard-content">
          {/* <h1>Welcome to Dashboard!</h1> */}
        </div>
        </div>
      </div>
        {/* <Table /> */}
        {
          getComponent(option)
        }
    </div>
  );
};

export default Dashboard;
