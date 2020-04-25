import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

const Messages = ({messages, username}) => {
  
    return(
    <ScrollToBottom>
        <div className="messages">
        {messages.map((message) => <div><Message message={message} username={username} /></div>
        )}
        </div>
    </ScrollToBottom>
    )
}

export default Messages;