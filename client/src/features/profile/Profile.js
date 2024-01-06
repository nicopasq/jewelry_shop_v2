import React, { useState } from "react";
import Navbar from "../navigation/Navbar";
import { Card, Container, Divider, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import "./profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.currentUser.user);

  let date 
  if (currentUser.created_at){
    const tempDate = currentUser.created_at.split('T')[0].split('-')
    const year = tempDate.shift()
    tempDate.push(year)
    date = tempDate.join(' / ')
  }
  const joinDate = date

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
            <TableHead>
              <TableRow>
                <TableCell>Order Number</TableCell>
                <TableCell align="right">Order Date</TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                {currentUser.orders.map(order => {
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
      </Container>
    </div>
  );
}

export default Profile;
