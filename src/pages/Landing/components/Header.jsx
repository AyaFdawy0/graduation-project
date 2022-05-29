import React from 'react'
import Navbar from './Navbar'
import image from '../images/image.jpg'
function Header() {
    return (
        <div id="main">
            <Navbar/>
            <div className="name">
                
                <h1 style={{fontSize:"24px"}}>
                    {/* Welcome to our Website  <p><span>
                        Mates </span>for Teamwork
                        </p> */}
                    {/* How To Make Dynamic Website Using  */}
                     {/* How To Make Dynamic Website Using  */}
                     <p style={{fontSize:"62px",color:"#ffc307"}}>Online collaboration platform</p>
                     We built this Website to help you communicate <br/>  with your Teamwork easily
                </h1>
                
                <img src={image}/>

            </div>
    
        </div>
    )
}

export default Header
