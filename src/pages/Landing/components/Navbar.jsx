import React,{useState} from 'react'
import logo from '../images/logo.png'
import {Link } from 'react-router-dom'
function Navbar() {
    const [nav ,setnav]=useState(false);
    const changeBackground=()=>{
        if(window.scrollY>=80){
            setnav(true);
        }
        else{
            setnav(false);
        }
    }
    window.addEventListener('scroll',changeBackground);
    return (
        <nav className={nav? 'nav active':'nav'}>
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
                <li><a href="#" className="active menu">Home</a></li>
                <li><a href="#features" className=" menu">features</a></li>
                {/* <li><a href="#about" className="menu">About Us</a></li> */}
            
                <li>
                    <Link className=" menu2" to="/Form"> SignUp</Link>
                    </li>
                    <li>
                    <Link className=" menu2" to="/FormLogin"> login</Link>
                    </li>
            </ul>
        
        </nav>
        
    )
}

export default Navbar
