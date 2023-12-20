import { Button, Typography } from "@mui/material";
import React from "react";
import './quickLinks.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function QuickLinks(){
    const currentUser = useSelector(state => state.currentUser.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout(){
        fetch('/logout',{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(currentUser)
        })
        dispatch({type:'currentUser/logout', payload:undefined})
        navigate('/')
    }

    return(
        <div id="quickLinksContianer">
            <Button onClick={(e) => handleLogout(e)} id="logoutBtn">Logout</Button>
            <Link to='/profile' id="profileBtn">
                <Typography variant='body1'>Profile</Typography>
            </Link>
        </div>
    )
}

export default QuickLinks;