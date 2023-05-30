import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,Navigate   } from 'react-router-dom';
import '../stylesheet/App.css';
import '../stylesheet/signup.css';
import newpic from '../assets/newpic.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import {faEnvelope, faKey, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelope, faKey, faUser, faLock);

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
    Company_Name:name,    
    username: username,
    password: password,
    };

    try {
        if(!isValidEmail){
            alert('Invalid Email')
        }
        else if(password !== cpassword){
            alert('Confirm Password must be Equal!!!')
        }
        else if(password.length<4){
            alert('Password Length must br Greater than 4!!!')
        }
        else if(password === cpassword){
            const response = await axios.post('http://localhost:8080/users/signup', user);
            if (response.status===200) {
              alert("Created")
              setUsername('');
              setPassword('');
              setLoggedIn(true)
            } else {
              alert("Error")
            }   
        }
        else{
            alert('Check You Fields')
        }
    } catch (error) {
      alert('Inavlid Email or Email already Exist!!!!')
    }
  };

  const [isValidEmail, setIsValidEmail] = useState(true);
  const handleUsernameChange = (e) => {
    const enteredUsername = e.target.value;
    setUsername(enteredUsername);

    // Email pattern validation
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const isValid = emailPattern.test(enteredUsername);
    setIsValidEmail(isValid);
  };

  useEffect(()=>{
    if(username.length===0){
        setIsValidEmail(true)
    }
  },[username])

  if (loggedIn) {
    console.log('here',loggedIn)
    return <Navigate to='/' />;
  }

  return (

    <div className='maindiv'>
        <div className='card'>
            <div className='div1sign'>
                <div className='loginstyle'>
                    <div className='welcomestyle'>
                        <h3 className='projectName'>Compromise Assesment</h3>
                        <h3 className='text1'>Create Your Account</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='formfields'>
                            <FontAwesomeIcon icon={faUser} color='#629B94'/>
                            <input className='inputfield'
                                type="text" 
                                name="username"  
                                placeholder = "Company Name"
                                required
                                autoComplete='off'
                                onChange={(e) => setname(e.target.value)}
                                >
                            </input>
                        </div>
                        
                        <div className="formfields">
                          <FontAwesomeIcon icon={faEnvelope} color="#629B94" />
                          <input
                            className={`inputfield ${isValidEmail ? '' : 'invalid'}`}
                            type="text"
                            name="username"
                            placeholder="Email"
                            onChange={handleUsernameChange}
                            autoComplete='off'
                            required
                          />
                        </div>

                        <div className='formfields'>
                            <FontAwesomeIcon icon={faKey} color='#629B94'/>
                            <input className='inputfield' 
                                type="password" 
                                name="username"  
                                placeholder = "Password"
                                required
                                autocomplete="new-password"
                                onChange={(e) => setPassword(e.target.value)}
                                >
                            </input>
                        </div>

                        <div className='formfields'>
                            <FontAwesomeIcon icon={faLock} color='#629B94'/>
                            <input className='inputfield' 
                                type="password" 
                                name="username"  
                                placeholder = "Confirm Password"
                                onChange={(e) => setcPassword(e.target.value)}
                                required>
                            </input>
                        </div>
                        
                        <input className='loginbutton1' type="submit" value="Sign up"/>
                    </form>
                    <div className='signuplinkdiv'>
                    <h6 className='text1'>Don't have an account?</h6>
                          <Link to="/" style={{textDecoration:'none'}}><h6 className='text'>Login</h6></Link>
                    </div>

                </div>

            </div>

            <div className='div2'>
                <img src={newpic} alt="imagehere" ></img>
            </div>

        </div>

    </div>

);
}

export default Signup;
