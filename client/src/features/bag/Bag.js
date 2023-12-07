import { Button, Card, CardActionArea, CardContent, Divider, Menu, MenuItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../navigation/Navbar';
import { useSelector } from 'react-redux';
import '../../styles/bag.css'
import { Link } from 'react-router-dom';

function Bag(){
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)

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

    function handleMenuToggle(target){
        if(target !== null){
            setAnchorEl(target)
            setOpen(true)
        } else {
            setAnchorEl(null)
            setOpen(false)
        }
    }
    const bagDisplay = inBag.map(product => {
        const productObj = product.product
        return (
                <Card key={product.id} className='productCardBag'>
                    <img src={product.image} />
                    <CardContent className='cardContent'>
                        <Typography variant='h6'>{productObj.product_name}</Typography>
                        <Divider sx={{bgcolor:'lightgrey'}}/>
                        <Typography variant='h6'>${productObj.price}</Typography>
                        <Divider sx={{bgcolor:'lightgrey'}}/>
                        <Typography variant='h6'>Quantity: {product.quantity}</Typography>
                        <Typography variant='h6' sx={() => {
                            if (productObj.product_type === 'ring'){
                                return {display:'block'}
                            } else{
                                return {display:'none'}
                            }
                        }}>Size: {product.size}</Typography>
                    <div className='cardButtons'>
                        <Typography className='openMenu' sx={{fontSize:'25pt'}} 
                        onClick={(e) => handleMenuToggle(e.target)}>...</Typography>
                    </div>
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
//end of bagDisplay component


//render bagDisplay component 
    const render = bagDisplay.length > 0 ? bagDisplay : nothingInBag;

    const priceArray = inBag.map(product => {
        const productObj = product.product
        const price = productObj.price * product.quantity
        return price
    })
    const subtotal = priceArray.length > 0 ? priceArray.reduce((prev, cur) => prev + cur) : 0;
    const tax = (subtotal * .029).toFixed(2)
    return(
        <div className='main'>
            <Navbar/>
            <div id='totalContainer'>
                <Typography variant='h6'>Subtotal: ${subtotal}</Typography>
                <Typography variant='h6'>Tax: ${tax}</Typography>
                <Divider sx={{bgcolor:'lightgrey'}}/>
                <Typography variant='h5'>Total Price: ${parseFloat(subtotal) + parseFloat(tax)}</Typography>
                <Button id='checkout' variant='contained'>Checkout</Button>
            </div>
            <div id='bag'>
            <Typography variant='h5' sx={{fontFamily:"serif"}}>Your Bag</Typography>
                {render}
                <Menu open={open} anchorEl={anchorEl} onClose={() => handleMenuToggle(null)}>
                            <MenuItem>🗑️</MenuItem>
                            <MenuItem>Save for later</MenuItem>
                            <MenuItem>Edit Order</MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default Bag;