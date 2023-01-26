import React, { useState } from "react";
import { AppBar, Badge, Box, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import SearchBar from "./SearchBar";
import { UserIcon } from "./UserIcon";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCartItems } from "../../redux";
import { CartDrawer } from "./CartDrawer";
import { AiFillHome } from "react-icons/ai";

// const StyledAppBar = styled(AppBar)(() => ({
//   background: "#fff",
//   color: "#103B66",
//   width: "88%",
//   width: "calc(100% - 255px)",
//   padding: "0 100px 0 30px",
//   display: "flex",
// }));

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
      <AppBar className="styleappbar">
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
