import { Grid, Typography } from "@mui/material";
import React from "react";
import QuickLinks from "./QuickLinks";
import '../../styles/navBar.css'
import { Link } from "react-router-dom";

function Navbar(){

    return(
        <div id="navBar">
            <QuickLinks/>
            <Typography variant="h3" id="name">Rock Hound</Typography>
            <Grid container spacing={3} id="linkContainer">
                <Grid item xs={4}>
                    <Link to='/home'>
                        <Typography variant="h6" className='siteLinks'>Home</Typography>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link to='/shop'>
                        <Typography variant="h6" className='siteLinks'>Shop</Typography>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link>
                        <Typography variant="h6" className='siteLinks'>Cart</Typography>
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}

export default Navbar;