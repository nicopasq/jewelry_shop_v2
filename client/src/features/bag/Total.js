import { Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Total(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser.user)
    const inBag = currentUser.order_products.filter(p => p.in_cart === true)

    const priceArray = inBag.map(product => {
        const productObj = product.product
        const price = productObj.price * product.quantity
        return price
    })

    const subtotal = priceArray.length > 0 ? priceArray.reduce((prev, cur) => prev + cur) : 0;
    const tax = (subtotal * .029).toFixed(2)
    const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2)

    function handleCheckout(){
        navigate('/bag/checkout')
        dispatch({type:'total/total', payload:total})
    }
    return (
        <div id='totalContainer'>
            <Typography variant='h6'>Subtotal: ${subtotal.toFixed(2)}</Typography>
            <Typography variant='h6'>Tax: ${tax}</Typography>
            <Divider sx={{bgcolor:'lightgrey'}}/>
            <Typography variant='h5'>Total Price: ${total}</Typography>
            <Button id='checkout' variant='contained' onClick={() => handleCheckout()}>Checkout</Button>
        </div>
    )
}

export default Total;