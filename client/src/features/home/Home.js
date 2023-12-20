import React from "react";
import Navbar from "../navigation/Navbar"; 
import './home.css'
import { Box, Button, Container, Typography } from "@mui/material";
import ringAd from '../../images/ringAd.png'
import necklaceAd from '../../images/necklaceAd.png'
import earringAd from '../../images/earringAd.png'
import {  useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate()

    return (
    <div className="main">
        <Navbar/>
        <Container >
           
           <div id="ringAd">
            <Box id="ringAdImage">
                <img alt='ringAd' src={ringAd} className="adImage"/>
            </Box>
            <Box id="ringAdContent">
                <Typography variant='h2' className="adTxt">Find The Perfect Fit!</Typography>
                <Button variant='text' className="adBtn" onClick={() => navigate('/shop')}> Explore Jewelry</Button>
            </Box>
           </div>

            <div id="necklaceAd">
                <Box id='necklaceAdImage'>
                    <img alt="necklaceAd" className="adImage" src={necklaceAd}/>
                </Box>
                <Box id='necklaceAdContent'>
                    <Typography variant='h2' className="adTxt">Necklaces for every occasion</Typography>
                    <Button variant='text' className="adBtn" onClick={() => navigate('/shop')}> Explore Jewelry</Button>
                </Box>
            </div>

            <div id="earringAd">
                <Box >
                    <img alt="earringAd" id="earringAdImage" src={earringAd}/>
                </Box>
                <Box id='earringAdContent'>
                    <Typography variant='h2' className="adTxt">Earrings to match any outfit</Typography>
                    <Button variant='text' className="adBtn" onClick={() => navigate('/shop')}> Explore Jewelry</Button>
                </Box>
            </div>            
            <br></br>
        </Container>
    </div>
    )
}

export default Home;