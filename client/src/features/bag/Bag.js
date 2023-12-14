import { Typography } from '@mui/material'
import React from 'react'
import Navbar from '../navigation/Navbar';
import './bag.css'
import BagDisplay from './BagDisplay';
import Total from './Total';

function Bag(){
    return(
        <div className='main'>
            <Navbar/>
            <Total/>
            <div id='bag'>
            <Typography variant='h5' sx={{fontFamily:"serif"}}>Your Bag</Typography>
            <BagDisplay/>
            </div>
        </div>
    )
}

export default Bag;