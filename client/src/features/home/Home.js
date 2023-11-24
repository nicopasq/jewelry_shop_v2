import React, { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar"; 
import '../../styles/home.css'
import { Button, Container, Paper } from "@mui/material";
import homeCover from '../home/rings_home_cover.jpg'
import ProductScroll from "./ProductScroll.js";

function Home(){
    return (
    <>
        <Navbar/>
        <Paper id="homeCoverBg" elevation={9}>
            <img src={homeCover} id="homeCover"/>
        </Paper>
        <Container 
        // sx={{border:'1px solid black'}}
        >
            <Button variant="outlined" id="homeCoverBtn">Shop Now!</Button>
           
            <ProductScroll containerInfo={
                {
                    name:'Shop Rings',
                    productArr:[1,2,3,4,5,6,7,8,9,10,11,12]
                }
            }/>             
            <ProductScroll containerInfo={
                {
                    name:'Shop Necklaces',
                    productArr:[1,2,3,4,5,6,7,8,9,10,11,12]
                }
            }/>             
            <ProductScroll containerInfo={
                {
                    name:'Shop Earrings',
                    productArr:[1,2,3,4,5,6,7,8,9,10,11,12]
                }
            }/>             
            <ProductScroll containerInfo={
                {
                    name:'Shop Bracelets',
                    productArr:[1,2,3,4,5,6,7,8,9,10,11,12]
                }
            }/>             
            <br></br>
        </Container>
    </>
    )
}

export default Home;