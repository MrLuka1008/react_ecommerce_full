import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutUser, setSelectedProduct, useUserInfo } from "../../redux";
import { getUserInitials, isUserAdmin } from "../../application";
import { useDispatch } from "react-redux";
export const UserIcon = () => {
  const [anchor, setAnchor] = useState(null);
  const handleClose = () => {
    setAnchor(null);
  };
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box>
      <IconButton
        onClick={(e) => {
          setAnchor(e.currentTarget);
        }}
      >
        <Avatar>{getUserInitials(userInfo?.firstName, userInfo?.lastName)}</Avatar>
      </IconButton>
      <Box>
        <Menu
          anchorEl={anchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformorigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchor)}
          onClose={handleClose}
        >
          {!!userInfo && (
            <MenuItem>
              <Button onClick={() => dispatch(logoutUser())}>logout</Button>

              <Button>profile</Button>
            </MenuItem>
          )}
          {isUserAdmin(userInfo) && (
            <MenuItem>
              <Button
                onClick={() => {
                  dispatch(setSelectedProduct([]));
                  navigate("/products/new");
                }}
              >
                {" "}
                add product
              </Button>
            </MenuItem>
          )}
          {!userInfo && (
            <MenuItem>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/register");
                }}
              >
                register
              </Button>
            </MenuItem>
          )}
        </Menu>
      </Box>
    </Box>
  );
};
