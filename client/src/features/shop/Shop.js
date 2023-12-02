import React from 'react'
import Navbar from '../navigation/Navbar'
import { Container, Typography } from '@mui/material'

function Shop(){
    return (
        <>
            <Navbar/>
            <Container>
                <Typography>
                    Hello from the Shop
                </Typography>
            </Container>
        </>
    )
}

export default Shop;