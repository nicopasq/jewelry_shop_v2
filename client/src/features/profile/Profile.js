import React, { useState } from "react";
import Navbar from "../navigation/Navbar";
import { Card, CardContent, Container, Divider, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import "./profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate()
  const productArray = useSelector(state => state.products.value)
  console.log(productArray)
  const currentUser = useSelector((state) => state.currentUser.user);
  const sortedOrders = [...currentUser.orders].sort((a, b) => a.id > b.id ? 1 : -1)
  let date 
  if (currentUser.created_at){
    const tempDate = currentUser.created_at.split('T')[0].split('-')
    const year = tempDate.shift()
    tempDate.push(year)
    date = tempDate.join(' / ')
  }
  const joinDate = date


  const myOrderProducts = [...currentUser.order_products].filter(p => p.in_cart === false)
  const products = []
  myOrderProducts?.map(orderProduct => {
      currentUser.products.map(p => {
        if (p.id === orderProduct.product_id){
          products.push(p)
        }
      })
  })
  console.log(myOrderProducts)
  const myProducts = products.filter(
    (obj, index) =>
      products.findIndex((item) => item.id === obj.id) === index
  ).sort((a, b) => a.id > b.id ? 1 : -1);


  return (
    <div className="main">
      <Navbar />

      <Container>
        <Card elevation={10} id="profileCard">
          <Typography variant="h4" className="profileCardData">
            <u>{currentUser.username}</u>
          </Typography>
          <br />
          <Typography variant="h5" className="profileCardData">
            Joined: {joinDate}
          </Typography>
          <br />
          <br />
          <Typography variant="h5" className="profileCardData">
            Total Orders: {currentUser.orders.length}
          </Typography>
        </Card>

        <Paper
          elevation={6}
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
          <Table id="itemsTable" sx={{width:"70%"}}>
            <TableHead sx={{borderBottom:'2px solid gray'}}>
              <TableRow>
                <TableCell>Order Number</TableCell>
                <TableCell align="right">Order Date</TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                {sortedOrders.map(order => {
                  const dateTime = order.created_at.split('T')[0].split('-')
                  const year = dateTime.shift()
                  dateTime.push(year)
                  const date = dateTime.join(' / ')
                return (
                  <TableRow key={order.id} sx={{border:0}}>
                    <TableCell scope="row" onClick={() => navigate(`/orders/${order.order_number}`)}>{order.order_number}</TableCell>
                    <TableCell align="right">{date}</TableCell>
                  </TableRow>
                )})}
              </TableBody>
          </Table>
        </Paper>

        <Paper
          elevation={6}
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
          <Table id="itemsTable" sx={{width:"70%"}}>
            <TableHead sx={{borderBottom:'2px solid gray'}}>
              <TableRow>
                <TableCell>Product</TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                {myProducts.map(product => {
                return (
                  <TableRow key={product.id} sx={{border:0}}>
                    <TableCell scope="row" onClick={() => navigate(`/shop/${product.id}`)}>{product.product_name}</TableCell>
                  </TableRow>
                )})}
              </TableBody>
          </Table>
        </Paper>
      </Container>
    </div>
  );
}

export default Profile;
