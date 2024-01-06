import { Button, Card, CardContent, Divider, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BagDisplay(){
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser.user)
    const bagItems = currentUser.order_products.filter(p => p.in_cart === true)
    const products = useSelector(state => state.products.value)
    const orderProducts = []
     bagItems.map(orderProduct => {
        return products?.map(p => {
            if(p.id === orderProduct.product_id){
                return orderProducts.push({...orderProduct, image: p.image})
            }
            return null
        })
    })
    const inBag = orderProducts.filter(p => p.in_cart === true)

    function handleMenuToggle(target){
        if(target !== null){
            setAnchorEl(target)
            setOpen(true)
        } else {
            setAnchorEl(target)
            setOpen(false)
        }
    }

    function handleDelete(product){
        fetch('/order_products', {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(product)
        })
        const updatedOrderProducts = [...currentUser.order_products].filter(p => p.id !== product.id )
        const updatedUser = {...currentUser, order_products: updatedOrderProducts}
        dispatch({type:"currentUser/update", payload:updatedUser})
        setAnchorEl(null)
        setOpen(false)
    }

    const bagDisplay = inBag.map(product => {
        const productObj = product.product
        return (
                <Card key={product.id} className='productCardBag'>
                    <img src={product.image} alt={productObj.product_name} />
                    <CardContent className='cardContent'>
                        <Typography variant='h6'>{productObj.product_name}</Typography>
                        <Divider sx={{bgcolor:'lightgrey'}}/>
                        <Typography variant='h6'>${productObj.price}</Typography>
                        <Divider sx={{bgcolor:'lightgrey'}}/>
                        <Typography variant='h6'>Quantity: 
                            <Button className='incrementQty' sx={{fontSize:'16pt'}}
                                // onClick={()=>dispatch({type:'bag/decrement'})}
                            > - </Button>
                                {product.quantity}
                            <Button className='incrementQty' sx={{fontSize:'13pt'}}
                                // onClick={()=>dispatch({type:'bag/increment'})}
                            > + </Button>
                        </Typography>
                        <Typography variant='h6' sx={() => {
                            if (productObj.product_type === 'ring'){
                                return {display:'block'}
                            } else{
                                return {display:'none'}
                            }
                        }}>Size: {product.size?.toFixed(2)}</Typography>
                    <div className='cardButtons'>
                        <Typography className='openMenu' sx={{fontSize:'25pt'}} 
                        onClick={(e) => handleMenuToggle(e.target, product)}>...</Typography>
                        <Menu
                         anchorEl={anchorEl}
                         open={open} 
                         onClose={() => handleMenuToggle(null)}>
                            <MenuItem onClick={() => handleDelete(product)}>Remove All</MenuItem>
                        </Menu>
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

    const render = bagDisplay.length > 0 ? bagDisplay : nothingInBag;
    return (
        <div id="bagContainer">
            {render}
        </div>
    )
}

export default BagDisplay;