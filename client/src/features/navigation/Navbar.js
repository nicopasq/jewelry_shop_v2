import { Grid, Typography } from "@mui/material";
import React from "react";
import QuickLinks from "./QuickLinks";
import '../../styles/navBar.css'
import { Link } from "react-router-dom";

function Navbar(){
    const siteLinks = ['Featured', 'Shop', 'Showcase']

    const renderSiteLinks = siteLinks.map((link, index) => {
        return (
            <Grid item xs={4} key={index}>
                <Link to={link.toLowerCase()}>
                    <Typography variant="h6" className='siteLinks'>{link}</Typography>
                </Link>
            </Grid>
        )
    })

    return(
        <div id="navBar">
            <QuickLinks/>
            <Typography variant="h3" id="name">Rock Hound</Typography>
            <Grid container spacing={3} id="linkContainer">
                {renderSiteLinks}
            </Grid>
        </div>
    );
}

export default Navbar;