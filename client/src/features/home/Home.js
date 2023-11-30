import React from "react";
import Navbar from "../navigation/Navbar"; 
import '../../styles/home.css'
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import homeCover from '../home/rings_home_cover.jpg'
import ProductScroll from "./ProductScroll.js";
import { useSelector } from "react-redux";
import ringAd from '../../images/ringAd.png'
import necklaceAd from '../../images/necklaceAd.png'
import earringAd from '../../images/earringAd.png'

function Home(){
    const allProducts = useSelector(state => state.products.value)

    const rings = []
    const necklaces = []
    const earrings = []
    if(allProducts){
        allProducts.map(product => {
            if (product.product_type === 'ring'){
                rings.push(product)
            } else if(product.product_type === 'necklace'){
                necklaces.push(product)
            } else if(product.product_type === 'earring'){
                earrings.push(product)
            }
            return ''
        })
    }


    return (
    <>
        <Navbar/>
        <Paper id="homeCoverBg" elevation={9}>
            <img src={homeCover} alt="" id="homeCover"/>
        </Paper>
        <Container >
            <Button variant="text" id="homeCoverBtn">Shop Now</Button>
           
           <div id="ringAd">
            <Box id="ringAdImage">
                <img alt='ringAd' src={ringAd} className="adImage"/>
            </Box>
            <Box id="ringAdContent">
                <Typography variant='h2' className="adTxt">Find The Perfect Fit!</Typography>
                <Button variant='text' className="adBtn"> Explore Jewelry</Button>
            </Box>
           </div>
            {/* <ProductScroll key="rings" containerInfo={
                {
                    name:'Shop Rings',
                    productArr:rings
                }
            }/>   */}

            <div id="necklaceAd">
                <Box id='necklaceAdImage'>
                    <img alt="necklaceAd" className="adImage" src={necklaceAd}/>
                </Box>
                <Box id='necklaceAdContent'>
                    <Typography variant='h2' className="adTxt">Necklaces for every occasion</Typography>
                    <Button variant='text' className="adBtn"> Explore Jewelry</Button>
                </Box>
            </div>
            {/* <ProductScroll key="necklaces" containerInfo={
                {
                    name:'Shop Necklaces',
                    productArr:necklaces
                }
            }/>  */}

            <div id="earringAd">
                <Box >
                    <img alt="earringAd" id="earringAdImage" src={earringAd}/>
                </Box>
                <Box id='earringAdContent'>
                    <Typography variant='h2' className="adTxt">Earrings to match any outfit</Typography>
                    <Button variant='text' className="adBtn"> Explore Jewelry</Button>
                </Box>
            </div>            
            {/* <ProductScroll key="earrings" containerInfo={
                {
                    name:'Shop Earrings',
                    productArr:earrings
                }
            }/>              */}
            <br></br>
        </Container>
    </>
    )
}

export default Home;