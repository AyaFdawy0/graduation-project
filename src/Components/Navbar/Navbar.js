import React, { useState,useEffect } from 'react'
import './Navbar.css';
import { Link, NavLink,useHistory } from 'react-router-dom';
import { Container, NavDropdown } from 'react-bootstrap';
import image from './image.jpg'
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as IconName from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import Dropdown from 'react-dropdown';
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';
toast.configure()

function Header() {
  const history=useHistory();
  const [showLinks, setShowLinks] = useState(false);
  const id=localStorage.getItem("id")
  const name=localStorage.getItem("name")
  let local=JSON.parse(localStorage.getItem("user-info"))
  // console.warn(local.user.url);
  // const url = local.user.url;
  const token=localStorage.getItem("token")
  const [url, setUrl] = useState("");
 
  const [notifs,setNotifs]=useState("")
  
  //   const notify=()=>{
  //     getNotifications(
  //       notifs && notifs.map(item=>{
  //         return(
  //           <ToastContainer>
  //           <Toast>
  //           <Toast.Header>
  //             <img src={item.user.url} className="rounded me-2" alt="" />
  //             <strong className="me-auto">{item.title} from {item.user.name}</strong>
  //             <small>11 mins ago</small>
  //           </Toast.Header>
  //           <Toast.Body>{item.body}</Toast.Body>
  //         </Toast>
  //         </ToastContainer>
  //         )
  //       })
        
  //   )
  // }
    const notify=()=>{
      getNotifications(
        notifs && notifs.map(item=>{
          return(
            
            toast(
              
            <div key={item.id} >
              
            <span><img style={{width:"30px", height:"30px",borderRadius:"50%",padding:"2px"}} src={item.user?.url}/>{item.title} from {item.user?.name}</span>
            <p>{item.body}</p>
           
            </div>
           
            )
          
          )
        })
        
    )
  }
    const unseen=()=>{
      getNotifications(
        notifs && notifs.map(item=>{
          return(item.user.seen == false && numOfSeen()
          )   
        })
        
    )
    }
useEffect(() => {
  getUsers();
}, [name])
function getUsers() {
  fetch("https://boiling-shelf-43809.herokuapp.com/user/"+id+"/profile"
  , {
    headers:{
      "authorization":`${token}`
    }
  }
  ).then((result) => {
    result.json().then((resp) => {
      // console.warn(resp)
      // console.warn(resp.profile)
      setUrl(resp.profile.url)
    })
  })
}
function logout(){
  const deviceToken=localStorage.getItem("deviceToken")
  let item={token:`${deviceToken}`}
  axios({
    method:"POST",
    url:"https://boiling-shelf-43809.herokuapp.com/notifications/unsubscribe",
    data:item,
    headers:{
      "authorization":`${token}`
    }
  }).then(res=>console.log(res.data)) 
  history.push("/")
  localStorage.clear();
}
async function getNotifications(){
  await fetch('https://boiling-shelf-43809.herokuapp.com/notifications', {
    headers: {
      "authorization": `${token}`
    }
  })
    .then(resp => resp.json())
    .then(result => {
      setNotifs(result)
      console.log(result)
    }
    )
  }
async function numOfSeen() {
  await fetch('https://boiling-shelf-43809.herokuapp.com/notifications/count', {
    headers: {
      "authorization": `${token}`
    }
  })
    .then(resp => resp.json())
    .then(result => {
      console.log(result.count)
    }
    )

}


let menu
if(localStorage.getItem("user-info")){
  // let user=JSON.parse(localStorage.getItem("user-info"))
  // const { id} = user;
 

  menu=(
    <>
    <div className="logo">
                ma<p>T </p> es
              </div>
          
      <div className="navbarSupportedContent">

        <ul className="navbar-nav ">
          <li className="nav-item ">
            <NavLink className="nav-link" to={"/Profile/"+id}>
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
        {/* <span className="search">
            <input type="text" placeholder="search..."/>
          </span> */}
          <span className="notif">
          
          <AiIcons.AiFillBell  style={{fontSize:"40px",cursor:"pointer"}} onClick={notify}/>
        
          </span>
          <img src={url} style={{width:"50px",height:"50px",borderRadius:"50%",marginLeft:"10px"}}/>
         <NavDropdown  title={name ? name :"user" }>
          <NavDropdown.Item> <Link className="profileLink" to={"/Profile/"+id}><FaUser /> My Profile</Link></NavDropdown.Item>
          <NavDropdown.Item onClick={logout} > <IconName.BsBoxArrowRight /> Logout</NavDropdown.Item>
        </NavDropdown>
        


        </div>

      </div>


    </>
  )
}
else{
  menu=(
    <>
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

    </>
  )
}

  return (
    <nav className=" navbar-expand-lg navbar-mainbg">
    {menu}
   </nav>
    
  )
}
export default Header;
