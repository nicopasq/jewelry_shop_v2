import { Button, Card, CardContent, Divider, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BagDisplay(){
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser.user)
    const sortedBagItems = [...currentUser.order_products].sort((a,b) => (a.id > b.id) ? 1 : -1)
    const products = useSelector(state => state.products.value)
    const orderProducts = []    
    sortedBagItems.map(orderProduct => {
        return products?.map(p => {
            if(p.id === orderProduct.product_id){
                return orderProducts.push({...orderProduct, image: p.image})
            }
            return null
        })
    })
    const inBag = orderProducts.filter(p => p.in_cart === true)

    function handleSaveForLater(product){
        console.log('save', product)
    }

    function handleMenuToggle(target, product){
        if(target !== null){
            setAnchorEl(target)
            setOpen(true)
            setCurrentProduct(product)
        } else {
            setAnchorEl(null)
            setOpen(false)
            setCurrentProduct(null)
        }
    }

    function handleDelete(product){
        console.log('delete order product:', product)
        fetch('/order_products', {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(product)
        })
        .then(r => r.json())
        .then(data => dispatch({type:'currentUser/updateBag', payload:data}))
        setAnchorEl(null)
        setOpen(false)
    }

    function handleEditItem(product){
        console.log('Edit me', product)
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
                            <MenuItem onClick={() => handleDelete(currentProduct)}>Remove All</MenuItem>
                            <MenuItem onClick={() => handleSaveForLater(currentProduct)}>Save for later</MenuItem>
                            <MenuItem onClick={() => handleEditItem(currentProduct)}>Edit Order</MenuItem>
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