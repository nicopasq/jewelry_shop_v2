import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Container from '@mui/material/Container';
import { Alert, Button, TextField, Typography } from "@mui/material";
import './signup.css'
import { Link, useNavigate } from "react-router-dom";

function Signup(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const mounted = useRef(false)
    const [alertDisplay, setAlertDisplay] = useState({display:"none"})
    const [alertError, setAlertError] = useState([])
    const [signup, setSignup] = useState({
        username:'',
        password:'',
        confirmation:''
    })

    let timeOut = undefined
    if (mounted.current === true){
        timeOut = setTimeout(() => {
            setAlertDisplay({display:'none'})
        }, 5000)
    }

useEffect(() => {
    mounted.current = true
    
    return () => {
        clearTimeout(timeOut)
        mounted.current = false
    }
}, [timeOut])


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
                const errors = data.errors.map((error, index) => (
                    <Typography variant="body1" key={index}>{error}</Typography>
                ))
                setAlertError(errors)
                setAlertDisplay({display:true})
            }
        })
    }

    return(
        <Container>
            <Alert severity="error" id='signupAlert' sx={alertDisplay}>{alertError}</Alert>
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