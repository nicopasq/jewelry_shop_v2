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
            <Grid item xs={4} key={p.id} sm={3}>
                <Card elevation={0} className="product">
                    <img src={p.image} alt={p.product_name} className="productCardImage"/>
                    <Typography variant='h6' >{p.product_name}</Typography>
                    <Typography variant='body1'>${p.price}</Typography>
                </Card>
            </Grid>
        )
    })
    return (
        <div className='main'>
            <Navbar/>
            <Grid container spacing={4} id='shopGrid'>
                {test}
            </Grid>
        </div>
    )
}

export default Shop;