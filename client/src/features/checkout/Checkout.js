import React from "react";
import Navbar from "../navigation/Navbar";
import { useSelector } from "react-redux";
import '../../styles/checkout.css'

function Checkout(){
    const total = useSelector(state => state.total.value)
    const steps = []
    return (
        <div className="main">
            <Navbar/>
            <div id="checkoutFormContainer">

            </div>
        </div>
    )
}

export default Checkout;