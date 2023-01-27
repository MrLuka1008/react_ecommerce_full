import { Drawer, List, Box, styled, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { UseCategories } from "../../redux";
import { SidebarHeader } from "./SidebarHeader";

const StyledListItem = styled(ListItem)(() => ({
  color: "black",
}));

const StyledListItemText = styled(ListItemText)(() => ({
  borderBottom: "1px solid black",
  textAlign: "center",
}));

export const Sidebar = () => {
  const sideBarItems = UseCategories();

  return (
    <Drawer variant="permanent" open={true}>
      <SidebarHeader />

      <List>
        {sideBarItems.map((sidebarItem) => {
          const { _id, name } = sidebarItem;

          return (
            <React.Fragment key={_id}>
              <Link to={`/products/categories/${name}?page=1&sort=name,asc`}>
                <Box
                  sx={{
                    width: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
                    padding: "5px",
                  }}
                >
                  <StyledListItem>
                    <StyledListItemText primary={name}></StyledListItemText>
                  </StyledListItem>
                </Box>
              </Link>
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};
