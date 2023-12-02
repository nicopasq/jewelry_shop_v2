import React from 'react'
import Navbar from '../navigation/Navbar'
import { Button, Card, Container, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import '../../styles/shop.css'

function Shop(){
    const products = useSelector(state => state.products.value)
    console.log(products)


    const test = products?.map((p) => {
        return (
            <Grid item xs={4} key={p.id}>
                <Card elevation={0} className="product">
                    <img src={p.image} alt={p.product_name} className="productCardImage"/>
                    <Typography variant='h6' className='productCardName'>{p.product_name}</Typography>
                    <Typography variant='body1' className='productCardPrice'>${p.price}</Typography>
                    <Button variant='text' onClick={()=>{}}>Add to cart</Button>
                </Card>
            </Grid>
        )
    })
    return (
        <>
            <Navbar/>
            <Grid container spacing={4} id='shopGrid'>
                {test}
            </Grid>
        </>
    )
}

export default Shop;