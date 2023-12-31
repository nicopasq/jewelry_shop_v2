import React, { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import './showOrder.css'
import { useDispatch, useSelector } from "react-redux";

function ShowOrder() {
  const { order_number } = useParams();
  const [currentOrder, setCurrentOrder] = useState({});
  const currentUser = useSelector(state => state.currentUser.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [displayConfirmDelete, setDisplayConfirmDelete] = useState(false)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  const currentOrderCopy = {...currentOrder}
  let cardNum
  let expirationDate
  let products

  if (currentOrderCopy.id) {
    cardNum = currentOrder.card_number.match(/.{1,4}/g)?.join("-");
    products = currentOrder.order_products
    let tempDate = currentOrder.expiration.split('-')
    const year = tempDate.shift()
    tempDate.push(year)
    expirationDate = tempDate.join('-')
  }

  useEffect(() => {
    fetch(`/orders/${order_number}`)
      .then((r) => r.json())
      .then((data) => setCurrentOrder(data));
  }, []);


  function handleAction(action){
    if (action === 'edit'){
      // openEditForm()
    } else{
      setDisplayConfirmDelete(true)
    }
  }

  function handleDeleteOrder(){
    fetch(`/orders`, {
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(currentOrder)
    })
    const updatedOrders = [...currentUser.orders].filter(order => order.id !== currentOrder.id)
    const updatedUser = {...currentUser, orders: updatedOrders}
    dispatch({type:"currentUser/updateBag", payload:updatedUser})
    navigate('/profile')
  }
  return (
    <div className="main">
      <Navbar />
      <Container>
      <Typography variant="h3" align="left" marginBottom='1%' fontFamily="serif"><u>Order #: {currentOrder.order_number}</u></Typography>
      <Modal
        open={displayConfirmDelete}
        onClose={() => setDisplayConfirmDelete(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6">Are you sure you want to cancel your order?</Typography>
          <Button id="yesBtn" onClick={() => handleDeleteOrder()}>Yes, cancel my order</Button>
          <Button id="noBtn" onClick={() => setDisplayConfirmDelete(false)}>I changed my mind</Button>
        </Box>
      </Modal>
      <div id="actionButtons">
      <Button onClick={() => handleAction('edit')}>Edit</Button>
      |
      <Button onClick={() => handleAction('cancel')}>Cancel</Button>
      </div>
      <div id="shippingInfo" className="infoDisplay">
        <Typography variant="h6"><u>Recipient:</u></Typography>
          <Typography variant="subtitle1">
            <u>First Name:</u> {currentOrder.first_name}
          </Typography>

          <Typography variant="subtitle1">
            <u>Last Name:</u> {currentOrder.last_name}
          </Typography>

          <Typography variant="subtitle1">
            <u>State:</u> {currentOrder.state}
          </Typography>

          <Typography variant="subtitle1">
            <u>City:</u> {currentOrder.city}
          </Typography>

          <Typography variant="subtitle1">
            <u>Street Address:</u> {currentOrder.street_address}
          </Typography>

          <Typography variant="subtitle1">
            <u>Apt. #:</u> {currentOrder.apt_number}
          </Typography>

          <Typography variant="subtitle1">
            <u>Zip Code:</u> {currentOrder.zip_code}
          </Typography>
      </div>


      <div id="billingInfo" className="infoDisplay">
      <Typography variant="h6"><u>Billing Info:</u></Typography>
        <Typography variant="h6" sx={{ fontFamily: "serif" }}>
          <u>Name on Card:</u> {currentOrder.holder_first_name + ' ' + currentOrder.holder_last_name}
        </Typography>

          <Typography variant="subtitle1">
            <u>Card Number:</u> {cardNum}
          </Typography>

          <Typography variant="subtitle1">
            <u>Expiration Date:</u> {expirationDate}
          </Typography>

      </div>
      <div id="orderProducts">
        <TableContainer component={Paper} elevation={3} id="itemTable">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Items ( {products?.length} )</TableCell>
                <TableCell align="right">Size</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((item) => (
                <TableRow key={item.id} sx={{ border: 0 }}>
                  <TableCell scope="row">{item.product.product_name}</TableCell>
                  <TableCell align="right">{item.size}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">
                    ${item.product.price.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      </Container>
    </div>
  );
}

export default ShowOrder;
