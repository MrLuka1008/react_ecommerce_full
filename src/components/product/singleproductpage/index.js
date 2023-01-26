import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addToCart,
  fetchHomePageProducts,
  fetchSingleProductById,
  useCartItems,
  useSingleProduct,
} from "../../../redux";
import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import "../../../App.css";

const StyleBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  margin: "auto",
}));

const StyleTypography = styled(Typography)(() => ({
  fontSize: "25px",
  marginBottom: "20px",
}));
const StyleButton = styled(Button)(() => ({
  fontSize: "20px",
  marginBottom: "20px",
  backgroundColor: "blue",
  color: "white",
  padding: "2px 80px",
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: "red",
  },
}));
export const DetailedProduct = () => {
  const navigate = useNavigate();
  const cartItems = useCartItems();

  const { state } = useLocation();
  const { categoryName } = useParams;

  const dispatch = useDispatch();
  const singleProduct = useSingleProduct();

  useEffect(() => {
    dispatch(fetchSingleProductById({ id: state.id, category: categoryName }));
  }, [state.id]);

  return (
    <Box className="Si8ngleProductPage">
      <img className="SingleProductImg" src={singleProduct?.image} />
      <Box className="detailInfo">
        <StyleTypography> Name : {singleProduct?.name} </StyleTypography>
        <StyleTypography> Price : $ {singleProduct?.price} </StyleTypography>
        <StyleTypography> description : {singleProduct?.description} </StyleTypography>
        <StyleTypography> Brand : {singleProduct?.brand} </StyleTypography>

        <StyleButton onClick={() => navigate("/")}> Go Home Page</StyleButton>
      </Box>
    </Box>
  );
};
