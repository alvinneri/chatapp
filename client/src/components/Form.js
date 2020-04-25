import React , {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const Form = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        switch(e.target.name){
            case 'username':
                setUsername(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                setUsername('');
        }
    }

    const onSubmit = (e) => {

        e.preventDefault();

        const User = {
            username,
            password
        }
        
        axios.post('/login', User).then(res=>{
             
            let isLoggedIn = false;
            if(res.data.error === 'Blank'){
                document.getElementById('username').placeholder = 'Please enter a valid value';
                document.getElementById('username').classList.add('warning');
                document.getElementById('password').placeholder = 'Please enter a valid value';
                document.getElementById('password').classList.add('warning');
                
            }else if(res.data.error === "!Password"){ 
                
                document.getElementById('password').value ='';
                document.getElementById('password').placeholder = 'Password is incorrect';
                document.getElementById('password').classList.add('warning');

            }else{
                document.getElementById('username').placeholder = 'Username';
                document.getElementById('username').classList.remove('warning');
                document.getElementById('password').placeholder = 'Password';
                document.getElementById('password').classList.remove('warning');
                isLoggedIn = true;
                history.push(`/chatarea?username=${username}&isLoggedIn=${isLoggedIn}`)
            }
        })
    }

    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <input type="text" placeholder="Username" name="username" id="username" onChange={handleChange}/> <br/>
                <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange}/><br/>
               
                <button type="submit" className="button">Sign Up / Log in</button>
               
                <p>By signing up, you agree to the Terms of  Service and Privacy Policy, including Cookie Use. Others will be able to find you by searching for your email address or phone number when provided</p>
            </form>
        </div>
    )
    
}

export default Form;