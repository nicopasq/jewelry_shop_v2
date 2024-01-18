import React, { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "./showOrder.css";
import ConfirmDelete from "./ConfirmDelete";
import UpdateOrderModal from "./UpdateOrderModal";

// Make Update Order form have user info, not misc updated info
// Create "Cancel Order" Button in Update Order Form.
// Change Button text for Cancel Order



function ShowOrder() {
  const { order_number } = useParams();
  const [currentOrder, setCurrentOrder] = useState({});
  const [displayUpdateForm, setDisplayUpdateForm] = useState(false);
  const [displayConfirmDelete, setDisplayConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const currentOrderCopy = { ...currentOrder };
  let cardNum;
  let expirationDate;
  let products;

  if (currentOrderCopy.id) {
    cardNum = currentOrder.card_number.match(/.{1,4}/g)?.join("-");
    products = currentOrder.order_products;
    const tempDate = currentOrder.expiration.split("-");
    const year = tempDate.shift();
    tempDate.push(year);
    expirationDate = tempDate.join("-");
  }

  const priceArray = products?.map((product) => {
    const productObj = product.product;
    const price = productObj.price * product.quantity;
    return price;
  });
  const subtotal =
    priceArray?.length > 0 ? priceArray.reduce((prev, cur) => prev + cur) : 0;

  const tax = subtotal * 0.029;
  const total = subtotal + tax;

  useEffect(() => {
    fetch(`/orders/${order_number}`)
      .then((r) => r.json())
      .then((data) => setCurrentOrder(data));
  }, [order_number]);

  function handleAction(action) {
    if (action === "edit") {
      setDisplayUpdateForm(true);
    } else {
      setDisplayConfirmDelete(true);
    }
  }

  return (
    <div className="main">
      <Navbar />
      <Button
        variant="outlined"
        id="orderBackBtn"
        onClick={() => navigate("/profile")}
      >
        Back to Profile
      </Button>
      <Container>
        <Typography
          variant="h3"
          align="left"
          marginBottom="1%"
          fontFamily="serif"
        >
          <u>Order #: {currentOrder.order_number}</u>
        </Typography>
        <ConfirmDelete
          displayConfirmDelete={displayConfirmDelete}
          setDisplayConfirmDelete={setDisplayConfirmDelete}
          currentOrder={currentOrder}
        />
        <UpdateOrderModal
          setCurrentOrder={setCurrentOrder}
          displayUpdateForm={displayUpdateForm}
          setDisplayUpdateForm={setDisplayUpdateForm}
          currentOrder={currentOrder}
        />
        <div id="actionButtons">
          <Button onClick={() => handleAction("edit")}>Edit</Button>|
          <Button onClick={() => handleAction("cancel")}>Cancel</Button>
        </div>
        <div id="shippingInfo" className="infoDisplay">
          <Typography variant="h6">
            <u>Recipient:</u>
          </Typography>
          <Typography variant="subtitle1">
            <u>First Name:</u> {currentOrder.first_name}
          </Typography>

          <Typography variant="subtitle1">
            <u>Last Name:</u> {currentOrder.last_name}
          </Typography>

          <Typography variant="subtitle1">
            <u>City:</u> {currentOrder.city}
          </Typography>

          <Typography variant="subtitle1">
            <u>State:</u> {currentOrder.state}
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
          <Typography variant="h6">
            <u>Billing Info:</u>
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: "serif" }}>
            <u>Name on Card:</u>{" "}
            {currentOrder.holder_first_name +
              " " +
              currentOrder.holder_last_name}
          </Typography>

          <Typography variant="subtitle1">
            <u>Card Number:</u> {cardNum}
          </Typography>

          <Typography variant="subtitle1">
            <u>Expiration Date:</u> {expirationDate}
          </Typography>
        </div>
        <div id="orderTotal">
          <Typography variant="h6">Subtotal: ${subtotal.toFixed(2)}</Typography>
          <Typography variant="h6">Tax: ${tax.toFixed(2)}</Typography>
          <Typography variant="h5">Total: ${total.toFixed(2)}</Typography>
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
                    <TableCell scope="row">
                      {item.product.product_name}
                    </TableCell>
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
