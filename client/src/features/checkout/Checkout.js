import React, { useState } from "react";
import Navbar from "../navigation/Navbar";
import { useSelector } from "react-redux";
import '../../styles/checkout.css'
import { Button, Step, StepButton, Stepper } from "@mui/material";

function Checkout(){
    const [activeStep, setActiveStep] = useState(0)
    let nextBtnDisplay = {display:'inline'}
    let placeOrderBtn = {display:'none'}
    let backBtnDisplay = {display:'inline'}
    const total = useSelector(state => state.total.value)
    const steps = ['Billing Information', 'Shipping Information', 'Confirmation']

    if (activeStep === steps.length -1){
        nextBtnDisplay = {display : 'none'}
        placeOrderBtn = {display : 'inline'}
    } else if (activeStep === 0){
        backBtnDisplay = {display:'none'}
    }

    function handleNext() {
        if(activeStep + 1 < steps.length -1){
            setActiveStep(activeStep + 1)
        } else if (activeStep + 1 >= steps.length -1){
            setActiveStep(steps.length - 1)
        }
    }

    function handleBack() {
        if(activeStep - 1 >= 0){
            setActiveStep(activeStep - 1)
        } else if (activeStep -1 < 0){
            setActiveStep(0)
        }
    }

    function handlePlaceOrder() {}
    return (
        <div className="main">
            <Navbar/>
            <div id="checkoutFormContainer">
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepButton onClick={() => setActiveStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
            </div>
            <Button id="next" onClick={() => handleNext()} sx={nextBtnDisplay}>
                Next
            </Button>
            <Button id="placeOrder" onClick={() => handlePlaceOrder()} sx={placeOrderBtn}>
                Place Order
            </Button>
            <Button id="back" onClick={() => handleBack()} sx={backBtnDisplay}>
                Back
            </Button>
        </div>
    )
}

export default Checkout;