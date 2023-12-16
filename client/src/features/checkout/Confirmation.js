import { Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function Confirmation({handleEdit}){
    const currentUser = useSelector(state => state.currentUser.value)
    const sortedBagItems = [...currentUser.order_products].sort((a,b) => (a.id > b.id) ? 1 : -1)
    console.log('sortedBagItems', sortedBagItems)
    const orderInfo = useSelector(state => state.order)
    console.log('orderInfo', orderInfo)


    const priceArray = sortedBagItems.map(product => {
        const productObj = product.product
        const price = productObj.price * product.quantity
        return price
    })

    const subtotal = priceArray.length > 0 ? priceArray.reduce((prev, cur) => prev + cur) : 0;
    const tax = (subtotal * .029).toFixed(2)
    const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2)
    const cardNum = orderInfo.billing.card_number.match(/.{1,4}/g)?.join('-');
    return (
        <div id="confirmationPage">
            <Typography variant="h5">
                Order Details
            </Typography>
            <div id="userInfo">
                <Typography variant="h5"><u>Billing</u></Typography>
                <Button variant="text" className="editInfo" onClick={() => handleEdit(0)}>Edit</Button>
                <div className="userDetails">
                <Typography variant="h6">Card Holder: {orderInfo.billing.first_name+' '+orderInfo.billing.last_name }</Typography>
                <Typography variant="h6">Card #: {cardNum}</Typography>
                <Typography variant="h6">Expiration Date: {orderInfo.billing.expiration_date}</Typography>
                </div>
                <Typography variant="h5"><u>Shipping</u></Typography>
                <Button variant="text" className="editInfo" onClick={() => handleEdit(1)}>Edit</Button>
                <div className="userDetails">
                <Typography variant="h6">Recipient: {orderInfo.shipping.first_name+' '+orderInfo.shipping.last_name }</Typography>
                <Typography variant="h6">State: {orderInfo.shipping.state}</Typography>
                <Typography variant="h6">City: {orderInfo.shipping.city}</Typography>
                <Typography variant="h6">Street {orderInfo.shipping.street_address}</Typography>
                <Typography variant="h6">Apt. #: {orderInfo.shipping.apt_number}</Typography>
                <Typography variant="h6">Zip Code: {orderInfo.shipping.zip_code}</Typography>
                </div>
                <Divider sx={{bgcolor:'black', margin:'5px'}}/>
            </div>

            <TableContainer component={Paper} elevation={3} id="tableContainer">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Items ( {sortedBagItems.length} )</TableCell>
                            <TableCell align="right">Size</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedBagItems.map(item => (
                            <TableRow 
                            key={item.id}
                            sx={{ border: 0 }}
                            >
                            <TableCell scope="row">
                                {item.product.product_name}
                            </TableCell>
                            <TableCell align="right">{item.size}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">${item.product.price.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div id="confirmationTotal">
                <Typography variant="subtitle1">Subtotal: ${subtotal}</Typography>
                <Typography variant="subtitle1">Tax: ${tax} </Typography>
                <Divider sx={{bgcolor:'lightGrey'}}/>
                <Typography variant="h6">Total: ${total} </Typography>
            </div>
            <Button
                id="placeOrderButton"
                // onClick={() => handlePlaceOrder}
            >Confirm and Place Order</Button>
        </div>
    )
}

export default Confirmation;