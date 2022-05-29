import React,{useState} from 'react'
import "./conversation.css"
import image from "./image.jpg" 
import {useHistory } from 'react-router-dom';
import { RiDeleteBin5Line } from "react-icons/ri";


const Conversation = ({conversations,setCurrentChat,deleteCov}) => {
    console.log("conv",conversations)
    const history=useHistory();
    // const [item, setitems] = useState({})
    function timeTo12HrFormat(date)
    {   
      var today = new Date(date);
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();  
      // Take a time in 24 hour format and format it in 12 hour format
        var time_part_array = time.split(":");
        var ampm = 'AM';
    
        if (time_part_array[0] >= 12) {
            ampm = 'PM';
        }
    
        if (time_part_array[0] > 12) {
            time_part_array[0] = time_part_array[0] - 12;
        }
    
       const formatted_time = time_part_array[0] + ':' + time_part_array[1] + ' ' + ampm;
    
        return formatted_time;
    }

    const myid=localStorage.getItem("id")
    return (
        <>
        {
            conversations.map((item,ind)=>{
                return(
                 
                        <div key={item.id} className="conversation" 
                        onClick={
                            // ()=>setCurrentChat(item)
                         () =>  history.push(`/Message?convId=${item.id}`)
                        }    
                        >
                        
                        <img className="conversationImg" src={item.users[0].id !== myid? item.users[ind=0].url : item.users[ind=1].url} alt=""/>
                        <div>
                        <span className="conversationName">{item.users[ind=0].id !== myid? item.users[ind=0].name : item.users[ind=1].name}</span>
                        <p style={{color:"gray"}}>{item.lastMessage?.content ? item.lastMessage.content : null}</p>
                        </div>
                        <p className="lastmsgtime">{item.lastMessage?.createdAt ? timeTo12HrFormat(item.lastMessage.createdAt) : null}</p>
                        {/* <div className="icondiv">
                            <RiDeleteBin5Line className="deleteicon" onClick={()=>deleteCov(item.id)} />
                        </div> */}
                    </div>
                    
                )
            })
        }
        
       </>
        
    )
}

export default Conversation
