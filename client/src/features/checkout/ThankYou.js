import React, { useEffect, useRef } from 'react'
import Navbar from '../navigation/Navbar'
import { Container, Typography } from '@mui/material'
import checkMark from './check_mark.png'
import { useNavigate } from 'react-router-dom'

function ThankYou(){
    const mounted = useRef(false)
    const navigate = useNavigate()
    let timeOut

    if (mounted.current){
        timeOut = setTimeout(() => {
            navigate('/home')
        }, 10000)
    }

    useEffect(() => {
        mounted.current = true

        return () => {
            clearTimeout(timeOut)
            mounted.current = false
        }
    }, [timeOut])

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