import React from 'react'
import "./chatOnline.css"
import image from "./image.jpg"
const ChatOnline = () => {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src={image}/>
                    <div className="chatOnlineBadge"></div>
                </div>
                <div className="chatOnlineName">
                    John doe
                </div>
            </div>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src={image}/>
                    <div className="chatOnlineBadge"></div>
                </div>
                <div className="chatOnlineName">
                    John doe
                </div>
            </div>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src={image}/>
                    <div className="chatOnlineBadge"></div>
                </div>
                <div className="chatOnlineName">
                    John doe
                </div>
            </div>
        </div>
    )
}

export default ChatOnline
