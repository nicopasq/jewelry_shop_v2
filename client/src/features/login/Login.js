import React, { useState } from "react";
import {  useDispatch } from "react-redux";
import Container from '@mui/material/Container';
import { Button, TextField, Typography } from "@mui/material";
import './login.css'
import { Link, useNavigate } from "react-router-dom";

function Login(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        username:'',
        password:''
    })

    function handleSubmit(e){
        e.preventDefault();
        fetch('/login', {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
                },
            body: JSON.stringify(login)
        })
        .then(r => r.json())
        .then(data => {
            if (!data.error){
                dispatch({type:'currentUser/login', payload:data})
                navigate('/home')
            } else{
                console.log(data.error)
            }
        })
    }

    return(
        <Container>
            <form id="loginForm" onSubmit={(e) => handleSubmit(e)}>
                <Typography variant="h3" id="businessName">Rock Hound</Typography>
                <TextField 
                    id="username"
                    placeholder="username" 
                    margin="dense" 
                    className="loginInput"
                    name="username"
                    value={login.username}
                    onChange={(e) => setLogin({...login, username:e.target.value})}/>
                <TextField 
                    id="password" 
                    type="password"
                    placeholder="password" 
                    className="loginInput" 
                    margin="dense"
                    name="password"
                    value={login.password}
                    onChange={(e) => setLogin({...login, password:e.target.value})}/>

                <Button type="submit" id="loginBtn" variant="contained">Login</Button>
                <Link to='/signup'>
                    <Button variant="text" id="signupRoute"><u>Sign Up</u></Button>
                </Link>
            </form>
        </Container>
    )
}

export default Login;