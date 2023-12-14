import { Button, Input, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function Billing({handleNext}) {

  const [billingInfo, setBillingInfo] = useState({
    first_name: "",
    last_name: "",
    card_number: "",
    expiration_date: "",
    cvv: "",
  });

  function handleChange(e) {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  }


  function handleSubmit(e){
    e.preventDefault()
    console.log('billing info', billingInfo)
    handleNext()
}

  return (
    <form id="billingForm" onSubmit={(e) => handleSubmit(e)}>
      <label>
        <Typography variant="h6" sx={{ fontFamily: "serif" }}>
          <u>Name on Card:</u>
        </Typography>
      </label>
      <TextField
        label="First Name"
        sx={{ margin: "5px" }}
        type="text"
        placeholder="First Name"
        name="first_name"
        onChange={e => handleChange(e)}
      />
      <TextField
        label="Last Name"
        name="last_name"
        sx={{ margin: "5px" }}
        type="text"
        placeholder="Last Name"
        onChange={e => handleChange(e)}
      />
      <div className="billingInput">
        <label>
          <Typography variant="subtitle1">
            <u>Card Number</u>
          </Typography>
        </label>
        <Input 
        name="card_number" 
        className="formInput" 
        type="number" 
        placeholder="Card Number" 
        onChange={e => handleChange(e)}
        />
      </div>

      <div className="billingInput">
        <label>
          <Typography variant="subtitle1">
            <u>Expiration Date</u>
          </Typography>
        </label>
        <Input
        name="expiration_date" 
        className="formInput" 
        type="date" 
        placeholder="Exp."
        onChange={e => handleChange(e)}
         />
      </div>

      <div className="billingInput">
        <label>
          <Typography variant="subtitle1">
            <u>Security Code</u>
          </Typography>
        </label>
        <Input 
        name="cvv"
        className="formInput" 
        type="number"
        placeholder="cvv" 
        onChange={e => handleChange(e)}
        />
      </div>
      <Button id="next" className="rightSide" type="submit">
        Next
      </Button>
    </form>
  );
}

export default Billing;
