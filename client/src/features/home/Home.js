import React, { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar"; 
import '../../styles/home.css'
import { Button, Card, CardContent, CardHeader, Container, Grid, Paper, Typography } from "@mui/material";
import homeCover from '../home/rings_home_cover.jpg'
import ring_images from "../../images/rings/rings.js";
import ProductScroll from "./ProductScroll.js";

function Home(){
    const [products, setProducts] = useState([])

useEffect(() => {
    fetch('/products')
    .then(r => r.json())
    .then(data => {
        console.log('data', data)
        data.map(product => {
            ring_images.map(r => {
                if (r.includes(product.image_path)){
                    product.image = r
                }
            })
        })
        setProducts(data)
    })
},[])

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
                    name:'Featured Products',
                    productArr:[1,2,3,4,5,6,7,8,9,10,11,12]
                }
            }/>             
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