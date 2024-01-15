import React from "react";
import Navbar from "../navigation/Navbar";
import "./home.css";
import { Box, Container, Typography } from "@mui/material";
import ringAd from "../../images/ringAd.png";
import necklaceAd from "../../images/necklaceAd.png";
import earringAd from "../../images/earringAd.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Make entire "ad" space clickable
// Make the "ad" go to the correct part of Shop,
//    by having the Shop be filtered when link is clicked

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  function handleClick(jewelryType){
    dispatch({type:'jewelryType/change', payload: jewelryType})
    navigate('/shop')
    window.scrollTo(0,0)
  }


  return (
    <div className="main">
      <Navbar />
      <Container>
        <div id="ringAd" onClick={() => handleClick("rings")}>
          <Box id="ringAdImage">
            <img alt="ringAd" src={ringAd} className="adImage" />
          </Box>
          <Box id="ringAdContent">
            <Typography variant="h2" className="adTxt">
              Find The Perfect Fit!
            </Typography>
            <Typography variant="h3" className="adTxt" color='darkBlue'>
              Shop Rings
            </Typography>
          </Box>
        </div>

        <div id="necklaceAd" onClick={() => handleClick("necklaces")}>
          <Box id="necklaceAdImage">
            <img alt="necklaceAd" className="adImage" src={necklaceAd} />
          </Box>
          <Box id="necklaceAdContent">
            <Typography variant="h2" className="adTxt">
              Necklaces for every occasion
            </Typography>
            <Typography variant="h3" className="adTxt" color='darkBlue'>
              Shop Necklaces
            </Typography>
          </Box>
        </div>

        <div id="earringAd" onClick={() => handleClick("earrings")}>
          <Box>
            <img alt="earringAd" id="earringAdImage" src={earringAd} />
          </Box>
          <Box id="earringAdContent">
            <Typography variant="h2" className="adTxt">
              Earrings to match any outfit
            </Typography>
            <Typography variant="h3" className="adTxt" color='darkBlue'>
              Shop Earrings
            </Typography>
          </Box>
        </div>
        <br></br>
      </Container>
    </div>
  );
}

export default Home;
