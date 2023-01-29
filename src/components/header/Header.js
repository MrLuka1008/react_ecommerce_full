import React, { useState } from "react";
import { AppBar, Badge, Box, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import SearchBar from "./SearchBar";
import { UserIcon } from "./UserIcon";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCartItems } from "../../redux";
import { CartDrawer } from "./CartDrawer";

const StyledToolBar = styled(Toolbar)(() => ({
  display: "flex",
  justifyContent: "space-around",
}));

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    width: "20px",
    height: "21px",
    color: "#fff",
    backgroundColor: "red",
    top: "2px",
    right: "-3px",
  },
}));
const StyledHomeLink = styled(Link)(() => ({
  color: "black",
  fontSize: "30px",
  display: "flex",
}));

export const Header = () => {
  const cartItem = useCartItems();
  const cartItemsQuantity = cartItem.reduce((acc, curr) => acc + curr.quantity, 0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <Box>
      <AppBar className="barStled">
        <StyledToolBar>
          <StyledHomeLink to="/">
            {" "}
            <Typography variant="solid" color="primary">
              El.
            </Typography>
            Mart
          </StyledHomeLink>
          <SearchBar />
          <Box style={{ display: "flex" }}>
            <Button onClick={() => setIsCartOpen(true)}>
              <StyledBadge badgeContent={cartItemsQuantity}>
                <AiOutlineShoppingCart size={30} />
              </StyledBadge>
            </Button>
            <UserIcon />
          </Box>

          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => {
              setIsCartOpen(false);
            }}
          />
        </StyledToolBar>
      </AppBar>
    </Box>
  );
};
