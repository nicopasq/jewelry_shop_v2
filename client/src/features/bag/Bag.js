import { Typography } from '@mui/material'
import React from 'react'
import Navbar from '../navigation/Navbar';
import { useSelector } from 'react-redux';

function Bag(){
    const currentUser = useSelector(state => state.currentUser.value)
    console.log(currentUser)
    return(
        <div className='main'>
            <Navbar/>
            <div></div>
        </div>
    )
}

export default Bag;