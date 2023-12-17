import {
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Confirmation({ handleEdit }) {
  const currentUser = useSelector((state) => state.currentUser.value);
  const sortedBagItems = [...currentUser.order_products].sort((a, b) =>
    a.id > b.id ? 1 : -1
  );
  const inBag = sortedBagItems.filter(p => p.in_cart === true)
  const orderInfo = useSelector((state) => state.order);
  const priceArray = inBag.map((product) => {
    const productObj = product.product;
    const price = productObj.price * product.quantity;
    return price;
  });
  const subtotal =
    priceArray.length > 0 ? priceArray.reduce((prev, cur) => prev + cur) : 0;

  const tax = (subtotal * 0.029).toFixed(2);
  const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
  const cardNum = orderInfo.billing.card_number.match(/.{1,4}/g)?.join("-");
  const [orderId, setOrderId] = useState(null);


  function handlePlaceOrder(){
    const orderBody = {user_id:currentUser.id, ...orderInfo.billing, ...orderInfo.shipping}

    fetch('/orders', {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(orderBody)
    })
    .then(r => r.json())
    .then(data => {
      inBag.forEach(p => {
        fetch('/order_products', {
          method:"PATCH",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({user_id:currentUser.id, id:p.id, order_id:data.id})
          })
          .then(r => r.json())
          .then(data => console.log(data))
      })
    })
  }
  
  // useEffect(() => {
    // inBag.forEach(p => {
    //   fetch('/order_products', {
    //     method:"PATCH",
    //     headers:{
    //       "Content-Type":"application/json"
    //     },
    //     body:JSON.stringify({user_id:currentUser.id, id:p.id, order_id:orderId})
    //     })
    //     .then(r => r.json())
    //     .then(data => console.log(data))
    // })
  // }, [orderId])

  return (
    <div id="confirmationPage">
      <Typography variant="h5">Order Details</Typography>
      <div id="userInfo">
        <Typography variant="h5">
          <u>Billing</u>
        </Typography>
        <Button
          variant="text"
          className="editInfo"
          onClick={() => handleEdit(0)}
        >
          Edit
        </Button>
        <div className="userDetails">
          <Typography variant="h6">
            Card Holder:{" "}
            {orderInfo.billing.first_name + " " + orderInfo.billing.last_name}
          </Typography>
          <Typography variant="h6">Card #: {cardNum}</Typography>
          <Typography variant="h6">
            Expiration Date: {orderInfo.billing.expiration}
          </Typography>
        </div>
        <Typography variant="h5">
          <u>Shipping</u>
        </Typography>
        <Button
          variant="text"
          className="editInfo"
          onClick={() => handleEdit(1)}
        >
          Edit
        </Button>
        <div className="userDetails">
          <Typography variant="h6">
            Recipient:{" "}
            {orderInfo.shipping.first_name + " " + orderInfo.shipping.last_name}
          </Typography>
          <Typography variant="h6">
            State: {orderInfo.shipping.state}
          </Typography>
          <Typography variant="h6">City: {orderInfo.shipping.city}</Typography>
          <Typography variant="h6">
            Street {orderInfo.shipping.street_address}
          </Typography>
          <Typography variant="h6">
            Apt. #: {orderInfo.shipping.apt_number}
          </Typography>
          <Typography variant="h6">
            Zip Code: {orderInfo.shipping.zip_code}
          </Typography>
        </div>
        <Divider sx={{ bgcolor: "black", margin: "5px" }} />
      </div>

      <TableContainer component={Paper} elevation={3} id="tableContainer">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Items ( {inBag.length} )</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inBag.map((item) => (
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
      <div id="confirmationTotal">
        <Typography variant="subtitle1">Subtotal: ${subtotal}</Typography>
        <Typography variant="subtitle1">Tax: ${tax} </Typography>
        <Divider sx={{ bgcolor: "lightGrey" }} />
        <Typography variant="h6">Total: ${total} </Typography>
      </div>
      <Button
        id="placeOrderButton"
        onClick={() => handlePlaceOrder()}
      >
        Confirm and Place Order
      </Button>
    </div>
  );
}

export default Confirmation;