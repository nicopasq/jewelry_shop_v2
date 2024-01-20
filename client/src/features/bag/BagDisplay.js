import {
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function BagDisplay() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const products = useSelector((state) => state.products.value);
  const currentUser = useSelector((state) => state.currentUser.user);
  const inBag = [];
  currentUser.order_products
    .filter((p) => p.in_cart === true)
    .map((orderProduct) => {
      return products?.map((p) => {
        if (p.id === orderProduct.product_id) {
          return inBag.push({ ...orderProduct, image: p.image });
        }
        return null;
      });
    });


  function handleDelete(product) {
    fetch(`/order_products/${product.id}`, { method: "DELETE" });
    const updatedOrderProducts = [...currentUser.order_products].filter(
      (p) => p.id !== product.id
    );
    const updatedUser = {
      ...currentUser,
      order_products: updatedOrderProducts,
    };
    dispatch({ type: "currentUser/update", payload: updatedUser });
  }

  function handleUpdate(product){
    fetch(`/order_products/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((r) => r.json())
      .then((data) => {
        const updatedOrderProducts = [...currentUser.order_products].map((p) =>
          p.id === data.id ? data : p
        );
        const updatedUser = {
          ...currentUser,
          order_products: updatedOrderProducts,
        };
        dispatch({ type: "currentUser/update", payload: updatedUser });
      });
  }

  function updateQuantity(type, product) {
    if (type === "decrement" && product.quantity > 1) {
      product.quantity--;
      handleUpdate(product)
    } else if (type === "decrement" && product.quantity === 1){
      handleDelete(product)
    }
    else if (type === "increment") {
      product.quantity++;
      handleUpdate(product)
    }
  }

  const bagDisplay = inBag.map((product) => {
    const productObj = product.product;
    return (
      <Card key={product.id} className="productCardBag">
        <img src={product.image} alt={productObj.product_name} />
        <CardContent className="cardContent">
          <Typography variant="h6">{productObj.product_name}</Typography>
          <Divider sx={{ bgcolor: "lightgrey" }} />
          <Typography variant="h6">${productObj.price}</Typography>
          <Divider sx={{ bgcolor: "lightgrey" }} />
          <Typography variant="h6">
            Quantity:
            <Button
              className="incrementQty"
              sx={{ fontSize: "16pt" }}
              onClick={() => updateQuantity("decrement", product)}
            >
              {" "}
              -{" "}
            </Button>
            {product.quantity}
            <Button
              className="incrementQty"
              sx={{ fontSize: "13pt" }}
              onClick={() => updateQuantity("increment", product)}
            >
              {" "}
              +{" "}
            </Button>
          </Typography>
          <Typography
            variant="h6"
            sx={() => {
              if (productObj.product_type === "ring") {
                return { display: "block" };
              } else {
                return { display: "none" };
              }
            }}
          >
            Size: {product.size?.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    );
  });

  const nothingInBag = (
    <Button variant="text" onClick={() => {
      dispatch({type:'jewelryType/resetFilter'})
      navigate('/shop')
      }}>
        Continue shopping
    </Button>
  );

  const render = bagDisplay.length > 0 ? bagDisplay : nothingInBag;
  return <div id="bagContainer">{render}</div>;
}

export default BagDisplay;
