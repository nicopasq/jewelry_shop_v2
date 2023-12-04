import { Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../navigation/Navbar';
import { useSelector } from 'react-redux';

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
    const saveForLate = orderProducts.filter(p => p.in_cart === false)

    console.log(inBag)

    const tempDisplay = inBag.map(product => {
        const productObj = product.product
        return (
            <div key={product.id}>
                <Card>
                    <img src={product.image} style={{height:'20vh'}}/>
                    <CardContent>
                        <Typography variant='h6'>{productObj.product_name}</Typography>
                    </CardContent>
                </Card>
            </div>
        )
    })
    return(
        <div className='main'>
            <Navbar/>
            {tempDisplay}
        </div>
    )
}

export default Bag;