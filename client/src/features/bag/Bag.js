import { Typography } from '@mui/material'
import React from 'react'
import Navbar from '../navigation/Navbar';
import { useSelector } from 'react-redux';

function Bag(){
    const currentUser = useSelector(state => state.currentUser.value)
    const saveForLater = currentUser.order_products.filter(order => order.in_cart === false)
    const inBag = currentUser.order_products.filter(order => order.in_cart === true)
console.log('inBag', inBag)
    return(
        <div className='main'>
            <Navbar/>
            <div></div>
        </div>
    )
}

export default Bag;