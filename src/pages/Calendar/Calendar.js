import React,{useRef,useState,useEffect} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed
import listPlugin from '@fullcalendar/list'; //For List View
import "./calendar.css";
import AddEventModal from "./AddEventModal"
import "react-datetime/css/react-datetime.css";
// import { Form } from 'react-bootstrap';
// import AddItem from './Additem';
import { MdAddCircle } from "react-icons/md";
import Header from '../../Components/Navbar/Navbar';
import { Modal } from 'react-bootstrap';
// import timeGridPlugin from "@fullcalendar/timegrid";


const Calendar = () => {
  const token = localStorage.getItem("token");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentEvent, setCurrentEvent] = useState({});
  const myid=localStorage.getItem("id")
  const [eventtitle, setEventtitle] = useState("");

  // const [state,setState]=useState( [
  //   { title: 'event 1', date: '2021-07-22' },
  //   { title: 'event 2', date: '2021-07-23' }
  // ]
  // );
  const [state,setState]=useState( [
    {  title: '', start: '' }
  ]
  );
  useEffect(() => {
    getEvents()
  }, [])

  const getEvents=()=>{
    fetch("https://boiling-shelf-43809.herokuapp.com/calendar",{
      headers:{
        "authorization":`${token}`
      }
    }).then(resp=>resp.json())
    .then(result=>{
      // setData(result.post)
      console.log(result.allCalendar)
     result= result.allCalendar.map((item)=>{
         return({
         title:item.meetingName,
         start: new Date(item.meetingDate.split(" ")[0] + " " + item.meetingTime)  
        })
      })
      console.log("result",result)
      setState(result)
    })
  }
  const showing =(title)=>{
    handleShow()
    // setEventtitle(title)
    console.log(title)
    fetch(`https://boiling-shelf-43809.herokuapp.com/calendar`,{
        headers:{"authorization":`${token}`}
    }).then(resp=>resp.json())
    .then(result=>{
        const result2=result.allCalendar.filter((item)=>{
            if(item.meetingName==title){
              return item
            }
          })
          console.log("result2",result2[0])
          setCurrentEvent(result2[0])
    })

 }

 const handleDeleteEvent=(eventId)=>{
  fetch(`https://boiling-shelf-43809.herokuapp.com/calendar/${eventId}`,{
    method:"delete",
    headers:{
        "authorization":`${token}`
      },
    }).then(res=>res.json())
    .then(result=>{
      console.log(result)
      const newData = state.filter(item=>{
        return item._id !==eventId
      })
      setState(newData)
      handleClose()
      getEvents();
    }).catch(err=>console.log(err))
 }
//  const calendarRef = useRef(null);
  
//   const onEventAdded=(event)=>{
//     let calendarApi = calendarRef.current.getApi()
//     calendarApi.addEvent(event)
//   }

  
  return (
      <>
      <Header/>
         <div className="eventcalendar">
      
         
      {/* <button onClick={()=>setModalOpen(true)}>Add event</button> */}
      {/* <MdAddCircle className="addEventbtn" onClick={()=>setModalOpen(true)}/> */}
      
        <div style={{position:"relative",zIndex: 0}}>
        <FullCalendar
              plugins={[ dayGridPlugin, interactionPlugin,listPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
              }}
              events={state}
            
             
             eventClick={
               function(arg){
                 console.log(arg)
                 // console.log(arg.event._def.title)
                 // console.log(arg.event._instance.range)
                 showing(arg.event._def.title)
               }
             }  
   />
        </div>
        <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Meeting Detail</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                           {/* {eventtitle} */}
                        <div className="eventsDetail">
                        <p>Meeting Name : <span>{currentEvent.meetingName}</span></p>  
                        <p>Meeting Date : <span>{currentEvent.meetingDate?.split(" ")[0]}</span></p> 
                        <p>Meeting Time : <span>{currentEvent.meetingTime}</span></p> 
                        <p>Team Name : <span>{currentEvent.teamName}</span> </p>  
                          </div> 
                        </Modal.Body>
                        {
                          currentEvent.ownerId ==myid && <Modal.Footer style={{justifyContent:"center"}}>
                          {/* <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button> */}
                          <button style={{width:"35%",padding:"10px"}} className="btn btn-primary" 
                          onClick={()=>handleDeleteEvent(currentEvent._id)}
                          >
                            Delete
                          </button>
                    </Modal.Footer>
                        }
                        
                    </Modal>
     </div>
      </>
  )
}

export default Calendar

 



