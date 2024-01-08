import {
  Box,
  Button,
  Divider,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function UpdateOrderModal({
  displayUpdateForm,
  setDisplayUpdateForm,
  currentOrder,
  setCurrentOrder,
}) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.user);
  const updatedOrder = {
    user_id: currentUser.id,
    holder_first_name: "update firstName",
    holder_last_name: "updated lastName",
    card_number: "9485857373648586",
    expiration: "2041-02",
    cvv: 648,
    first_name: "updated first_name",
    last_name: "upddated last_name",
    city: "Dinosaur",
    state: "Colorado",
    street_address: "1234 5th Street",
    apt_number: 564,
    zip_code: 40995,
  };
  const style = {
    borderRadius: "10px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 750,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  function handleUpdateOrder(e) {
    e.preventDefault();
    fetch(`/orders/${currentOrder.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    })
      .then((r) => r.json())
      .then((data) => {
        const updatedOrders = [...currentUser.orders].map((order) =>
          order.id === data.id ? (order = data) : order
        );
        const updatedUser = { ...currentUser, orders: updatedOrders };
        dispatch({ type: "currentUser/update", payload: updatedUser });
        setCurrentOrder(data);
        setDisplayUpdateForm(false);
      });
  }

  return (
    <Modal
      open={displayUpdateForm}
      onClose={() => setDisplayUpdateForm(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form
          id="updateOrderForm"
          onSubmit={(e) => handleUpdateOrder(e)}
          style={{ marginLeft: "20%", marginBottom: "2%" }}
        >
          <div id="billingForm">
            <Typography variant="h5" align="center">
              Billing
            </Typography>
            <label>
              <Typography variant="h6" sx={{ fontFamily: "serif" }}>
                <u>Name on Card:</u>
              </Typography>
              <TextField
                label="First Name"
                sx={{ margin: "5px" }}
                type="text"
                value={updatedOrder.holder_first_name}
              />
              <TextField
                label="Last Name"
                sx={{ margin: "5px" }}
                type="text"
                value={updatedOrder.holder_last_name}
              />
            </label>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>Card Number</u>
                </Typography>
                <Input
                  id="card_number"
                  name="card_number"
                  className="formInput"
                  value={updatedOrder.card_number}
                />
              </label>
            </div>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>Expiration Date</u>
                </Typography>
                <Input
                  id="expiration"
                  className="formInput"
                  type="month"
                  value={updatedOrder.expiration}
                />
              </label>
            </div>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>Security Code</u>
                </Typography>
                <Input
                  id="securityCode"
                  className="formInput"
                  type="number"
                  value={updatedOrder.cvv}
                />
              </label>
            </div>
          </div>

          <div id="shippingForm">
            <Divider sx={{ bgcolor: "lightBlue" }} />
            <Typography variant="h5" marginTop={"1%"} align="center">
              Shipping
            </Typography>

            <Typography variant="h6">
              <u>Recipient:</u>
            </Typography>
            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>First Name</u>
                </Typography>
                <TextField
                  label="First Name"
                  sx={{ margin: "5px" }}
                  type="text"
                  value={updatedOrder.first_name}
                />
              </label>
            </div>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>Last Name</u>
                </Typography>
                <TextField
                  label="Last Name"
                  sx={{ margin: "5px" }}
                  type="text"
                  value={updatedOrder.last_name}
                />
              </label>
            </div>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>State</u>
                </Typography>
                <TextField
                  label="State"
                  sx={{ margin: "5px" }}
                  type="text"
                  value={updatedOrder.state}
                />
              </label>
            </div>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>City</u>
                </Typography>
                <TextField
                  label="City"
                  sx={{ margin: "5px" }}
                  type="text"
                  value={updatedOrder.city}
                />
              </label>
            </div>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>Street Address</u>
                </Typography>
                <Input
                  id="street_address"
                  className="formInput"
                  type="text"
                  value={updatedOrder.street_address}
                />
              </label>
            </div>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>Apt. #</u>
                </Typography>
                <Input
                  id="apt_number"
                  className="formInput"
                  type="number"
                  value={updatedOrder.apt_number}
                />
              </label>
            </div>

            <div className="orderInput">
              <label>
                <Typography variant="subtitle1">
                  <u>Zip Code</u>
                </Typography>
                <Input
                  id="zip_code"
                  className="formInput"
                  type="number"
                  value={updatedOrder.zip_code}
                />
              </label>
            </div>
            <Button
              sx={{ width: "30%", marginLeft: "5%", marginBottom: "5%" }}
              type="submit"
            >
              Update Order
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default UpdateOrderModal;
