import { Button, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import '../../styles/productSrcoll.css'

function ProductScroll({ containerInfo }) {
  const [sliceVal, setSliceVal] = useState({
    start: 0,
    end: 3,
  });

  const products = containerInfo.productArr.map((product) => {
    return (
      <Grid item xs={"auto"} key={product.id}> 
        <Card className="productCard" elevation={4}>
          <Paper elevation={5}>
            <img src={product.image} alt='' className="productImage"/>
          </Paper>
          <CardContent>
            <Typography>{product.product_name}</Typography>
            <Typography>{product.price}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  });
  const renderProducts = products.slice(sliceVal.start, sliceVal.end);

  const lastBtn = "<";
  const nextBtn = ">";

  function scroll(e) {
    // const max = 12
    if (e.target.name === "backBtn") {
      let start = sliceVal.start - 3;
      if (start < 0) {
        setSliceVal({ start: 0, end: 3 });
      } else if (start >= 0) {
        setSliceVal({ start: start, end: start + 3 });
      }
    } else if (e.target.name === "nextBtn") {
      let start = sliceVal.start + 3;
      if (start >= 22) {
        setSliceVal({ start: 22, end: 25 });
      } else if (start <= 22) {
        setSliceVal({ start: start, end: start + 3 });
      }
    }
  }
  return (
    <div key={containerInfo.name}>
      <Typography variant="h3" className="containerName">{containerInfo.name}</Typography>
      <div className="shell">
        <div className="productContainer">
          <Button
            className="backBtn"
            name="backBtn"
            variant="contained"
            onClick={(e) => scroll(e)}
          >
            {lastBtn}
          </Button>

            <Grid container spacing={3} className="productGrid" key={containerInfo.name}>

            {renderProducts}
            </Grid>

          <Button
            className="nextBtn"
            name="nextBtn"
            variant="contained"
            onClick={(e) => scroll(e)}
          >
            {nextBtn}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductScroll;
