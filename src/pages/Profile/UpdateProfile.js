import React ,{useState,useEffect} from 'react'
import {useHistory} from "react-router-dom"
import { Badge, Button, Card, Col, Form, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import Header from '../../Components/Navbar/Navbar';


const UpdateProfile = (props) => {
  const history =useHistory();
  const id=props.match.params.id
    console.warn(props.match.params.id)
  const token=localStorage.getItem("token")
  const [users, setUser] = useState([])
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("pietra-schwarzler-FqdfVIdgR98-unsplash.jpg");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setUsername] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [url, setUrl] = useState("");

  const [userId,setUserId]=useState(null)
    useEffect(() => {
        getUsers();
      }, [])
      function getUsers() {
        fetch("https://boiling-shelf-43809.herokuapp.com/user/"+id+"/profile"
        , {
          headers:{
            "authorization":`${token}`
          }
        }
        ).then((result) => {
          result.json().then((resp) => {
            console.warn(resp.profile)
            setUser(resp.profile)
            setBio(resp.profile.bio)
            setPhone(resp.profile.phone)
            setEmail(resp.profile.email)
            // setAddress(resp.address)
            setUsername(resp.profile.name)
            setUrl(resp.profile.url)

            // setSpecialist(resp.specialist)
            // setUserId(resp.id)
          })
        })
      }

      function updateUser()
  {
    let item={name,bio,phone,email,image}
    console.warn("item",item)
    // fetch('https://boiling-shelf-43809.herokuapp.com/user/editProfile', {
    //   method: 'PUT',
    //   headers:{
    //     'Accept':'application/json',
    //     'Content-Type':'application/json',
    //     "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJFbGthc2FieSIsInN1YiI6IjYwZDMzZjRjNWFjZDg2MDAyMjhhMzVlMiIsImphdCI6MTYyNDQ1NzE2NjA3MywiZXhwIjoxNjI0NTQzNTY2MDczLCJpYXQiOjE2MjQ0NTcxNjZ9.hvdiK2hl6foLosEu3UHePiyYzujhJW2NpDmr2n1auwg"
    //   },
    //   body:JSON.stringify(item)
    // }).then((result) => {
    //   result.json().then((resp) => {
    //     console.warn(resp)
    //     // getUsers()
    //     // alert("profile updated")
    //     // history.push("/Profile/"+props.match.params.id)
    //   })
    // })
  }
    return (
        <>
        <Header/>
          <div className="container updateprofile" style={{marginTop:"20px"}}>
            <h1 className="text-center" style={{marginBottom:"20px"}}>Update Profile</h1>
            <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
    <Form.Label column sm="2">
      Name
    </Form.Label>
    <Col sm="10">
      <Form.Control type="text" value={name} onChange={(e)=>{setUsername(e.target.value)}} placeholder="Name" />
    </Col>
  </Form.Group>
  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
    <Form.Label column sm="2">
     Specialist
    </Form.Label>
    <Col sm="10">
      <Form.Control type="text" value={specialist} onChange={(e)=>{setSpecialist(e.target.value)}} placeholder="Specialist" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
    <Form.Label column sm="2">
      Description
    </Form.Label>
    <Col sm="10">
      <Form.Control type="text" value={bio} onChange={(e)=>{setBio(e.target.value)}} placeholder="Description" />
    </Col>
  </Form.Group>
  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
    <Form.Label column sm="2">
      Phone
    </Form.Label>
    <Col sm="10">
      <Form.Control type="text" value={phone} onChange={(e)=>{setPhone(e.target.value)}} placeholder="Phone" />
    </Col>
  </Form.Group>
  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
    <Form.Label column sm="2">
      Email
    </Form.Label>
    <Col sm="10">
      <Form.Control type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" />
    </Col>
  </Form.Group>
  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
    <Form.Label column sm="2">
      Address
    </Form.Label>
    <Col sm="10">
      <Form.Control type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder="Address" />
    </Col>
  </Form.Group>
  <Form.Group as={Row} style={{justifyContent:"center"}} className="mb-3" controlId="formPlaintextPassword">
  <Button onClick={updateUser} style={{fontSize:"1.2rem"}}>Update</Button>
  </Form.Group>
</Form>
        </div>
        </>
    )
}

export default UpdateProfile

