import {
  Alert,
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
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Confirmation({ handleEdit }) {
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const mounted = useRef(false)
  const currentUser = useSelector((state) => state.currentUser.user);
  const inBag = [...currentUser.order_products].sort((a, b) =>a.id > b.id ? 1 : -1)
  .filter(p => p.in_cart === true)
  
  const orderInfo = useSelector((state) => state.order);
  const priceArray = inBag.map((product) => {
    const productObj = product.product;
    const price = productObj.price * product.quantity;
    return price;
  });
  const subtotal =
    priceArray.length > 0 ? priceArray.reduce((prev, cur) => prev + cur) : 0;

  const tax = parseFloat((subtotal * 0.029).toFixed(2));
  const total = (subtotal + tax).toFixed(2);
  const cardNum = orderInfo.billing.card_number.match(/.{1,4}/g)?.join("-");
  const [alertMessage, setAlertMessage] = useState([])
  const [alertDisplay, setAlertDisplay] = useState({display:'none'})
  let timeOut = undefined

  if (mounted.current === true){
    timeOut = setTimeout(() => {
      setAlertDisplay({display: 'none'});
    }, 10000)
  }

  useEffect(() => {
    mounted.current = true

    return () => {
      clearTimeout(timeOut)
      mounted.current = false
    }
  }, [timeOut])

  function showAlert(errors){
    const errorJSX = errors.map((error, index) => <li key={index}>{error}</li>)
    setAlertMessage(errorJSX)
    setAlertDisplay({display:true})
  }

  function handlePlaceOrder(){
    const orderBody = {...orderInfo.billing, ...orderInfo.shipping, user_id:currentUser.id}
    if (inBag.length > 0){
    fetch('/orders', {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(orderBody)
    })
    .then(r => r.json())
    .then(data => {
      if (!data.errors){
        const updatedOrders = [...currentUser.orders, data.new_order]
        const updatedUser = {...currentUser, order_products:data.order_products, orders:updatedOrders}
        navigation('/bag/thankYou')
        dispatch({type:'currentUser/update', payload:updatedUser})
        dispatch({type:'order/clear'})
      } else {
        showAlert(data.errors)
      }
    })
  } else { showAlert(["Can not checkout an empty bag."])}
  }

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
            {orderInfo.billing.holder_first_name + " " + orderInfo.billing.holder_last_name}
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

<Alert severity="error" sx={alertDisplay}>{alertMessage}</Alert>

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