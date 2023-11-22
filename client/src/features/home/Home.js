import React, { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar"; 
import '../../styles/home.css'
import { Button, Container } from "@mui/material";

function Home(){

    return (
    <>
        <Navbar/>
        <Container>
            {/* <img src={homeCover} id="homeCover"/> */}
            <Button variant="outlined" id="homeCoverBtn">Shop Now!</Button>
            {/* {renderTest} */}
        </Container>
    </>
    )
}

export default Home;