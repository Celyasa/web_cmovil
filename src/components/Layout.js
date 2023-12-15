import { Outlet } from "react-router";
import Header from "./layouts/header/Header";
import Sidebar from "./layouts/Sidebar/Sidebar";
import { Box, Container, experimentalStyled } from "@mui/material";

// const Layout = () => {
//   return (
//     <main className="App">
//       <Outlet />
//       {/* <Footer/> */}
//     </main>
//   );
// };

// export default Layout;
const MainWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
  // [theme.breakpoints.up("lg")]: {
  //   paddingTop: 70,
  // },
  [theme.breakpoints.down("lg")]: { paddingTop: "60px" },
}));

const Layout = () => {
  return (
    <MainWrapper>
      <Header />
      <Sidebar />
      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{ paddingTop: "50px", paddingLeft: "210px!important" }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            <Outlet />
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};
export default Layout;
