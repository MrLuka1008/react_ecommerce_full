import "./App.css";
import { Header } from "./components/header";
import { RoutesComponent } from "./Routes";
import { styled, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCart, fetchHomePageProducts, useUserInfo } from "./redux";
import { Sidebar } from "./components/sidebar/Sidebar";

const StyledContentContainer = styled(Box)(() => ({
  padding: "20px",
  marginLeft: "255px",
  marginTop: "90px",
  minHeight: "90vh",
}));
function App() {
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHomePageProducts());
    if (userInfo) {
      dispatch(fetchCart(userInfo._id));
    }
  }, []);
  return (
    <Box>
      <Sidebar />
      <Header />
      <StyledContentContainer className="contnrs">
        <RoutesComponent />
      </StyledContentContainer>
    </Box>
  );
}

//test
//test
//test

export default App;
