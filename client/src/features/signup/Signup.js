import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Container from '@mui/material/Container';
import { Button, TextField, Typography } from "@mui/material";
import './signup.css'
import { Link, useNavigate } from "react-router-dom";

function Signup(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [signup, setSignup] = useState({
        username:'',
        password:'',
        confirmation:''
    })

    function handleSubmit(e){
        e.preventDefault();
        fetch('/users', {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
                },
            body: JSON.stringify(signup)
        })
        .then(r => r.json())
        .then(data => {
            if (!data.errors){
                dispatch({type: 'currentUser/signup', payload:data})
                navigate('/home')
            }else{
                console.log(data.errors)
            }
        })
    }

    return(
        <Container>
            <form id="signupForm" onSubmit={(e) => handleSubmit(e)}>
                <Typography variant="h3" id="businessName">Rock Hound</Typography>
                <TextField 
                    id="username"
                    placeholder="username" 
                    margin="dense" 
                    className="signupInput"
                    name="username"
                    value={signup.username}
                    onChange={(e) =>setSignup({...signup, username:e.target.value})}/>
                <TextField 
                    id="password" 
                    type="password"
                    placeholder="password" 
                    className="signupInput" 
                    margin="dense"
                    name="password"
                    value={signup.password}
                    onChange={(e) =>setSignup({...signup, password:e.target.value})} />
                <TextField 
                    id="confirmation" 
                    type="password"
                    placeholder="password Confirmation" 
                    className="signupInput" 
                    margin="dense"
                    name="confirmation"
                    value={signup.confirmation}
                    onChange={(e) =>setSignup({...signup, confirmation:e.target.value})}/>

                <Button type="submit" id="signupBtn" variant="contained">Signup</Button>
                <Link to='/'>
                    <Button variant="text" id="loginRoute"><u>Login</u></Button>
                </Link>
            </form>
        </Container>
    )
}

export default Signup;