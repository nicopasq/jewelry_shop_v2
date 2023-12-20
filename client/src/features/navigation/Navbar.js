import { Grid, Typography } from "@mui/material";
import React from "react";
import QuickLinks from "./QuickLinks";
import './navBar.css'
import { Link, useNavigate } from "react-router-dom";

function Navbar(){
const navigate = useNavigate()
    return(
        <div id="navBar">
            <QuickLinks/>
            <Typography variant="h3" id="name">Rock Hound</Typography>
            <Grid container spacing={3} id="linkContainer">
                <Grid item xs={4}>
                    <Link to='/home' onClick={() => navigate('/home')}>
                        <Typography variant="h6" className='siteLinks'>Home</Typography>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link to='/shop' onClick={() => navigate('/shop')}>
                        <Typography variant="h6" className='siteLinks'>Shop</Typography>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link to='/bag'>
                        <Typography variant="h6" className='siteLinks'>Bag</Typography>
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}

export default Navbar;