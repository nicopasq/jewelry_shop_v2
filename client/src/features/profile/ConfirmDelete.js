import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ConfirmDelete({displayConfirmDelete, setDisplayConfirmDelete, currentOrder}){
    const currentUser = useSelector(state => state.currentUser.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const style = { 
        borderRadius:'10px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };

      function handleDeleteOrder(){
        fetch(`/orders`, {
          method:"DELETE",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(currentOrder)
        })
        const updatedOrders = [...currentUser.orders].filter(order => order.id !== currentOrder.id)
        const updatedUser = {...currentUser, orders: updatedOrders}
        dispatch({type:"currentUser/updateBag", payload:updatedUser})
        navigate('/profile')
      }

    return(
        <Modal
        open={displayConfirmDelete}
        onClose={() => setDisplayConfirmDelete(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6">Are you sure you want to cancel your order?</Typography>
          <Button id="yesBtn" onClick={() => handleDeleteOrder()}>Yes, cancel my order</Button>
          <Button id="noBtn" onClick={() => setDisplayConfirmDelete(false)}>I changed my mind</Button>
        </Box>
      </Modal>
    )
}

export default ConfirmDelete;