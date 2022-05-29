import React from 'react'
import "./chat.css"
import image from "./image.jpg"
const Chat = ({message,own}) => {
 
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
    return (
        <div
         className={own ? "messege own" :"messege"}
        //  className={"messege"}
         
         >
            <div className="messegeTop">
                <img className="messegeImg" src={message.user?.url ? message.user.url: null}/>
            <div className="msgcontainer">
            <p className="messegeText">{message.content}</p>   
           <p className="messegeTime">  {timeTo12HrFormat(message.createdAt)}</p>

                </div> 
            </div>
            {/* <div className="messegeBottom">
                {timeTo12HrFormat(message.createdAt)}
            </div> */}
        </div>
    )
}

export default Chat
