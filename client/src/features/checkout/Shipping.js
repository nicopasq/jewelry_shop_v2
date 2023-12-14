import { Input } from "@mui/material";
import React from "react";

function Shipping(){
    return (
        <form id="shippingForm">
            <Input type="text" placeholder="State"/>
            <Input type="text" placeholder="City"/>
            <Input type="text" placeholder="Street Address"/>
            <Input type="number" placeholder="Apt. #"/>
            <Input type="number" placeholder="zip"/>
        </form>
    )
}

export default Shipping;