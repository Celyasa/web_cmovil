import { Box, Grid } from "@mui/material";
import Home from "./home/home";

// const MainWrapper = experimentalStyled("div")(({ theme }) => ({
//   display: "flex",
//   minHeight: "100vh",
//   overflow: "hidden",
//   width: "100%",
// }));

// const Dashboard = () => {
//   return (
//     <MainWrapper>
//       <Header />
//       <Sidebar />
//       <Container maxWidth={false}>
//         <Box>
//           <Outlet />
//         </Box>
//       </Container>
//     </MainWrapper>
//   );
// };
// export default Dashboard;

const Dashboard = () => {
  // return (
  //   <Box>
  //     <Grid container spacing={0}>
  //       <Grid item xs={12} lg={8}>
  //         <Home />
  //       </Grid>
  //     </Grid>
  //   </Box>
  // );

  return (
    <Box>
      {/* <Grid container spacing={0}>
        <Grid
          item
          xs={10}
          lg={8}
          // lg={4}
          sm={6}
          // sx={{ display: "flex", alignItems: "stretch" }}
        >
          <Home />
        </Grid>
      </Grid> */}
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Home />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Dashboard;
