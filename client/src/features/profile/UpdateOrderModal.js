import {
  Alert,
  Box,
  Button,
  Divider,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function UpdateOrderModal({
  displayUpdateForm,
  setDisplayUpdateForm,
  currentOrder,
  setCurrentOrder,
}) {
  const [alertDisplay, setAlertDisplay] = useState({display:'none'})
  const [alertMessage, setAlertMessage] = useState('')
  const [updatedOrder, setUpdatedOrder] = useState({
    holder_first_name: '',
    holder_last_name: "",
    first_name:'',
    last_name:'',
    expiration:'',
    card_number:'',
    cvv:'',
    zip_code:'',
    state:'',
    city:'',
    street_address:'',
    apt_number:''
  })
  const style = {
    borderRadius: "10px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 750,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    };


  function handleChange(e) {
    setUpdatedOrder({...updatedOrder, [e.target.name]: e.target.value || ''})
  }

  function handleUpdateOrder(e) {
    e.preventDefault();
    const values = Object.values(updatedOrder)
    const keys = []
    values.map((value, index) => {
      if (value === ''){
        return keys.push(Object.keys(updatedOrder)[index])
      }
      return value
    })

    keys.map(key => {
      return updatedOrder[key] = currentOrder[key]
    })

    fetch(`/orders/${currentOrder.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.errors){
          setDisplayUpdateForm(false)
          setCurrentOrder(data)
          setAlertDisplay({display:"none"})
          setAlertMessage('')
        } else {
          const errors = data.errors.map((error, index) => <li key={index}>{error}</li>)
          setAlertDisplay({display:true})
          setAlertMessage(errors)
        }
      })
      setUpdatedOrder({
        holder_first_name: '',
        holder_last_name: "",
        first_name:'',
        last_name:'',
        expiration:'',
        card_number:'',
        cvv:'',
        zip_code:'',
        state:'',
        city:'',
        street_address:'',
        apt_number:''
      })
  }
   
  return (
    <>
    <Modal
      open={displayUpdateForm}
      onClose={() => setDisplayUpdateForm(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <Alert severity="error" color="error" sx={alertDisplay} id="updateErrors">{alertMessage}</Alert>
        <form
          id="updateOrderForm"
          onSubmit={(e) => handleUpdateOrder(e)}
          style={{ marginLeft: "20%", marginBottom: "2%" }}
        >
          <div id="updateBillingForm">
            <Typography variant="h5" align="center">
              Billing
            </Typography>
            <label>
              <Typography variant="h6" sx={{ fontFamily: "serif" }}>
                <u>Name on Card:</u>
              </Typography>
              <TextField
                placeholder={currentOrder.holder_first_name}
                sx={{ margin: "5px" }}
                type="text"
                name="holder_first_name"
                onChange={(e) => handleChange(e)}
                value={updatedOrder.holder_first_name}
              />
              <TextField
                placeholder={currentOrder.holder_last_name}
                sx={{ margin: "5px" }}
                type="text"
                name="holder_last_name"
                onChange={(e) => handleChange(e)}
                value={updatedOrder.holder_last_name}
              />
            </label>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>Card Number</u>
                </Typography>
                <Input
                  id="card_number"
                  name="card_number"
                  className="formInput"
                  type="number"
                  placeholder={currentOrder.card_number}
                  onChange={(e) => handleChange(e)}
                  value={updatedOrder.card_number}
                />
              </label>
            </div>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>Expiration Date</u>
                </Typography>
                <Input
                  id="expiration"
                  className="formInput"
                  type="month"
                  name="expiration"
                  onChange={(e) => handleChange(e)}
                  value={updatedOrder.expiration || currentOrder.expiration}
                />
              </label>
            </div>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>Security Code</u>
                </Typography>
                <Input
                  id="securityCode"
                  placeholder={`${currentOrder.cvv}`}
                  className="formInput"
                  type="number"
                  name="cvv"
                  onChange={(e) => handleChange(e)}
                  value={updatedOrder.cvv}
                />
              </label>
            </div>
          </div>

          <div id="updateShippingForm">
            <Divider sx={{ bgcolor: "lightBlue" }} />
            <Typography variant="h5" marginTop={"1%"} align="center">
              Shipping
            </Typography>

            <Typography variant="h6">
              <u>Recipient:</u>
            </Typography>
            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>First Name</u>
                </Typography>
                <TextField
                  placeholder={currentOrder.first_name}
                  sx={{ margin: "5px" }}
                  type="text"
                  name="first_name"
                  onChange={(e) => handleChange(e)}
                  value={updatedOrder.first_name}
                />
              </label>
            </div>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>Last Name</u>
                </Typography>
                <TextField
                  placeholder={currentOrder.last_name}
                  sx={{ margin: "5px" }}
                  type="text"
                  name="last_name"
                  onChange={(e) => handleChange(e)}
                  value={updatedOrder.last_name}
                />
              </label>
            </div>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>State</u>
                </Typography>
                <TextField
                  placeholder={currentOrder.state}
                  sx={{ margin: "5px" }}
                  type="text"
                  name="state"
                  onChange={(e) => handleChange(e)}
                  value={updatedOrder.state}
                />
              </label>
            </div>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>City</u>
                </Typography>
                <TextField
                  placeholder={currentOrder.city}
                  sx={{ margin: "5px" }}
                  type="text"
                  name="city"
                  onChange={(e) => handleChange(e)}
                  value={updatedOrder.city}
                />
              </label>
            </div>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>Street Address</u>
                </Typography>
                <Input
                  placeholder={currentOrder.street_address} 
                  id="street_address"
                  className="formInput"
                  type="text"
                  name="street_address"
                  onChange={(e) => handleChange(e)}
                  value={updatedOrder.street_address}
                />
              </label>
            </div>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>Apt. #</u>
                </Typography>
                <Input
                  placeholder={`${currentOrder.apt_number}`}
                  id="apt_number"
                  className="formInput"
                  type="number"
                  name="apt_number"
                  onChange={(e) => handleChange(e)}
                  value={updatedOrder.apt_number}
                />
              </label>
            </div>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>Zip Code</u>
                </Typography>
                <Input
                  placeholder={`${currentOrder.zip_code}`}
                  id="zip_code"
                  className="formInput"
                  type="number"
                  name="zip_code"
                  onChange={(e) => handleChange(e)}
                  value={updatedOrder.zip_code}
                />
              </label>
            </div>
          </div>

          <div id="updateButtons">
            <Button
              sx={{ width: "30%", marginLeft: "5%", marginBottom: "5%" }}
              type="submit"
              >
              Update Order
            </Button>
            <Button
              sx={{ width: "30%", marginLeft: "5%", marginBottom: "5%" }} 
              onClick={() => setDisplayUpdateForm(false)}
              >
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
    </>
  );
}

export default UpdateOrderModal;