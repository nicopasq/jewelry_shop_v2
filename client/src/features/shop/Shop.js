import React, { useEffect } from 'react'
import Navbar from '../navigation/Navbar'
import { Button, Card, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import './shop.css'
import { useNavigate } from 'react-router-dom'
import product_images from '../../images/images.js'

function Shop(){
    const products = useSelector(state => state.products.value)
    const navigation = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        fetch('/products')
        .then(r => r.json())
        .then(data => {
             data.map(product => {
              return product_images.map(r => {
                    if (r.includes(product.image_path)){
                        product.image = r
                        return product
                    }
                    return null
                })
            })
            dispatch({type:'products/addProduct', payload:data})
        })
    }, [])

    const renderProducts = products?.map((p) => {
        return (
            <Grid item xs={4} key={p.id} sm={3} >
                <Card elevation={0} className="product">
                    <img src={p.image} alt={p.product_name} className="productCardImage"/>
                    <Typography variant='h6' >{p.product_name}</Typography>
                    <Typography variant='body1'>${p.price}</Typography>
                    <Button 
                        variant='text' 
                        className='addBtn'
                        onClick={() => navigation(`/shop/${p.id}`)}>Learn More</Button>
                </Card>
            </Grid>
        )
    })
    return (
        <div className='main'>
            <Navbar/>
            <Grid container spacing={4} id='shopGrid'>
                {renderProducts}
            </Grid>
        </div>
    )
}

export default Shop;