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

const detailInfoSingle = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "5px 24px",
  marginLeft: "20px",
}));

const StyleTypography = styled(Typography)(() => ({
  fontSize: "25px",
  marginBottom: "20px",
  color: "black",
}));

const StyleButton = styled(Button)(() => ({
  fontSize: "14px",
  marginBottom: "10px",
  backgroundColor: "black",
  color: "white",
  borderRadius: "10px",
  "&:hover": {
    color: "black",
    boxShadow: "1px 1px 20px 6px black",
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
    <Box className="singlePageStyle">
      <img className="singlePageStyleImg" src={singleProduct?.image} />
      <detailInfoSingle className="detailInfo">
        <StyleTypography> Name : {singleProduct?.name} </StyleTypography>
        <StyleTypography> Price : $ {singleProduct?.price} </StyleTypography>
        <StyleTypography> description : {singleProduct?.description} </StyleTypography>
        <StyleTypography> Brand : {singleProduct?.brand} </StyleTypography>

        <StyleButton onClick={() => navigate("/")}> Go Home Page</StyleButton>
      </detailInfoSingle>
    </Box>
  );
};
