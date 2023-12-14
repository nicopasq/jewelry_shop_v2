import { Button, Input } from "@mui/material";
import React from "react";

function Shipping(){

    function handleSubmit(e){
        e.preventDefault();
    }
    return (
        <form id="shippingForm" onSubmit={(e) => handleSubmit(e)}>
            <Input type="text" placeholder="State"/>
            <Input type="text" placeholder="City"/>
            <Input type="text" placeholder="Street Address"/>
            <Input type="number" placeholder="Apt. #"/>
            <Input type="number" placeholder="zip"/>
        </form>
    )
}

export default Shipping;