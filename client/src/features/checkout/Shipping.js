import { Button, Input } from "@mui/material";
import React from "react";

function Shipping({handleNext}){

    function handleSubmit(e){
        e.preventDefault();
        handleNext()
    }
    return (
        <form id="shippingForm" onSubmit={(e) => handleSubmit(e)}>
            <Input type="text" placeholder="State"/>
            <Input type="text" placeholder="City"/>
            <Input type="text" placeholder="Street Address"/>
            <Input type="number" placeholder="Apt. #"/>
            <Input type="number" placeholder="zip"/>
            <Button id="next" className="rightSide" type="submit">
                Next
            </Button>
        </form>
    )
}

export default Shipping;