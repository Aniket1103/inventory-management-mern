import React, { useEffect, useState } from 'react';
import {
    FaTh,
    FaBars,
    FaRegChartBar,
    FaThList,
}from "react-icons/fa";
import "./Sidebar.css"

const Sidebar = ({children, toggleMenu, userState}) => {
    const currentUser = userState.value;
    // console.log("sidebar", currentUser)
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/analytics",
            name:"Analytics",
            icon:<FaRegChartBar/>
        }
    ]

    
    const getMenuList = () => {
      if(currentUser.role === "Manager") return [...menuItem, {
        path:"/requests",
        name:"Requests",
        icon:<FaThList/>
      }];
      return menuItem;
    }
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px", cursor: "pointer"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   getMenuList().map((item, index)=>(
                       <div onClick={() => toggleMenu(item.name)} className="link" style={{cursor: 'pointer'}}>
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </div>
                   ))
               }
           </div>
        </div>
    );
};

export default Sidebar;