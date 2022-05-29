import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './profile.css';
// import photo from "./pietra-schwarzler-FqdfVIdgR98-unsplash.jpg";
// import Cardprofile from "../components/Cardprofile"
import ProfileLayout from "./ProfileLayout"
import Header from '../../Components/Navbar/Navbar';




const Profile = (props) => {
    console.warn(props)
    const id=props.match.params.id;
    // console.warn(id)
    
    return (
        <>
        <Header/>
        <div style={{backgroundColor:"rgba(230, 230, 230, 0.3)"}}>
           
           <ProfileLayout id={id}/>
       </div>
        </>
    )
}

export default Profile;

