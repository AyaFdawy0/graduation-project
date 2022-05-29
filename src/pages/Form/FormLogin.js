import React ,{useEffect,useState} from 'react';
import validateInfo from './validateInfo';
import useForm from './useForm';
import styles from './Form.module.css';
import {Link, Redirect,useHistory} from "react-router-dom"
import Navbar from "./Navbar"
import "./signup.css"
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import Nav from "./Nav"
import { Col, InputGroup, Row } from 'react-bootstrap';
import imglogin from "./undraw_Hello_re_3evm.png"
import firebase from "../../Firebase"
import axios from "axios"
import NavbarForm from "./navbarForm"
import { ToastContainer, toast } from 'react-toastify';



const FormLogin = ({ submitForm }) => {
  const history =useHistory();
  const [errors, setErrors] = useState({});
  const [dataIsCorrect,setDataIsCorrect]=useState(false);
  const [deviceType, setDeviceType] = useState("web");
  const [token, setDeviceToken] = useState("");


useEffect(() => {
  const messaging =firebase.messaging()
  messaging.requestPermission().then(()=>{
    return messaging.getToken()
  }).then(token=>{
    console.log("Token:",token)
    setDeviceToken(token)
  }).catch(()=>{
    console.log("error")
  })
}, [])
useEffect(()=>{
  if(localStorage.getItem("user-info")){
    // let user=JSON.parse(localStorage.getItem("user-info"))
    // const { id} = user;
    const id = localStorage.getItem("id")
    history.push("/Profile/"+id) 
  }
})
  const { handleChange, values } = useForm(
    submitForm
    // validate
  );

   function handleSubmitlogin (e) {
    e.preventDefault();
    setErrors(validateInfo(values))
    // console.warn(values.email,values.password);
    let email=values.email
    let password=values.password
    let item={email,password}
    setDataIsCorrect(true);
    console.warn(item);
    // console.warn(errors)
    console.warn(dataIsCorrect)
    
    if (Object.keys(errors).length === 2){
       fetch("https://boiling-shelf-43809.herokuapp.com/user/signin",{
        method:"POST",
        body:JSON.stringify(item),
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json"
        }
      }).then(resp=>{
        if(!resp.ok){
          throw Error("Unauthorized")    
        }
       return resp.json()
      })
      .then(result=>{
        console.warn("result",result);
        localStorage.setItem("user-info",JSON.stringify(result))
        localStorage.setItem("token",(result.token))
        localStorage.setItem("id",(result.user.id))
        localStorage.setItem("name",(result.user.name))
        localStorage.setItem("email",(result.user.email))
        localStorage.setItem("deviceToken",(token))
        const id = localStorage.getItem("id")
        let item2={deviceType:`${deviceType}`,token:`${token}`}
        axios({
          method:"POST",
          url:"https://boiling-shelf-43809.herokuapp.com/notifications/subscribe",
          data:item2,
          headers:{"authorization":`${result.token}`}
        }).then(res=>console.log(res.data))
        
        history.push("/Profile/"+id)
      }).catch(err=>{
        toast.error("Unauthorized")
          console.log(err.message)
       } )
      // result= await result.json()  
     
    }
    
  }
  return (
    <>
    <NavbarForm/>

        <Row className="login mt-md-5">
          <Col md={6} className="leftside">
          <h2 className="form-title">login</h2>

          <form onSubmit={handleSubmitlogin} noValidate className="login-form">
          <div className="form-group">
                <label htmlFor="email">
                <HiOutlineMail className="iconinput"/>
                </label>
                <input
         
            // className={styles.forminput}
            
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
           {errors.email && <p>{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password">
                <RiLockPasswordFill className="iconinput"/>
                </label>
                <input
                  
                  // className={styles.forminput}
                  
                  type='password'
                  name='password'
                  placeholder='Enter your password'
                  value={values.password}
                  onChange={handleChange}
                  />
                  {errors.password && <p>{errors.password}</p>}
              </div>

              <div className="form-group">
               <button style={{backgroundColor:"#216583",borderColor:"#216583"}} type='submit' className="btn btn-primary">
                login
              </button> 
                <p style={{marginTop:"10px",color:"black",fontSize: "16px"}}>
                Don't have acount ?
                  <Link to="/Form" style={{textDecoration:"none"}}> Sign up</Link></p>
              </div>
          </form>
          </Col>
          <Col Col md={6} className="rightside">
            <img src={imglogin} />
          </Col>
          <ToastContainer />
        </Row>
    </>
      
   
  );
};

export default FormLogin;
