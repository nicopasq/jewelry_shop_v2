import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ConfirmDelete({
  displayConfirmDelete,
  setDisplayConfirmDelete,
  currentOrder,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const style = {
    borderRadius: "10px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 485,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  function handleDeleteOrder() {
    fetch(`/orders/${currentOrder.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: "currentUser/update", payload: data });
        navigate("/profile");
      });
  }

  return (
    <Modal
      open={displayConfirmDelete}
      onClose={() => setDisplayConfirmDelete(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6">
          Are you sure you want to cancel your order?
        </Typography>
        <Button id="yesBtn" onClick={() => handleDeleteOrder()}>
          Yes, cancel my order.
        </Button>
        <Button id="noBtn" onClick={() => setDisplayConfirmDelete(false)}>
          No, don't cancel my order.
        </Button>
      </Box>
    </Modal>
  );
}

export default ConfirmDelete;
