import React, { useState } from "react";
import Navbar from "../navigation/Navbar";
import {
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import "./profile.css";
import { useNavigate } from "react-router-dom";


//User has liked products in currentUser.likes.map(l => return the product)
//Get images the same way as Shop page
//Display clickable product images and display heart in images

function Profile() {
  const navigate = useNavigate();
  const next = '>'
  const back = '<'
  const allProducts = useSelector(state => state.products.value)
  const currentUser = useSelector((state) => state.currentUser.user);
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(3)
  const sortedOrders = [...currentUser.orders].sort((a, b) =>
    a.id > b.id ? 1 : -1
  );
  let date;
  if (currentUser.created_at) {
    const tempDate = currentUser.created_at.split("T")[0].split("-");
    const year = tempDate.shift();
    tempDate.push(year);
    date = tempDate.join(" / ");
  }

  const myOrderProducts = [...currentUser.order_products].filter(
    (p) => p.in_cart === false
  );
  const products = []
  myOrderProducts?.map((orderProduct) => {
     return currentUser.products.filter((p) => {
      if (p.id === orderProduct.product_id) {
        products.push(p);
      } 
      return p
    });
  });

  const myProducts = products
    .filter(
      (obj, index) => products.findIndex((item) => item.id === obj.id) === index
    )
    .sort((a, b) => (a.id > b.id ? 1 : -1));

    console.log('likes', currentUser.likes)

  const likedProducts = currentUser.likes.map(like => like.product)
  const LikedProductImages = likedProducts.map(product => {
    return allProducts.find(p => {
      if (p.id === product.id){
        return p
      }
      return undefined
    })
  })

  const renderLikedProducts = LikedProductImages.map(like => (
    <Grid item xs={4} key={like.id} className="likedProductGridItem" >
      <Card className="likedProduct">
        <div id="img">
        <img
          src={like.image}
          alt={like.product_name}
          className="likedProductImage"/>
        </div>
        <Typography variant="body1" className="productName">{like.product_name}</Typography>
        <Button
            variant="text"
            className="learnMoreBtn"
            onClick={() => navigate(`/shop/${like.id}`)}
          >
            Learn More
          </Button>
      </Card>
    </Grid>
  ))

  function handlePage(direction){
    if (direction === "next" && max < likedProducts.length){
      setMax(max + 1);
      setMin(min + 1)
    } else if (direction === "back" && min > 0 ){
      setMax(max -1)
      setMin(min -1)
    }
  }

  return (
    <div className="main">
      <Navbar />

      <Container>
        <Card elevation={3} id="profileCard">
          <Typography variant="h4" className="profileCardData">
            <u>{currentUser.username}</u>
          </Typography>
          <br />
          <Typography variant="h5" className="profileCardData">
            Joined: {date}
          </Typography>
          <br />
          <br />
          <Typography variant="h5" className="profileCardData">
            Total Orders: {currentUser.orders.length}
          </Typography>
        </Card>

        <Paper
          elevation={9}
          id="favorites"
        >
          <div className="containerHeader">
            <Typography 
              variant="h5"
              className="containerTitle"
              sx={{ fontFamily: "monospace" }}
            >
              Your Favorites
            </Typography>
          </div>
          <Typography variant="h4"  className="next" onClick={() => handlePage('next')}>{next}</Typography>
          <Grid container spacing={6} id="likedProductsGrid">
            {renderLikedProducts.slice(min,max)}
          </Grid>
            <Typography variant="h4" className="back" onClick={() => handlePage('back')} >{back}</Typography>
        </Paper>

        <Paper
          elevation={3}
          className="dataContainer"
          sx={{ bgcolor: "antiquewhite" }}
        >
          <div className="containerHeader">
            <Typography
              variant="body1"
              className="containerTitle"
              sx={{ fontFamily: "monospace" }}
            >
              All Orders
            </Typography>
          </div>
          <Table id="itemsTable" sx={{ width: "70%" }}>
            <TableHead sx={{ borderBottom: "2px solid gray" }}>
              <TableRow>
                <TableCell>Order Number</TableCell>
                <TableCell align="right">Order Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedOrders.map((order) => {
                const dateTime = order.created_at.split("T")[0].split("-");
                const year = dateTime.shift();
                dateTime.push(year);
                const date = dateTime.join(" / ");
                return (
                  <TableRow key={order.id} sx={{ border: 0 }}>
                    <TableCell
                      scope="row"
                      onClick={() => navigate(`/orders/${order.order_number}`)}
                    >
                      {order.order_number}
                    </TableCell>
                    <TableCell align="right">{date}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>

        <Paper
          elevation={3}
          className="dataContainer"
          sx={{ bgcolor: "antiquewhite" }}
        >
          <div className="containerHeader">
            <Typography
              variant="body1"
              className="containerTitle"
              sx={{ fontFamily: "monospace" }}
            >
              Order Again
            </Typography>
          </div>
          <Table id="itemsTable" sx={{ width: "70%" }}>
            <TableHead sx={{ borderBottom: "2px solid gray" }}>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="left">Product Type</TableCell>
                <TableCell align="left">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myProducts.map((product) => {
                return (
                  <TableRow
                    key={product.id}
                    sx={{ border: 0 }}
                    onClick={() => navigate(`/shop/${product.id}`)}
                  >
                    <TableCell scope="row">{product.product_name}</TableCell>
                    <TableCell align="left">{product.product_type}</TableCell>
                    <TableCell align="left">{product.price}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </div>
  );
}

export default Profile;
