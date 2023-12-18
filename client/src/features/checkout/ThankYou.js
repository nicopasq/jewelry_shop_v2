import React from 'react'
import Navbar from '../navigation/Navbar'
import { Typography } from '@mui/material'

function ThankYou(){
    return(
        <div className='main'>
            <Navbar/>
            <Typography variant='h1'> Hello From Thank You Page</Typography>
        </div>
    )
}

export default ThankYou;