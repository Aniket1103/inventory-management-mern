import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Table from '../Table/Table'
import Analytics from '../Analytics/Analytics';
import Loader from '../Loader/Loader';
import { useFetch } from '../../custom-hooks/useFetch';

const getComponent = (option, userState, inventoryState, pageState) => {
  switch (option) {
    case "Dashboard": return <Table userState={userState} inventoryState={inventoryState} pageState={pageState} key="approved" />;
    case "Analytics": return <Analytics userState={userState} inventoryState={inventoryState} />;
    case "Requests": return <Table inventoryState={inventoryState} userState={userState} pageState={pageState} unapproved={true} key="unapproved" />;
    default: return <Table userState={userState} inventoryState={inventoryState} pageState={pageState} key="approved"/>
  }
}

const Dashboard = ({ userState }) => {
  const currentUser = userState.value;
  console.log("Dashboard: ", currentUser);
  const [option, setOption] = useState("Dashboard");

  const {
    data: inventoryData,
    setData: setInventoryData,
    page,
    setPage,
    isLoading,
    isError
  } = useFetch(`${import.meta.env.VITE_BASE_URL}/api/v1/inventory`);

  const inventoryState = {
    "value": inventoryData,
    "set": setInventoryData
  }
  const pageState = {
    "value": page,
    "set": setPage
  }

  const toggleMenu = (value) => {
    console.log(value)
    setOption(value);
  }

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <p>Something went wrong, Try again later.</p>
  }


  return (
    <div className="dashboard-container">
      <Navbar userState={userState} selectedOption={option} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Sidebar toggleMenu={toggleMenu} userState={userState} />
        <div>
          <div className="dashboard-content">
            {/* <h1>Welcome to Dashboard!</h1> */}
          </div>
        </div>
      </div>
      {
        inventoryData && getComponent(option, userState, inventoryState, pageState)
      }
    </div>
  );
};

export default Dashboard;
