import styled from "@emotion/styled";
import { Drawer, Box, Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { clearCart, useCartItems, useUserInfo, saveCart } from "../../redux";
import { Typography } from "../shared";
import { AiOutlineShoppingCart } from "react-icons/ai";

const StyledBox = styled(Box)(() => ({
  padding: "20px",
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "2px solid green",
  marginBottom: "15px",
  color: "black",
}));
const StyledTotalBox = styled(Box)(() => ({
  padding: "8px",
  borderBottom: "2px solid black",
  fontWeight: "700",
  fontSize: "20px",
}));
const StyledButton = styled(Button)(() => ({
  backgroundColor: "green",
  marginTop: "10px",
  color: "white",
  "&:hover": {
    background: "green",
    padding: "10px",
  },
}));
const StyledEmpyBasketBox = styled(Box)(() => ({
  display: "flex",
  fontSize: "20px",
}));

export const CartDrawer = ({ isOpen, onClose }) => {
  const cartItems = useCartItems();
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const Total = () => {
    return cartItems?.reduce((acc, curr) => {
      const total = curr.product.price * curr.quantity;

      return acc + total;
    }, 0);
  };

  const isProductInCart = cartItems.length;

  return (
    <Drawer open={isOpen} onClose={onClose} anchor="right">
      {cartItems.map((item) => {
        const { product, quantity } = item;
        const { price, name, _id } = product;
        const total = price * quantity;
        return (
          <StyledBox key={_id}>
            <Typography>{name}</Typography>
            <Typography>{quantity}</Typography>
            <Typography>{total}</Typography>
          </StyledBox>
        );
      })}

      {isProductInCart > 0 && (
        <StyledTotalBox>
          {" "}
          Total <Total />
        </StyledTotalBox>
      )}

      {isProductInCart > 0 ? (
        <>
          {" "}
          <StyledButton
            onClick={() => {
              dispatch(clearCart());
              dispatch(saveCart({ userId: userInfo._id, cartItems: [] }));
            }}
          >
            clear Cart
          </StyledButton>
          {userInfo && (
            <StyledButton
              onClick={() => {
                dispatch(saveCart({ userId: userInfo._id, cartItems }));
              }}
            >
              save cart
            </StyledButton>
          )}
        </>
      ) : (
        <StyledEmpyBasketBox>
          <AiOutlineShoppingCart size={20} color="green" /> Basket`s empty
        </StyledEmpyBasketBox>
      )}
    </Drawer>
  );
};
