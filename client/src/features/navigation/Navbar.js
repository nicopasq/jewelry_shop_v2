import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import QuickLinks from "./QuickLinks";
import './navBar.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Navbar(){
const dispatch = useDispatch()

    function clearPayment(){
        dispatch({type:'order/clear'})
    }

    return(
        <div id="navBar">
            <QuickLinks/>
            <Typography variant="h3" id="name">Rock Hound</Typography>
            <Grid container spacing={3} id="linkContainer">
                <Grid item xs={4}>
                    <Link to='/home' onClick={() =>clearPayment()}>
                        <Typography variant="h6" className='siteLinks'>Home</Typography>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link to='/shop' onClick={() => clearPayment()}>
                        <Typography variant="h6" className='siteLinks'>Shop</Typography>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link to='/bag' onClick={() => clearPayment()}>
                        <Typography variant="h6" className='siteLinks'>Bag</Typography>
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}

export default Navbar;