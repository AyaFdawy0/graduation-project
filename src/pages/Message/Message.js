import React, { useRef } from 'react';
import io from "socket.io-client"
import Header from '../../Components/Navbar/Navbar';
import Chat from './Chat';
import ChatOnline from "./ChatOnline"
import Conversation from './Conversation';
import {useState,useEffect} from "react"
// import {ChatEngine}  from 'react-chat-engine';
import "./messenger.css"; 
// import chatimg from "./undraw_Chat_re_re1u.png"
 import chatimg from "./undraw_Chat_re_re1u.svg"
import queryString from "query-string"
import { Card } from 'react-bootstrap';
import {useHistory } from 'react-router-dom';
import { RiDeleteBin5Line } from "react-icons/ri";


const Message = ({location}) => {
  const history=useHistory();

  const {convId}=queryString.parse(location.search)
  const myid=localStorage.getItem("id")
//  const userid=props.match.params.id;
  // console.log("userid",props.match.params.id)
 const [s, setSocket] = useState();
  const token = localStorage.getItem("token");
 const [newMessege, setNewMessege] = useState("")
  const [currentChat,setCurrentChat]=useState(null)
  const [message,setMessage]=useState([])
  const [arrivalMessage,setArrivalMessage]=useState(null)
  const[conversations,setConversations]=useState([])
  const scrollRef=useRef()
  
  useEffect(() => {
   const Socket= io('https://boiling-shelf-43809.herokuapp.com/chat');
    Socket.on('connect', () => {
      Socket.emit('authenticate',{token:token })
      
    });
    Socket.on("new message",(data)=>{
        //  console.log("data",data)
         console.log("data",data.msg)
         setArrivalMessage(data.msg)
         if(arrivalMessage){
          setMessage(prev=>[...prev, ...arrivalMessage])  
         }
       })
    console.log(Socket)
      setSocket(Socket) 
  }, [])

  useEffect(() => {
    console.log("convId",convId)
    if(convId){
      fetch(`https://boiling-shelf-43809.herokuapp.com/conversations`,{
        headers:{"authorization":`${token}`}
    }).then(res=>res.json())
    .then(result=>{
      const result2=result.filter((item)=>{
        if(item.id==convId){
          return item
        }
      })
      console.log(result2[0])
      setCurrentChat(result2[0])
    })
    }
  }, [convId])
  
 useEffect(() => {
  
  getconversations();
  // console.log(conversations.length)
}, [newMessege])

const getconversations=()=>{
  fetch("https://boiling-shelf-43809.herokuapp.com/conversations",{
      headers:{"authorization":`${token}`}
  }).then(res=>res.json())
  .then(result=>{
    // console.log(result)
    setConversations(result)
  })
}

useEffect(() => {
  
  getMessages()
}, [currentChat,arrivalMessage])

const getMessages= ()=>{
  try{
    fetch(`https://boiling-shelf-43809.herokuapp.com/conversations/${currentChat.id}/messages`,{
      headers:{
        "authorization":`${token}`
      }
    }).then(resp=>resp.json())
    .then(result=>{
      console.log("messages",result.messages)
      setMessage(result.messages)
      setNewMessege("")
    })
  } catch(err){
    console.log(err)
  }
}
const receivedId=currentChat?.users[0].id !==myid ? currentChat?.users[0].id:currentChat?.users[1].id
// console.log("currentid",receivedId)

const handlesendmsg=(message)=>{
  console.log(message)
   s?.emit("private",{
     to:receivedId,
     content:message
   })
   getMessages();
   getconversations();
}

 useEffect(() => {
   scrollRef.current?.scrollIntoView({behavior:"smooth"})
 }, [message])
console.log("currentchat",currentChat)

 const deleteCov=(Id)=>{
   console.log(Id)
  fetch(`https://boiling-shelf-43809.herokuapp.com/deleteChat/${Id}`,{
    method:"delete",
    headers:{
        "authorization":`${token}`
      },
    }).then(res=>res.json())
    .then(result=>{
      console.log(result)
      const newData = conversations.filter(item=>{
        return item.id !==Id
      })
      setConversations(newData)
    }).catch(err=>{
      // console.log(err)
      setCurrentChat(null)
      getconversations();
      history.push("/Message")
    
    })
 }
  return (
      <>
      <Header/>
        <div className="messeger">
        <Card className="cardconversation">
    <div className="chatMenu">
     
      <div className="chatMenuWrapper">
        {/* <input placeholder="search for friends" className="chatMenuInput"/> */}
        <p className="chatsSection">Chats <span>{conversations.length} </span></p>

        {
         conversations.length == 0 ?
         <> 
              <div className="noconversation">Nothing chats to show</div>  
         </>:   
              <>
                <Conversation conversations={conversations} setCurrentChat={setCurrentChat} />
              </>
        } 
      
      </div>
     
    </div>
    </Card>

   
    <div className="chatBox">
    <div className="chatBoxWrapper">
      {
        currentChat? <>
        <div className="headerChat">
          <img className="headerChatimg" src={currentChat.users[0].id !== myid? currentChat.users[0].url :currentChat.users[1].url}/>
          <p className="headerChatTitle">{currentChat.users[0].id !== myid? currentChat.users[0].name :currentChat.users[1].name}</p>
         <div className="icondiv">
            <RiDeleteBin5Line className="deleteicon" 
            onClick={()=>deleteCov(currentChat.id)} 
            
            />
        </div>
        </div>
        {/* <Card className="cardchatBox"> */}
        <div className="chatBoxTop">
          {
           message.length!==0 && message.map((m)=>(
             <div ref={scrollRef}>
              <Chat message={m}
               own={m.user?.id === myid}
               />

             </div>
            )).reverse()
          }
           
        </div>

       
    {/* </Card> */}
    <div className="chatBoxBottom">
        <input className="chatMessageInput" 
        placeholder="write some thing ..." 
        onChange={(e)=>setNewMessege(e.target.value)}
        value={newMessege}
        ></input>
        <button 
        onClick={()=>handlesendmsg(newMessege)} 
        className="chatSubmitButton">Send</button>
      </div>
        </> : (
        <div className="startconvsection">
          <img className="startconvsectionImg" src={chatimg}/>
          <p className="startconvsectionTitle">start conversation</p>
        </div>
        )
}
      
      
      
        
    </div>
    </div>
  </div>
      </>
  )
}
export default Message;