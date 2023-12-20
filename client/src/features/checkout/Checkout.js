import React, { useState } from "react";
import Navbar from "../navigation/Navbar";
import './checkout.css'
import { Button, Step, StepButton, Stepper } from "@mui/material";
import Billing from "./Billing";
import Shipping from "./Shipping";
import Confirmation from "./Confirmation";

function Checkout(){
    const [activeStep, setActiveStep] = useState(0)
    const [renderForm, setRenderForm] = useState(<Billing />)
    let nextBtnDisplay = {display:'inline'}
    let backBtnDisplay = {display:'inline'}
    const steps = ['Billing Information', 'Shipping Information', 'Confirmation']

    if (activeStep === steps.length -1){
        nextBtnDisplay = {display : 'none'}
    } else if (activeStep === 0){
        backBtnDisplay = {display:'none'}
    }

    function handleEdit(param){
        setActiveStep(param)
        handleSwitch(param)
    }

    function handleSwitch(param){
        switch(param){
            case(0):
                return setRenderForm(<Billing />);
            case(1):
                return setRenderForm(<Shipping />);
            case(2):
                return setRenderForm(<Confirmation handleEdit={handleEdit}/>);
            default:
                return setRenderForm(<Billing />)
        }
    }

    function handleNext() {
        if(activeStep + 1 < steps.length -1){
            setActiveStep(activeStep + 1)
            handleSwitch(activeStep + 1)
        } else if (activeStep + 1 >= steps.length -1){
            setActiveStep(steps.length - 1)
            handleSwitch(steps.length - 1)
        }
    }
    function handleBack() {
        if(activeStep - 1 >= 0){
            setActiveStep(activeStep - 1)
            handleSwitch(activeStep - 1)
        } else if (activeStep -1 < 0){
            setActiveStep(0)
            handleSwitch(0)
        }
    }

    function handleStepBtn(index){
        setActiveStep(index)
        handleSwitch(index)
    }

    return (
        <div className="main">
            <Navbar/>
            <div id="checkoutFormContainer">
                <div id="stepper">
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepButton onClick={() => handleStepBtn(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </div>
                {renderForm}
                    <Button id="next" className="rightSide" onClick={() => handleNext()} sx={nextBtnDisplay}>
                        Next
                    </Button> 

                    <Button id="back" onClick={() => handleBack()} sx={backBtnDisplay}>
                        Back
                    </Button>
            </div>
        </div>
    )
}

export default Checkout;