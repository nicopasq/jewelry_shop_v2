import React, { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar"; 
import '../../styles/home.css'
import { Button, Card, CardContent, CardHeader, Container, Grid, Typography } from "@mui/material";
import homeCover from '../home/rings_home_cover.jpg'
import ring_images from "../../images/rings/rings.js";

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


const testArr = [1,2,3,4,5,6,7,8,9,10,11,12]
const featuredProducts = testArr.map(product => {
    return ( 
        <Grid item xs={4}>
        <Card>
            {/* <img src={ring.image} key={ring.id} style={{height:'25vh', margin:'5px', border:'1px solid black'}}/> */}
            {product}
            <CardContent>
                {/* <Typography>{ring.product_name}</Typography>
                <Typography>{ring.price}</Typography> */}
                <Typography>ring name</Typography>
                <Typography>price</Typography>
            </CardContent>
        </Card>
        </Grid>
    )
})
const [sliceVal, setSliceVal] = useState({
    start: 0,
    end: 3
})
const renderFeatured = featuredProducts.slice(sliceVal.start, sliceVal.end)
console.log(renderFeatured)
const lastBtn = '<'
const nextBtn = '>'
    return (
    <>
        <Navbar/>
        <Container sx={{border:'1px solid black'}}>
            <img src={homeCover} id="homeCover"/>
            <Button variant="outlined" id="homeCoverBtn">Shop Now!</Button>
            <>
                <Typography variant="h3">Featured Products</Typography>
            <div id="featured" className="shell" style={{border:'1px solid black', height:'40vh', width:'60vw'}}>
                <div id="featuredProductsContainer" className="productContainer">
                    <Button className="backBtn" variant="contained" onClick={() => setSliceVal({start: sliceVal.start-3, end: sliceVal.end-3})} style={{position:'relative', right:'28vw', top:'13vh', height:'15vh'}}>{lastBtn}</Button>
                    <div id="featuredProducts" className="productDisplay">
                        {renderFeatured}
                    </div>
                    <Button className="nextBtn" variant="contained" onClick={() => setSliceVal({start: sliceVal.start+3, end: sliceVal.end+3})} style={{position:'relative', left:'28vw', bottom:'2vh', height:'15vh'}}>{nextBtn}</Button>
                </div>
            </div>
            </>
            <br></br>
        </Container>
    </>
    )
}

export default Home;