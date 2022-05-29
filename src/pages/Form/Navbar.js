import React, { useState } from 'react'
import './Navbar.css';
import { NavLink,useHistory } from 'react-router-dom';
import { Container, NavDropdown } from 'react-bootstrap';
// import image from './image.jpg'
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as IconName from "react-icons/bs";
import Dropdown from 'react-dropdown';
function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  let user=JSON.parse(localStorage.getItem("user-info"))
  console.warn(user);
  const { id} = user;
console.warn(id)
  const history=useHistory();
  function logout(){
    localStorage.clear();
    history.push("/Form")
}

    
  return (
    <nav className=" navbar-expand-lg navbar-mainbg">
    <div className="logo">
                ma<p>T </p> es
              </div>
          
      <div className="navbarSupportedContent">

        <ul className="navbar-nav ">
          <li className="nav-item ">
            <NavLink className="nav-link" to={"/Profile/"+id} exact>
              <BsIcons.BsFillPersonFill /> Profile
              </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/Teams" exact>
              <IoIcons.IoMdPeople /> Teams
              </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/Calendar" exact>
              <AiIcons.AiFillCalendar /> Calendar
              </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Message" exact>
              <AiIcons.AiFillMessage /> Messages
              </NavLink>
          </li>
         
        </ul>


      </div>
      <div className="navbar1">
        
        <div className="right" >
        <span className="search">
            <input type="text" placeholder="search..."/>
          </span>
          <span className="notif">
            <AiIcons.AiFillBell />
          </span>

     
          {/* <div className="right-menu">
            <button className="menu-botton"> <img className="image" alt="image" src={image} /></button>
            <div className="dropdown-menu">
              <NavLink className="setting" to="/Setting" exact>
                <AiIcons.AiFillSetting /> Setting
              </NavLink>
              <hr />
              <NavLink className="logOut" onClick={logout}>
                <IconName.BsBoxArrowRight /> LogOut
              </NavLink>
            </div>

          </div> */}

  
                  {/* <Nav> */}
         <NavDropdown title={user.username ? user.username :"user" }>
          <NavDropdown.Item> <AiIcons.AiFillSetting /> Setting</NavDropdown.Item>
          <NavDropdown.Item onClick={logout} > <IconName.BsBoxArrowRight /> Logout</NavDropdown.Item>
          {/* <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item> */}
        </NavDropdown>
        {/* </Nav> */}


        </div>

      </div>
    <div className="logo">
                ma<p>T</p>es
             </div> 
             <div class="nav">
            <ul>
            <li><NavLink to="/FormLogin">Sign in</NavLink></li>
            <li>|</li>
            <li className="child"><NavLink to="/Form">Sign Up</NavLink></li>
            </ul>
            </div>

   </nav>
    
  )
}
export default Navbar;