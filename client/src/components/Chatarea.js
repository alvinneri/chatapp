import React , {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import io from 'socket.io-client';
import queryString from 'query-string'; 
import { animateScroll} from 'react-scroll';


import Messages from './Messages';

let socket;
const Chatarea = ({location}) => {

    const history = useHistory();
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'https://chat-app-binbai.herokuapp.com/'
    const [isLoggedIn, setisLoggedIn] = useState(false);

    
    useEffect(() => {
        
        const {username , isLoggedIn} =  queryString.parse(location.search)
    
        socket =io(ENDPOINT);
        setUsername(username);
        setisLoggedIn(isLoggedIn)

        if(!isLoggedIn){
            history.push('/');
        }

        socket.emit('login', {username : username});

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    },[ENDPOINT, location.search])

    useEffect(()=>{
        socket.on('message', (message) => {
            setMessages([...messages , message])
        })

        
    },[message]);

    useEffect(()=>{
        scrollToBottom();
    },[messages])


    const handleChange = (e) => {
        setMessage(e.target.value)      
    }

    const sendMessage = (e) => {
        e.preventDefault();
        if(message != ''){
            socket.emit('sendMessage', message, ()=>{
                setMessage('');
            })
        }
        console.log(messages);
    }

    const logOut = () => {
        setisLoggedIn(false);
        socket.emit('disconnect')
        socket.off();
        history.push('/')
    }

    const scrollToBottom =() => {
        animateScroll.scrollToBottom({
            containerId: "contents"
        })
    }
   
    return (
        
        <div className="chatarea">
            <div className="logout">
                <button className="button-gray" onClick={logOut}>Log Out</button>
            </div>
            <div className="contents" id="contents">
               <Messages messages={messages} username={username}/>
            </div>
            <div >
                <form onSubmit={sendMessage}>
                <input type="text" id="message" placeholder="Start a new message" onChange={handleChange} value={message}/>
                <button className="button-gray" type="submit" >Send</button>
                </form>
            </div>

        </div>
    )
}

export default Chatarea;