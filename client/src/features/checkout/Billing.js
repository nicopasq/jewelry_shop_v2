import { Input, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Billing() {
  const billingInfo = useSelector(state => state.order.billing)
  const dispatch = useDispatch()
    
    function handleChange(e) {
      dispatch({type:'order/billing', payload:{...billingInfo, [e.target.name] : e.target.value}})
    }
    console.log(billingInfo)

  return (
    <form className="orderForm" >
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
        value={billingInfo.first_name}
        onChange={e => handleChange(e)}
      />
      <TextField
        label="Last Name"
        name="last_name"
        sx={{ margin: "5px" }}
        type="text"
        placeholder="Last Name"
        value={billingInfo.last_name}
        onChange={e => handleChange(e)}
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
        type="number" 
        placeholder="Card Number" 
        value={billingInfo.card_number}
        onChange={e => handleChange(e)}
        />
      </div>

      <div className="orderInput">
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
        value={billingInfo.expiration_date}
        onChange={e => handleChange(e)}
         />
      </div>

      <div className="orderInput">
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
        value={billingInfo.cvv}
        onChange={e => handleChange(e)}
        />
      </div>
    </form>
  );
}

export default Billing;
