import React from "react";
import { Box, styled } from "@mui/material";

const StyleCategories = styled(Box)(() => ({
  fontSize: "14px",
  color: "black",
  marginTop: "20px",
}));

export const SidebarHeader = () => {
  return <StyleCategories>Categories</StyleCategories>;
};
