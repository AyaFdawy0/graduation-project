import React,{useState} from 'react'
import { Col, Row } from 'react-bootstrap';
import {Link, useHistory} from "react-router-dom"
import { HiOutlineMail } from "react-icons/hi";
import { MdVerifiedUser } from "react-icons/md";
import actimg from "./undraw_secure_login_pdn4.png"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Activate = () => {
 const useremail=localStorage.getItem("email");
    const history=useHistory();
    const [values, setValues] = useState({
        email: `${useremail}`,
        code: ''
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value
        });
      };
      function handleSubmit(e){
        e.preventDefault();
        console.warn("values",values)
         fetch("https://boiling-shelf-43809.herokuapp.com/user/verifyCode",{
            method:"POST",
            body:JSON.stringify(values),
            headers:{
              "Content-Type":"application/json",
              "Accept":"application/json"
            }
          }).then(resp=>{
            if(!resp.ok){
              throw Error("code is not correct . plz, try again")    
            }
           return resp.json()
          })
          .then(result=>{
            console.warn("result",result);
            localStorage.setItem("user-info",JSON.stringify(result))
            localStorage.setItem("token",(result.token))
            localStorage.setItem("id",(result.user.id))
            localStorage.setItem("name",(result.user.name))
            // localStorage.setItem("email",(result.user.email))
            localStorage.setItem("url",(result.user.url))
            const id = localStorage.getItem("id")
            history.push("/Profile/"+id)
          }).catch(err=>{
            toast.error("code is not correct . plz, try again")
              console.log(err.message)
          })
        // result= await result.json()
       
      }
      const sendagin=()=>{
        let item={email:useremail}
        fetch("https://boiling-shelf-43809.herokuapp.com/user/sendAgain",{
          method:"POST",
          headers:{
              "Accept":"application/json",
              'Content-Type':'application/json'
         },
          body:JSON.stringify(item)
        }).then(res=>res.json())
        .then(result=>{
          console.log(result)})
          .catch(err=>{
          toast.success("code sent successfully")
          })
      }
    return (
        // <div>
        //    <h1> activation</h1>
        //    <form onSubmit={(e)=>handleSubmit(e)}>
        //    <input type="email" name="email" placeholder="enter email" onChange={(e)=>handleChange(e)}/>
        //    <input type="text" name="code" placeholder="enter code" onChange={(e)=>handleChange(e)}/>
        //    <button type="submit">submit</button>
        //    </form>
        // </div>
        <>
          <Row className="activate mt-md-5">
            <Col md={6} className="leftside">
            <h2 className="form-title">Activate your acount</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="form-group">
                  <label htmlFor="email">
                  <HiOutlineMail className="iconinput"/>
                  </label>

                  <input type="email"
                     name="email"
                     defaultValue={useremail}
                    placeholder="Enter email"
                    onChange={(e)=>handleChange(e)}/>
              </div>

              <div className="form-group">
                  <label htmlFor="code">
                  <MdVerifiedUser className="iconinput"/>
                  </label>

                  <input type="text"
                    name="code"
                    placeholder="Enter code" 
                    onChange={(e)=>handleChange(e)}/>
              </div>
              <div className="form-group">
               <button type='submit' className="btn btn-primary">
                Submit
              </button> 
              <p style={{marginTop:"10px",color:"black",fontSize: "16px"}}>
                If you not received code ? 
                  <Link onClick={sendagin} style={{textDecoration:"none"}}> send again</Link></p>
              </div>
            </form>
            </Col>
            <Col md={6} className="rightside">
              <img src={actimg} />
            </Col>
          <ToastContainer />

          </Row>
        </>
    )
}

export default Activate
