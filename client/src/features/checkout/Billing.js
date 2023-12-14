import { Input, TextField, Typography } from "@mui/material";
import React from "react";

function Billing(){
    return (
        <form id="billingForm">
            <label>
                <Typography variant="h6" sx={{fontFamily:"serif"}}>
                <u>Name on Card:</u>
                </Typography>
            </label>
            <TextField label="First Name" sx={{margin:'5px'}} type="text" placeholder="First Name" />
            <TextField label="Last Name" sx={{margin:'5px'}} type="text" placeholder="Last Name" />
            <div className="billingInput">
            <label>
                <Typography variant="subtitle1">
                    <u>Card Number</u>
                </Typography>
            </label>
                <Input className="formInput" type="number" placeholder="Card Number" />
            </div>

            <div className="billingInput">
            <label>
                <Typography variant="subtitle1">
                    <u>Expiration Date</u>
                </Typography>
            </label>
                <Input className="formInput"  type="date" placeholder="Exp." />
            </div>

            <div className="billingInput">
            <label>
                <Typography variant="subtitle1">
                    <u>Security Code</u>
                </Typography>
            </label>
            <Input className="formInput"  type="number" placeholder="cvv" />
            </div>
        </form>
    )
}

export default Billing;