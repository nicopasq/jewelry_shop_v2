import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import QuickLinks from "./QuickLinks";
import './navBar.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Navbar(){
const dispatch = useDispatch()

    function handleClick(){
        dispatch({type:'order/clear'})
        window.scrollTo(0,0)
    }

    return(
        <div id="navBar">
            <QuickLinks/>
            <Typography variant="h3" id="name">Rock Hound</Typography>
            <Grid container spacing={3} id="linkContainer">
                <Grid item xs={4}>
                    <Link to='/home' onClick={() =>handleClick()}>
                        <Typography variant="h6" className='siteLinks'>Home</Typography>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link to='/shop' onClick={() => handleClick()}>
                        <Typography variant="h6" className='siteLinks'>Shop</Typography>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link to='/bag' onClick={() => handleClick()}>
                        <Typography variant="h6" className='siteLinks'>Bag</Typography>
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}

export default Navbar;