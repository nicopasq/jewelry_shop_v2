import { Grid, Typography } from "@mui/material";
import React from "react";
import QuickLinks from "./QuickLinks";
import "./navBar.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();

  function handleClick(shop) {
    dispatch({ type: "order/clear" });
    window.scrollTo(0, 0);
    if (shop){
      dispatch({type:"jewelryType/resetFilter"});
    }
  }

  return (
    <div id="navBar">
      <QuickLinks />
      <Typography variant="h3" id="name">
        Rock Hound
      </Typography>
      <Grid container spacing={3} id="linkContainer">
        <Grid item xs={4}>
          <Link to="/home" onClick={() => handleClick()}>
            <Typography variant="h6" className="siteLinks">
              Home
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link to="/shop" onClick={() => handleClick('shop')}>
            <Typography variant="h6" className="siteLinks">
              Shop
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link to="/bag" onClick={() => handleClick()}>
            <Typography variant="h6" className="siteLinks">
              Bag
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Navbar;
