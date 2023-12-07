import { Button, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../navigation/Navbar';
import { useSelector } from 'react-redux';
import '../../styles/bag.css'
import { Link } from 'react-router-dom';

function Bag(){
    const currentUser = useSelector(state => state.currentUser.value)
    const products = useSelector(state => state.products.value)
    const orderProducts = []    
    currentUser.order_products.map(orderProduct => {
        products?.map(p => {
            if(p.id === orderProduct.product_id){
                orderProducts.push({...orderProduct, image: p.image})
            }
        })
    })
    const inBag = orderProducts.filter(p => p.in_cart === true)
    const saveForLater = orderProducts.filter(p => p.in_cart === false)

    //make into bagDisplay component
    function deleteOrderProduct(product){
        console.log('delete order product:', product)
        fetch('/order_products', {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(product)
        })
        .then(r => console.log(r))
    }

    const bagDisplay = inBag.map(product => {
        const productObj = product.product
        console.log(product)
        return (
                <Card key={product.id} className='productCardBag'>
                    <img src={product.image} />
                    <CardContent className='cardContent'>
                        <Typography variant='h6'>{productObj.product_name}</Typography>
                        <Typography variant='h6'>${productObj.price}</Typography>
                        <Typography variant='h6'>Quantity: {product.quantity}</Typography>
                        <Typography variant='h6'>Size: {product.size}</Typography>
                    </CardContent>
                    <CardContent className='cardButtons' sx={{width:'30%'}}>
                        <Button onClick={() => deleteOrderProduct(product)}>Remove Item</Button> 
                        <Button>Save For Later</Button>
                    </CardContent>
                </Card>
        )
    })
    const nothingInBag = (
        <Link to='/shop/'>
            <Typography variant='h6' sx={{fontFamily:'serif'}}>
                Continue shopping
            </Typography>
        </Link>)



    //render bagDisplay component 
    const render = bagDisplay.length > 0 ? bagDisplay : nothingInBag;

    return(
        <div className='main'>
            <Navbar/>
            <div id='totalContainer'>

            </div>
            <div id='bag'>
            <Typography variant='h5' sx={{fontFamily:"serif"}}>Your Bag</Typography>
                {render}
            </div>
        </div>
    )
}

export default Bag;