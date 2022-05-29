import React,  { useEffect, useState ,Fragment } from 'react'
import { Badge, Button, Card, Col, Form, ListGroup, ListGroupItem, Row } from 'react-bootstrap';

import styles from "./profilelayout.module.css"
import axios from "axios"
import { useHistory } from 'react-router-dom';

import photo from "./pietra-schwarzler-FqdfVIdgR98-unsplash.jpg";
import { HiOutlineCamera } from "react-icons/hi";
// import {UpdateProfile} from "../pages/UpdateProfile";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa"
import { RiDeleteBin5Line } from "react-icons/ri";



const ProfileLayout = (props) => {
  const history=useHistory();
  console.warn(props.id)
  const token=localStorage.getItem("token")
  const [users, setUser] = useState({})
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setUsername] = useState("");
  const [track, setTrack] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImg] = useState("");
  const [userId,setUserId]=useState(null)
const [file, setFile] = useState(null);


  useEffect(() => {
    getUsers();
  }, [])

  function getUsers(){
    fetch(`https://boiling-shelf-43809.herokuapp.com/user/${props.id}/profile`,{
      headers:{
        "authorization":`${token}`
      }
    }).then(resp=>resp.json())
    .then(resp=>{
      console.log(resp.profile)
      setUser(resp.profile)

         setBio(resp.profile.bio)
          setPhone(resp.profile.phone)
          setEmail(resp.profile.email)
          setAddress(resp.profile.address)
          setUsername(resp.profile.name)
          setUrl(resp.profile.url)
          setImg(resp.profile.image)
          setTrack(resp.profile.track)
          localStorage.setItem("name",(resp.profile.name))
    })
      
  }
console.log("users",users)

  const updateProfile=(e)=>{
    e.preventDefault();
    let item={name,bio,phone,email,address}
    console.warn("item",item)
    const formData = new FormData();
    formData.append('name',name)
    formData.append('bio',bio)
    formData.append('phone',phone)
    formData.append('email',email)
    formData.append('address',address)
    formData.append('track',track)
    // formData.append("",image)
    axios({
      method:"PUT",
      url:"https://boiling-shelf-43809.herokuapp.com/user/editProfile",
      data:formData,
      headers:{"authorization":`${token}`}
    }).then(resp=>{
      (console.log(resp))
      getUsers();
    })
  }
  
  const handleChangeFile=(e)=>{
    // console.log(e.target.files)
    // console.log(e.target.files[0])
    let files=e.target.files[0]
    setFile(files)
    // updateProfileimg(file)
    const formData = new FormData();
    formData.append('',e.target.files[0])
    axios({
      method:"PUT",
      url:"https://boiling-shelf-43809.herokuapp.com/user/editProfile",
      data:formData,
      headers:{"authorization":`${token}`}
    }).then(resp=>{
      (console.log(resp))
      getUsers();
    })
}

const deleteaccount=()=>{
  fetch("https://boiling-shelf-43809.herokuapp.com/user/deleteAccount",{
    method:"delete",
    headers:{"authorization":`${token}`}
  }).then(resp=>resp.json())
  .then(result=>{
    console.log(result)
    history.push("/")
    localStorage.clear();
  }).catch(err=>console.log(err))
}
    return (
        <div className="container-fluid">
            <Row>
            <Col md={8}style={{marginLeft:"10px",Color:'primary'}} >
                <Card className={styles.cardprofile} style={{height:"41rem"}} >
               
            
            <Card.Body style={{padding:"26px", marginTop:"10px"}} >
            <Form onSubmit={(e)=>updateProfile(e)} className="text-primary">
              <div style={{ marginBottom:"30px",color:'#062847'}}>
              <h3>
                Edit Profile
                </h3></div>
              
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label >Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="name"
                    defaultValue={name !== "undefined" ? name : null}
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                  </Form.Group>

                </Form.Row>

                <Form.Group controlId="formGridAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control 
                  type="text" 
                  placeholder="Apartment, or floor"
                  defaultValue={address !== "undefined" ? address : null}
                  onChange={(e)=>setAddress(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formGridSpecialist">
                  <Form.Label>Specialist</Form.Label>
                  <Form.Control 
                  type="text" 
                  placeholder="Specialist.."
                  defaultValue={track !== "undefined" ? track : null}
                  onChange={(e)=>setTrack(e.target.value)}
                  />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter your Phone"
                    defaultValue={phone !== "undefined" ? phone : null}
                    onChange={(e)=>setPhone(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label color="primary">Email</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Enter your Email"
                    defaultValue={email !== "undefined" ? email : null} 
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                  </Form.Group>
                  
                

                </Form.Row>
                <div className="form-group">
                <Form.Label color="primary">Bio</Form.Label>
                          <textarea
                          className="form-control"
                          placeholder="Enter Bio ..."
                          rows="3"
                          defaultValue={bio !== "undefined" ? bio : null}
                          onChange={(e)=>setBio(e.target.value)}
                          />
                      </div>

                

                <Button variant="primary " 
                style={{backgroundColor:'#216583'}} 
                type="submit"
                
                >
                  Update Profile
                </Button>
              </Form>
            </Card.Body>     
                </Card>
                </Col>
                <Col md={3}>
                
                <Card style={{ width: '26rem',minHeight:"20rem" }} className={styles.cardprofile} >
               
                  <div className={styles.imgprofile}>
                    <Card.Img variant="top" src={users.url} style={{margin:"0px", borderRadius:"0%", width:"100%"}}  />
                    
                    <input type="file" name="file" id="inputfile" accept="image/*"
                  onChange={(e)=>{
                    // imageHandler(e)
                    handleChangeFile(e) 
                  }
                  }
            />
                          <div className={styles.editimg} > 
                            <label htmlFor="inputfile" style={{cursor:"pointer"}}>
                            <HiOutlineCamera className={styles.iconimg} />
                            </label>
                 
                      </div>
                    </div> 
                    <Card.Body className="text-center">
                        <Card.Title><strong>{users.name !== "undefined"  && users.name ? users.name : null}</strong></Card.Title>
                
                        <Card.Title style={{color:"rgba(0,0,0,0.3)"}}>
                           <strong>{users.bio !== "undefined" && users.bio ? users.bio : null}</strong>
                        </Card.Title>
                        <Card.Title>
                           <strong>{users.track !== "undefined" && users.track ? users.track : null} </strong>
                        </Card.Title>
                        <Card.Title>
                           <strong> {users.email !== "undefined" && users.email ?<HiOutlineMail /> : null} {users.email !== "undefined" && users.email ? users.email : null}</strong>
                        </Card.Title>
                        <Card.Title >
                           <strong> {users.phone !== "undefined" && users.phone ?<AiOutlinePhone/> : null} {users.phone !== "undefined" && users.phone ? users.phone : null}</strong>
                        </Card.Title>
                        <Card.Title >
                           <strong> {users.address !== "undefined" && users.address ?<FaRegAddressCard/> : null} {users.address !== "undefined" && users.address ? users.address : null}</strong>
                        </Card.Title>

                        <Button onClick={()=>deleteaccount()} variant="primary "  style={{backgroundColor:'#216583'}}   >
                          Delete Account
                          </Button>
                    </Card.Body>
                   
                  
                </Card>
                
              
                </Col>

                
               
            </Row>
            
        </div>
    )
}

export default ProfileLayout