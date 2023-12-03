import React, { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar";
import { useParams } from "react-router-dom";
import images from '../../images/images'
import '../../styles/productPage.css'
import { Divider, InputLabel, MenuItem, Select, Typography } from "@mui/material";

function ProductPage(){
    const [ringSize, setRingSize] = useState([])
    const [currentProduct, setCurrentProduct] = useState({})
    const { id } = useParams()
    const ringSizes = [5.0, 5.25, 5.5, 6.0, 6.25, 6.5, 7.0, 7.25, 7.5, 8.0, 8.25, 8.5, 9.0, 9.25, 9.5, 10, 10.25, 10.5, 11]
    const menuItems = ringSizes.map(size => <MenuItem value={size}>{size}</MenuItem>)

    useEffect(() => {
        fetch(`/products/${id}`)
        .then(r => r.json())
        .then(data => {
            images.map(image => {
                if (image.includes(data.image_path)){
                    data.image = image
                    setCurrentProduct(data)
                }
            })
        })
    },[])

    return (
        <div className="main">
            <Navbar/>
            <div id="imageContainer" className="halfScreen">
                <img src={currentProduct.image} alt={currentProduct.product_name} id="productImage"/>
            </div>
            <div id="productDetails" className="halfScreen">
                <div id="productDetails">
                    <Typography variant="h3">{currentProduct.product_name}</Typography>
                    <Typography variant="h4"><b>Free Shipping & Free 90 Day Returns</b></Typography>
                    <Divider/>
                </div>
                
                <div id="ringSize">
                    <form>
                        <InputLabel id="ringSizes">Ring Size:</InputLabel>
                        <Select 
                            labelId="ringSizes"
                            id="selectSize"
                            value={ringSize}
                            label='Ring Size'
                            onChange={(e) => setRingSize(e.target.value)}>
                                {menuItems}
                            </Select>
                    </form>
                    <Divider/>
                </div>

                <div id="payment">
                    <Typography variant="h5">Total</Typography>
                    <Divider/>
                    <Typography variant="h4">${currentProduct.price}</Typography>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;