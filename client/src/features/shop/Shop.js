import React from "react";
import Navbar from "../navigation/Navbar";
import { Button, Card, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./shop.css";
import { useNavigate } from "react-router-dom";

function Shop() {
  const products = useSelector((state) => state.products.value);
  const jewelryType = useSelector((state) => state.jewelryType)
  const dispatch = useDispatch()
  const navigation = useNavigate();
  let filteredProducts
  if (jewelryType === "rings"){
    filteredProducts = products.filter(item=>item.product_type === 'ring')
  } else if (jewelryType === "necklaces"){
    filteredProducts = products.filter(item=>item.product_type === 'necklace')
  } else if (jewelryType === "earrings"){
    filteredProducts = products.filter(item=>item.product_type === 'earring')
  }
  const productList = jewelryType === "all" ? products : filteredProducts
  const renderProducts = productList.map((p) => {
    return (
      <Grid item xs={4} key={p.id} sm={3}>
        <Card elevation={0} className="product"  onClick={() => navigation(`/shop/${p.id}`)}>
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
          >
            Learn More
          </Button>
        </Card>
      </Grid>
    );
  });

  function handleChange(e){
    dispatch({type:"jewelryType/change", payload:e.target.value})
  }

  return (
    <div className="main">
      <Navbar />
      <div id="selectProductType">
        <InputLabel id='filter'>Filter Products</InputLabel>
        <Select
         sx={{color:'black', width:'10%'}}
         labelId="filter"
         id="filterProducts"
         value={jewelryType}
         onChange={(e) => handleChange(e)}
         label="Ring"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="rings">Rings</MenuItem>
          <MenuItem value="necklaces">Necklaces</MenuItem>
          <MenuItem value="earrings">Earrings</MenuItem>
        </Select>
        <Button onClick={() => dispatch({type:'jewelryType/resetFilter'})}>Clear filter</Button>
      </div>
      <Grid container spacing={4} id="shopGrid">
        {renderProducts}
      </Grid>
    </div>
  );
}

export default Shop;
