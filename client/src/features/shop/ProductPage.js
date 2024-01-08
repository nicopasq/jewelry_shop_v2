import React, { useEffect, useRef, useState } from "react";
import Navbar from "../navigation/Navbar";
import {  useNavigate, useParams } from "react-router-dom";
import images from "../../images/images";
import './productPage.css'
import {
  Alert,
  Button,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function ProductPage() {
  const dispatch = useDispatch()
  const mounted = useRef(false)
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.currentUser.user);
  const [alertSeverity, setAlertSeverity] = useState('error')
  const [alertMessage, setAlertMessage] = useState([])
  const [alertDisplay, setAlertDisplay] = useState({display:'none'})
  const [currentProduct, setCurrentProduct] = useState({});
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState('')
  const { id } = useParams();
  let ringDisplay = { display: "none" };
  const bag = currentUser.order_products
  const menuItems = [
    5.0, 5.25, 5.5, 6.0, 6.25, 6.5, 7.0, 7.25, 7.5, 8.0, 8.25, 8.5, 9.0, 9.25,
    9.5, 10, 10.25, 10.5, 11].map((size) => (
    <MenuItem value={size} key={size}> {size} </MenuItem>));

  const orderBody = {
    product_id: currentProduct.id,
    order_id: null,
    in_cart: true,
    size: "",
    quantity:0,
    ring: false
  };

  if (currentProduct && currentProduct.product_type === "ring") {
    ringDisplay = { display: "block" };
  }

  let timeOut = undefined
  if (mounted.current && alertDisplay.display === true){
   timeOut = setTimeout(() => {
      setAlertMessage('')
      setAlertDisplay({display: 'none'})
    }, 5000)
  }

  useEffect(() => {
    mounted.current = true;

    return () => {
      clearTimeout(timeOut);
      mounted.current = false
    }
  }, [timeOut])

  useEffect(() => {
    fetch(`/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        return images.map((image) => {
          if (image.includes(data.image_path)) {
            data.image = image;
            return setCurrentProduct(data);
          }
          return null
        });
      });
  }, []);
  

    function createAlert(message, severity, display){
      setAlertMessage(message)
      setAlertSeverity(severity)
      setAlertDisplay(display)
    }

    function orderProduct(){
      let orderBodyCopy = {}
      if (currentProduct.product_type === 'ring'){
        orderBodyCopy = {...orderBody, ring: true, size:size, quantity:parseInt(quantity)}
      } else{
        orderBodyCopy = {...orderBody, ring: false, quantity:parseInt(quantity)}
      }

      if (orderBodyCopy.ring && orderBodyCopy.size > 0 || orderBodyCopy.ring === false){
        fetch('/order_products', {
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(orderBodyCopy)
        })
        .then(r => r.json())
        .then(data => {
          if (data.errors){
            createAlert(
              <Typography variant="body1">Quantity must be greater than 0</Typography>,
              'error',
              {display:true}
            )
          } else{
            createAlert(
              <Typography variant="body1">Added to bag</Typography>,
              'success',
              {display:true}
            )
            if (!bag.find(item => item.id === data.id)){
              const updatedBag = [...bag, data]
              const updatedUser = {...currentUser, order_products:updatedBag}
              dispatch({type:'currentUser/update', payload:updatedUser})
            } else {
              const updatedBag = bag.map(item => item.id === data.id ? item = data : item)
              const updatedUser = {...currentUser, order_products:updatedBag}
              dispatch({type:'currentUser/update', payload:updatedUser})
            }
          }
        })
      } else{
        createAlert(
          <Typography variant="body1">Please enter a size</Typography>,
          'error',
          {display:true}
        )
      }
    }
    return (
    <div className="main">
      <Navbar />
      <Alert sx={alertDisplay} severity={alertSeverity} id="alert">{alertMessage}</Alert>
      <Button variant="text" id="backBtn" onClick={() => navigate(-1)}>Go Back</Button>
      <div id="imageContainer" className="halfScreen">
        <img
          src={currentProduct.image}
          alt={currentProduct.product_name}
          id="productImage"
        />
      </div>
      <div id="productDetails" className="halfScreen">
        <div id="productData">
          <Typography variant="h3" id="productName" className="productData">
            {currentProduct.product_name}
          </Typography>
          <Divider sx={{ bgcolor: "lightGrey", width: "90%" }} />
        </div>

        <div id="ringSize">
          <div id="sizeForm" className="productData" style={ringDisplay}>
            <InputLabel id="ringSizes">Ring Size:</InputLabel>
            <Select
              id="selectSize"
              value={size}
              label="RingSize"
              placeholder="Select Ring Size"
              sx={{
                height: "6vh",
                width: "15vw",
                position: "relative",
                bottom: "5vh",
              }}
              onChange={(e) => setSize(e.target.value)}
            >
              {menuItems}
            </Select>
          </div>

          <div id="quantityForm">
            <InputLabel id="quantity" sx={{ marginTop: "60px" }}>
              Quantity:
            </InputLabel>
            <TextField
              type="number"
              placeholder="Enter Quantity"
              className="qty"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <Divider sx={{ bgcolor: "lightGrey", width: "90%" }} />
        </div>

        <div id="payment">
          <Typography variant="h5" className="productData">
            Total:
          </Typography>
          <Divider
            sx={{
              bgcolor: "lightGrey",
              width: "90%",
              marginTop: "5px",
              marginBottom: "10px",
            }}
          />
          <Typography variant="h4" className="productData">
            ${currentProduct.price}
          </Typography>
          <Button
            variant="contained"
            id="addToBagBtn"
            onClick={() => orderProduct()}
          >
            Add to Bag
          </Button>
          <Typography variant="h4" className="productData">
            <b>Free Shipping & Free 90 Day Returns</b>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
