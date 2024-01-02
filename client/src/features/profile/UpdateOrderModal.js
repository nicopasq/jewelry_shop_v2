import { Box, Button, Divider, Input, Modal, TextField, Typography } from "@mui/material";
import React from "react";

function UpdateOrderModal({displayUpdateForm, setDisplayUpdateForm, currentOrder}){
    const style = {
        borderRadius:'10px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height:750,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };

return (
    <Modal
    open={displayUpdateForm}
    onClose={() => setDisplayUpdateForm(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
        <Typography variant="h5">Billing</Typography>
        <form className="orderForm" id="billingForm" style={{marginLeft:'20%', marginBottom:'2%'}}>
      <label>
        <Typography variant="h6" sx={{ fontFamily: "serif" }}>
          <u>Name on Card:</u>
        </Typography>
      </label>
      <TextField
        label="First Name"
        sx={{ margin: "5px" }}
        type="text"
        value="Updated First Name"
      />
      <TextField
        label="Last Name"
        sx={{ margin: "5px" }}
        type="text"
        value="Updated Last Name"
      />
      <div className="orderInput">
        <label>
          <Typography variant="subtitle1">
            <u>Card Number</u>
          </Typography>
        </label>
        <Input
        name="card_number" 
        className="formInput" 
        value='9876987698769876'
        />
      </div>

      <div className="orderInput">
        <label>
          <Typography variant="subtitle1">
            <u>Expiration Date</u>
          </Typography>
        </label>
        <Input
        className="formInput"  
        value='03-14-3041'
         />
      </div>

      <div className="orderInput">
        <label>
          <Typography variant="subtitle1">
            <u>Security Code</u>
          </Typography>
        </label>
        <Input 
        className="formInput" 
        type="number"
        value={789}
        />
      </div>
      <Button sx={{width:'30%', marginLeft:'5%', marginBottom:'5%'}} type="submit">Submit Billing Information</Button>
    </form>

    <Divider sx={{bgcolor:'lightBlue'}}/>

    <Typography variant="h5" marginTop={'2%'} marginBottom={'5%'}>Shipping</Typography>
        <form className="orderForm" id="shippingForm" style={{marginLeft:'20%'}}> 
      <Typography variant="h6"><u>Recipient:</u></Typography>
      <div className="orderInput">
        <label>
          <Typography variant="subtitle1">
            <u>First Name</u>
          </Typography>
        </label>
        <TextField
          label="First Name"
          sx={{ margin: "5px" }}
          type="text"
          value={'updated first_Name'}
        />
      </div>

      <div className="orderInput">
        <label>
          <Typography variant="subtitle1">
            <u>Last Name</u>
          </Typography>
        </label>
        <TextField
          label="Last Name"
          sx={{ margin: "5px" }}
          type="text"
          value={"updated last_Name"}
        />
      </div>

      <div className="orderInput">
        <label>
          <Typography variant="subtitle1">
            <u>State</u>
          </Typography>
        </label>
        <TextField
          label="State"
          sx={{ margin: "5px" }}
          type="text"
          value={"Colorado"}
        />
      </div>

      <div className="orderInput">
        <label>
          <Typography variant="subtitle1">
            <u>City</u>
          </Typography>
        </label>
        <TextField
          label="City"
          sx={{ margin: "5px" }}
          type="text"
          value={'Dinosaur'}
        />
      </div>

      <div className="orderInput">
        <label>
          <Typography variant="subtitle1">
            <u>Street Address</u>
          </Typography>
        </label>
        <Input
          className="formInput"
          type="text"
          value={'1234 5th street'}
        />
      </div>

      <div className="orderInput">
        <label>
          <Typography variant="subtitle1">
            <u>Apt. #</u>
          </Typography>
        </label>
        <Input
          className="formInput"
          type="number"
          value={546}
        />
      </div>

      <div className="orderInput">
        <label>
          <Typography variant="subtitle1">
            <u>Zip Code</u>
          </Typography>
        </label>
        <Input
          className="formInput"
          type="number"
          value={80422}
        />
      </div>
      <Button sx={{width:'30%', marginLeft:'5%', marginBottom:'5%'}} type="submit">Submit Shipping Information</Button>
    </form>
    </Box>
  </Modal>
)
}

export default UpdateOrderModal

