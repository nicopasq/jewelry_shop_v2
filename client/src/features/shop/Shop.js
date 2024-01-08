import React, { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar";
import { Button, Card, Divider, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./shop.css";
import { useNavigate } from "react-router-dom";
import product_images from "../../images/images.js";

function Shop() {
  const products = useSelector((state) => state.products.value);
  const navigation = useNavigate();
  const renderProducts = [...products].map((p) => {
    return (
      <Grid item xs={4} key={p.id} sm={3}>
        <Card elevation={0} className="product">
          <img
            src={p.image}
            alt={p.product_name}
            className="productCardImage"
          />
          <Typography variant="h6">{p.product_name}</Typography>
          <Typography variant="body1">${p.price}</Typography>
          <Button
            variant="text"
            className="addBtn"
            onClick={() => navigation(`/shop/${p.id}`)}
          >
            Learn More
          </Button>
        </Card>
      </Grid>
    );
  });

  return (
    <div className="main">
      <Navbar />
      <Grid container spacing={4} id="shopGrid">
        {renderProducts}
      </Grid>
    </div>
  );
}

export default Shop;
