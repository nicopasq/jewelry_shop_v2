import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import '../../styles/quickLinks.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function QuickLinks(){
    const currentUser = useSelector(state => state.currentUser.value)
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
            <Grid container spacing={6} id="quickLinkGrid">
                <Grid item xs={2}>
                    <Button onClick={(e) => handleLogout(e)} id="logoutBtn">Logout</Button>
                </Grid>
                <Grid item xs={-2}>
                    <Typography variant="body1" className="quickLinkTxt">|</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body1" className="quickLinkTxt">Cart</Typography>
                </Grid>

                <Grid item xs={2}>
                    <Typography variant="body1" className="quickLinkTxt">Profile</Typography>
                </Grid>

                <Grid item xs={2}>
                    <Typography variant="body1" className="quickLinkTxt">Favorites</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default QuickLinks;