import { Grid, Card, styled, Typography, Box, CardActions, Button } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isUserAdmin } from "../../application";
import { addToCart, rateProduct, removeFromCart, setSelectedProduct, useCartItems, useUserInfo } from "../../redux";
import { Rating } from "./Rating";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "../../App.css";

const StyledCardContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: "15px",
  color: "black",
}));
const StyledBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const ProductCard = ({ name, _id, image, price, category, brand, description, avarageRating }) => {
  const dispatch = useDispatch();
  const cartItems = useCartItems();
  const useInfo = useUserInfo();
  const isProductInCart = cartItems?.find((item) => item.product._id === _id);
  const navigate = useNavigate();
  const onEdit = () => {
    dispatch(
      setSelectedProduct({
        product: {
          name,
          _id,
          image,
          price,
          category,
          brand,
          description,
        },
      })
    );
    navigate(`/products/edit/${name}`);
  };
  const { pathname, search } = useLocation();

  const location = useLocation();

  const onRatingChange = (e) => {
    dispatch(
      rateProduct({
        productId: _id,
        userId: useInfo?._id,
        url: `${category}${search}`,
        Rating: e.target.value,
      })
    );
  };

  return (
    <Grid item className="CartI">
      <Card style={{ padding: "10px", borderRadius: "30px" }}>
        <Link
          to={`products/categories/${category}/${name}`}
          state={{ id: _id }}
          replace={true}
          style={{ textDecoration: "none" }}
        >
          <img src={image} alt={`${category} ${name}`} width="100%" />
          <StyledCardContent>
            <Typography>{name}</Typography>
            <Typography>Price : ${price}</Typography>
          </StyledCardContent>
        </Link>
        <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
          <Rating value={avarageRating} isDisabled={!useInfo} onChange={onRatingChange} />
          <StyledBox>
            {isProductInCart ? (
              <>
                <Button
                  onClick={() => {
                    dispatch(addToCart({ _id, price, name }));
                  }}
                >
                  +
                </Button>
                <Button
                  onClick={() => {
                    dispatch(removeFromCart(_id));
                  }}
                >
                  -
                </Button>
              </>
            ) : (
              <AiOutlineShoppingCart
                size={35}
                className="basket"
                onClick={() => {
                  dispatch(addToCart({ _id, price, name }));
                }}
              />
            )}
            {isUserAdmin(useInfo) && (
              <Button onClick={onEdit} className="buttonEdit">
                edit
              </Button>
            )}
          </StyledBox>
        </CardActions>
      </Card>
    </Grid>
  );
};
