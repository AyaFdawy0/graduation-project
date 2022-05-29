import React, {useState} from 'react'
import moment from 'moment';
import Modal from "react-modal"
import Datetime from "react-datetime";
import {DateTimePickerComponent, TimePickerComponent} from "@syncfusion/ej2-react-calendars"
import "react-datetime/css/react-datetime.css";
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width : "30%",
      paddingLeft:"30px",
      paddingRight:"30px"

    }
  };

export default function AddEventModal({isOpen,onClose,onEventAdded}){
    const [title, setTitle] = useState("")
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
   const onSubmit =(event)=>{
    event.preventDefault();
    onEventAdded({
        title,
        start,
        end
    })
    onClose();
   }
    
    return(
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
            <div style={{marginBottom:"40px"}}>
            <h2>Add Event</h2>
            </div>
            <form className="eventForm" onSubmit={onSubmit}>
                <input className="eventTitle" placeholder="title" value={title} onChange={e=> setTitle(e.target.value)}/>
                <div style={{marginBottom:"20px", marginTop:"20px"}}>
                    <label>Start Date</label>
                   {/* <Datetime value={start} onChange={date=>setStart(date)} /> */}

                <TimePickerComponent value={start} placeholder="choose start date and time" 
                onChange={
                    date=>{
                        // setStart(date.value)
                        console.log(date)
                    
                    }
                    }></TimePickerComponent>
                </div>

                <div>
                    <label>End Date</label>
                <DateTimePickerComponent value={end} placeholder="choose end date and time" onChange={date=>setEnd(date.value)}></DateTimePickerComponent>

                  {/* <Datetime value={end} onChange={date=>setEnd(date)} /> */}

                </div>
                <div style={{display: "flex", justifyContent: "center", marginTop: "40px"}}>
                <button className="btn btn-primary" type="submit">Add event</button>
                </div>
            </form>
        </Modal>
    )
}
