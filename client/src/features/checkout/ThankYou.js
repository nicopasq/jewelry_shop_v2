import React from 'react'
import Navbar from '../navigation/Navbar'
import { Container, Typography } from '@mui/material'
import checkMark from './check_mark.png'

function ThankYou(){
    return(
        <div className='main'>
            <Navbar/>
            <Container>
                <Typography variant='h3' id='thankYouMessage'>
                    Thank you for your purchase!
                </Typography>
                <img id="thankYouCheckMark" src={checkMark} alt='checkMark'/>
                <Typography variant='h6' id='arriveMessage'>
                    Your order should arrive in 3-7 business days.
                </Typography>
            </Container>
        </div>
    )
}

export default ThankYou;