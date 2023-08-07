import React, { useEffect, useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,
    FaQuestion
}from "react-icons/fa";
import "./Sidebar.css"
import { NavLink } from 'react-router-dom';


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
        // {
        //     path:"/about",
        //     name:"About",
        //     icon:<FaUserAlt/>
        // },
        {
            path:"/analytics",
            name:"Analytics",
            icon:<FaRegChartBar/>
        },
        {
            path:"/requests",
            name:"Requests",
            icon:<FaThList/>
        },
        // {
        //     path:"/product",
        //     name:"Product",
        //     icon:<FaShoppingBag/>
        // },
        // {
        //     path:"/productList",
        //     name:"Product List",
        //     icon:<FaThList/>
        // }
    ]

    useEffect(() => {

    }, [])
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
                   menuItem.map((item, index)=>(
                       <div onClick={() => toggleMenu(item.name)} className="link" style={{cursor: 'pointer'}}>
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </div>
                   ))
               }
           </div>
           {/* <main>{children}</main> */}
        </div>
    );
};

export default Sidebar;