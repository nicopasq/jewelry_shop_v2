import React, { useState } from "react";
import Navbar from "../navigation/Navbar";
import { Card, Container, Paper, Table, TableHead, TableRow, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import "./profile.css";

function Profile() {
  const currentUser = useSelector((state) => state.currentUser.user);
  console.log(currentUser)

  let date 
  if (currentUser.created_at){
    const tempDate = currentUser.created_at.split('T')[0].split('-')
    const year = tempDate.shift()
    tempDate.push(year)
    date = tempDate.join(' / ')
  }
  const joinDate = date

  // const renderOrders = currentUser.orders.map(order = {})


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
            Total Orders:
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
          <Table id="itemsTable">
            <TableHead>
              <TableRow></TableRow>
            </TableHead>
          </Table>
        </Paper>

        {/* <Paper elevation={6} className="dataContainer" sx={{bgcolor:'antiquewhite'}}>
                <div className="containerHeader">
                    <Typography variant="body1" className="containerTitle" sx={{fontFamily:'monospace'}}>Saved For Later</Typography>
                </div>  
                <Table id='ordersTable'></Table>
            </Paper> */}
      </Container>
    </div>
  );
}

export default Profile;
