import React from 'react';


const Message = ({username, message}) => {
   
    let isSentByUser = false;
    if(username === message.user){
        isSentByUser = true;
    }

    return (
        isSentByUser ? (
            <div className="usermessage-container">  
                <div>  
                <p className="usercontainer">{message.message}</p>
                <p className="username">You</p>
                </div>
            </div>
        ) : (
            <div className="notusercontainer">
                <div>
                
                <p className="usercontainer">{message.message}</p>
                <p className="not-user">{message.user}</p>
                </div>
            </div>
        )
    )
}

export default Message;