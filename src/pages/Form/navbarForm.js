import React from 'react'
import {Link} from "react-router-dom"
import "./navbarForm.css"

 function NavbarForm() {
    return (
        <div>
             <nav className='nav1'>
            <Link to="/" className="logo1">
                {/* <img src={logo} alt='' /> */}
                <div className="logo2">
                ma<p>T </p> es
                 </div>
            </Link> 
            <input type='checkbox' className='menu-btn' id="menu-btn"/>
            <label className="menu-icon" for="menu-btn">
                <span className='nav-icon'></span>    
            </label>
            <ul>
                
                
                    <li>
                    <Link className=" menu2" to="/FormLogin"> LogIn </Link>
                    </li>
                    <li>
                    <Link className=" menu2" to="/Form"> SignUp</Link>
                    </li>
            </ul>
        
        </nav>
        </div>
    )
}
export default NavbarForm;
