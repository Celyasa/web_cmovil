import { Box, Grid } from "@mui/material";
import Home from "./home/home";

const Dashboard = () => {
  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Home />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Dashboard;
