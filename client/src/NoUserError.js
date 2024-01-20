import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function NoUser(){
    const navigate = useNavigate()
    return (
        <div style={{ marginLeft:'30%', textAlign:"left"}}>
            <Typography variant="h3" color='firebrick'>No user is currently logged in,</Typography>
            <Typography variant="h3" color='firebrick'>please log in to continue.</Typography>
            <Button variant="contained" color="warning" onClick={() => navigate('/')} sx={{marginTop:"3%", marginLeft:"5%", width:"40%"}}>Login</Button>
        </div>
    )
}

export default NoUser;