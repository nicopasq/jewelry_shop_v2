import { Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function Total(){
    const currentUser = useSelector(state => state.currentUser.value)
    const inBag = currentUser.order_products

    const priceArray = inBag.map(product => {
        const productObj = product.product
        const price = productObj.price * product.quantity
        return price
    })

    const subtotal = priceArray.length > 0 ? priceArray.reduce((prev, cur) => prev + cur) : 0;
    const tax = (subtotal * .029).toFixed(2)
    return (
        <div id='totalContainer'>
            <Typography variant='h6'>Subtotal: ${subtotal.toFixed(2)}</Typography>
            <Typography variant='h6'>Tax: ${tax}</Typography>
            <Divider sx={{bgcolor:'lightgrey'}}/>
            <Typography variant='h5'>Total Price: ${(parseFloat(subtotal) + parseFloat(tax)).toFixed(2)}</Typography>
            <Button id='checkout' variant='contained'>Checkout</Button>
        </div>
    )
}

export default Total;