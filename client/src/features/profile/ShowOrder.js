import React, { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar";
import { useParams } from "react-router-dom";

function ShowOrder(){
    const { order_number } = useParams()
    const [currentOrder, setCurrentOrder] = useState({})

    useEffect(() => {
        fetch(`/orders/${order_number}`)
        .then(r => r.json())
        .then(data => setCurrentOrder(data))
    }, [])

    console.log(currentOrder)

    return (
        <div className="main">
            <Navbar />
            <h1>Your Order</h1> 

        </div>
    )
}

export default ShowOrder;