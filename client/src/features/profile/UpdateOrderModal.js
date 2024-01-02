import {
  Box,
  Button,
  Divider,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function UpdateOrderModal({
  displayUpdateForm,
  setDisplayUpdateForm,
  currentOrder,
}) {
    const updatedBilling = {
        holder_first_name: 'update firstName',
        holder_last_name: 'updated lastName',
        card_number: '9485857373648586',
        expiration: '02-14-3041',
        cvv: 648,
    }
    const updateShipping = {
        first_name: 'updated first_name',
        last_name: 'upddated last_name',
        state: 'Dinosaur',
        city: 'Colorado',
        street_address: '1234 5th Street',
        apt_number: 564,
        zip_code: 40995
    }
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

  function handleUpdateBilling(e){
    e.preventDefault()
    console.log(updatedBilling)
  }

  function handleUpdateShipping(e){
    e.preventDefault()
    console.log(updateShipping)
  }

  return (
    <Modal
      open={displayUpdateForm}
      onClose={() => setDisplayUpdateForm(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5">Billing</Typography>
        <form
          id='updateBillingInfo'
          className="orderForm"
          onSubmit={(e) => handleUpdateBilling(e)}
          style={{ marginLeft: "20%", marginBottom: "2%" }}
        >
          <label>
            <Typography variant="h6" sx={{ fontFamily: "serif" }}>
              <u>Name on Card:</u>
            </Typography>
          <TextField
            label="First Name"
            sx={{ margin: "5px" }}
            type="text"
            value={updatedBilling.holder_first_name}
            />
          <TextField
            label="Last Name"
            sx={{ margin: "5px" }}
            type="text"
            value={updatedBilling.holder_last_name}
            />
            </label>

          <div className="orderInput">
            <label>
              <Typography variant="subtitle1">
                <u>Card Number</u>
              </Typography>
            <Input
              id ='card_number'
              name="card_number"
              className="formInput"
              value={updatedBilling.card_number}
              />
              </label>
          </div>

          <div className="orderInput">
            <label>
              <Typography variant="subtitle1">
                <u>Expiration Date</u>
              </Typography>
            <Input id="expiration" className="formInput" value={updatedBilling.expiration} />
            </label>
          </div>

          <div className="orderInput">
            <label>
              <Typography variant="subtitle1">
                <u>Security Code</u>
              </Typography>
            <Input id="securityCode" className="formInput" type="number" value={updatedBilling.cvv} />
            </label>
          </div>

          <Button
            sx={{ width: "30%", marginLeft: "5%", marginBottom: "5%" }}
            type="submit"
          >
            Submit Billing Information
          </Button>
        </form>

        <Divider sx={{ bgcolor: "lightBlue" }} />

        <Typography variant="h5" marginTop={"1%"} >
          Shipping
        </Typography>
        <form
          onSubmit={(e) => handleUpdateShipping(e)}
          className="orderForm"
          id="updateShippingForm"
          style={{ marginLeft: "20%" }}
        >
          <Typography variant="h6">
            <u>Recipient:</u>
          </Typography>
          <div className="orderInput">
            <label>
              <Typography variant="subtitle1">
                <u>First Name</u>
              </Typography>
            <TextField
              label="First Name"
              sx={{ margin: "5px" }}
              type="text"
              value={updateShipping.first_name}
              />
              </label>
          </div>

          <div className="orderInput">
            <label>
              <Typography variant="subtitle1">
                <u>Last Name</u>
              </Typography>
            <TextField
              label="Last Name"
              sx={{ margin: "5px" }}
              type="text"
              value={updateShipping.last_name}
              />
              </label>
          </div>

          <div className="orderInput">
            <label>
              <Typography variant="subtitle1">
                <u>State</u>
              </Typography>
            <TextField
              label="State"
              sx={{ margin: "5px" }}
              type="text"
              value={updateShipping.state}
              />
              </label>
          </div>

          <div className="orderInput">
            <label>
              <Typography variant="subtitle1">
                <u>City</u>
              </Typography>
            <TextField
              label="City"
              sx={{ margin: "5px" }}
              type="text"
              value={updateShipping.city}
              />
              </label>
          </div>

          <div className="orderInput">
            <label>
              <Typography variant="subtitle1">
                <u>Street Address</u>
              </Typography>
            <Input
              id = "street_address"
              className="formInput"
              type="text"
              value={updateShipping.street_address}
              />
              </label>
          </div>

          <div className="orderInput">
            <label>
              <Typography variant="subtitle1">
                <u>Apt. #</u>
              </Typography>
            <Input id="apt_number" className="formInput" type="number" value={updateShipping.apt_number} />
            </label>
          </div>

          <div className="orderInput">
            <label>
              <Typography variant="subtitle1">
                <u>Zip Code</u>
              </Typography>
            <Input id="zip_code" className="formInput" type="number" value={updateShipping.zip_code} />
            </label>
          </div>
          <Button
            sx={{ width: "30%", marginLeft: "5%", marginBottom: "5%" }}
            type="submit"
          >
            Submit Shipping Information
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default UpdateOrderModal;
