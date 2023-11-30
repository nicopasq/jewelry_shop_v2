import React from "react";
import Navbar from "../navigation/Navbar"; 
import '../../styles/home.css'
import { Button, Container, Paper } from "@mui/material";
import homeCover from '../home/rings_home_cover.jpg'
import ProductScroll from "./ProductScroll.js";
import { useSelector } from "react-redux";

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
            <Button variant="outlined" id="homeCoverBtn">Shop Now!</Button>
           
            <ProductScroll key="rings" containerInfo={
                {
                    name:'Shop Rings',
                    productArr:rings
                }
            }/>             
            <ProductScroll key="necklaces" containerInfo={
                {
                    name:'Shop Necklaces',
                    productArr:necklaces
                }
            }/>             
            <ProductScroll key="earrings" containerInfo={
                {
                    name:'Shop Earrings',
                    productArr:earrings
                }
            }/>             
            <br></br>
        </Container>
    </>
    )
}

export default Home;