import React,{useState} from 'react'
import { Card, Col, Modal, Row,Button } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Router } from 'react-router-dom';
import Teamcontent from "./Teamcontent"

import photo from "./pietra-schwarzler-FqdfVIdgR98-unsplash.jpg";

const Cardteams = ({cardlist,create,update}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [state, setstate] = useState({title:""});

    const handlecreate=()=>{
            console.log(state);
        create(state);
    }

   const handleupdate=()=>{
       console.log(state);
    update(state);
   }
    const cards=cardlist.map(({id,title})=>(
        
        <Col key={id} md={4}>
            
        <Card className="text-center" style={{ width: '19rem', height:"22rem"}}>
            <Card.Img variant="top" src={photo} style={{marginTop:"10px"}}/>
            <Card.Body>
            <Link to={"/Teamcontent/"+id} style={{textDecoration:"none",color:"black"}}>
                <Card.Title style={{fontWeight:"bold",fontFamily:"arial"}}>{title}</Card.Title>
                </Link>
                <Link className="btn btn-primary" onClick={handleShow2}>Update</Link>
                {/* <Modal show={show2} onHide={handleClose2}> 
                        <Modal.Header closeButton>
                        <Modal.Title>Update Team</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input placeholder="Title" onChange={(event)=>{setstate({title:event.target.value})}}></input>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" onClick={handleupdate}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                </Modal> */} 
            </Card.Body>
            </Card>
        </Col>
       
    ))
    return (
        <div className="container">

<Row style={{justifyContent:"center"}}>
           <button className="btn btn-success" onClick={handleShow}>Create</button>
           </Row>

           <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create Team</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input placeholder="Title" onChange={(event)=>{setstate({title:event.target.value})}}></input>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handlecreate}>
                    Save Changes
                </Button>
                </Modal.Footer>
        </Modal>
        <Row>
        {cards}
        </Row> 
    </div>
    )
}

export default Cardteams
