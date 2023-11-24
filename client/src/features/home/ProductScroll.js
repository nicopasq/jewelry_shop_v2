import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import '../../styles/productSrcoll.css'

function ProductScroll({ containerInfo }) {
  const [sliceVal, setSliceVal] = useState({
    start: 0,
    end: 3,
  });

  const products = containerInfo.productArr.map((product) => {
    return (
      <Grid item xs={"auto"}>
        <Card className="productCard" elevation={4}>
          {/* <img src={ring.image} key={ring.id} style={{height:'25vh', margin:'5px', border:'1px solid black'}}/> */}
          {product}
          <CardContent>
            {/* <Typography>{ring.product_name}</Typography>
                    <Typography>{ring.price}</Typography> */}
            <Typography>ring name</Typography>
            <Typography>price</Typography>
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
      if (start >= 9) {
        setSliceVal({ start: 9, end: 12 });
      } else if (start <= 9) {
        setSliceVal({ start: start, end: start + 3 });
      }
    }
  }
  return (
    <>
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

            <Grid container spacing={3} className="productGrid" >

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
    </>
  );
}

export default ProductScroll;
