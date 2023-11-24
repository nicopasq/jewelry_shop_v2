import React, { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar"; 
import '../../styles/home.css'
import { Button, Container } from "@mui/material";
import homeCover from '../home/rings_home_cover.jpg'
import ring_images from "../../images/rings/rings.js";

function Home(){
    const [products, setProducts] = useState([])

useEffect(() => {
    fetch('/products')
    .then(r => r.json())
    .then(data => setProducts(data))
},[])

const addImage = products.map(p => {
    ring_images.map(r => {
        if (r.includes(p.image_path)){
            p.image = r
            console.log(p)
        }
    })
    return (
        <img src={p.image}/>
    )
})
console.log(addImage)

    return (
    <>
        <Navbar/>
        <Container>
            <img src={homeCover} id="homeCover"/>
            <Button variant="outlined" id="homeCoverBtn">Shop Now!</Button>
            {addImage}
        </Container>
    </>
    )
}

export default Home;