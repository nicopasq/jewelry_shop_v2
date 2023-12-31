import { Input, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Shipping() {
  const dispatch = useDispatch();
  const shippingInfo = useSelector((state) => state.order.shipping);

  function handleChange(e) {
    dispatch({
      type: "order/shipping",
      payload: { ...shippingInfo, [e.target.name]: e.target.value },
    });
  }

  return (
    <form className="orderForm" id="shippingForm">
      <Typography variant="h6">
        <u>Recipient:</u>
      </Typography>
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
          placeholder="First Name"
          name="first_name"
          value={shippingInfo.first_name}
          onChange={(e) => handleChange(e)}
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
          placeholder="Last Name"
          name="last_name"
          value={shippingInfo.last_name}
          onChange={(e) => handleChange(e)}
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
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={(e) => handleChange(e)}
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
          placeholde="City"
          name="city"
          value={shippingInfo.city}
          onChange={(e) => handleChange(e)}
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
          placeholder="Street Address"
          name="street_address"
          value={shippingInfo.street_address}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="orderInput">
        <label>
          <Typography variant="subtitle1">
            <u>Apt. #</u>
          </Typography>
        </label>
        <Input
          name="apt_number"
          className="formInput"
          type="number"
          placeholder="Apt. #"
          value={shippingInfo.apt_number}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="orderInput">
        <label>
          <Typography variant="subtitle1">
            <u>Zip Code</u>
          </Typography>
        </label>
        <Input
          name="zip_code"
          className="formInput"
          type="number"
          placeholder="zip"
          value={shippingInfo.zip_code}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </form>
  );
}

export default Shipping;
