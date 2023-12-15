import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuItems from "./data";
import React from "react";

const Sidebar = () => {
  // const [open, setOpen] = React.useState(true);
  const SidebarContent = (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Typography variant="h6" sx={{ color: "secondary.main" }}>
          Cmovil Web
        </Typography> */}
        <Typography>Cmovil Web</Typography>
      </Box>

      <Box>
        <List sx={{ mt: 1 }}>
          {MenuItems.map((item, index) => {
            return (
              <List component="li" disablePadding key={item.title}>
                <ListItem component={NavLink} to={item.href}>
                  <ListItemIcon>
                    <item.icon width="20" height="20" />
                  </ListItemIcon>
                  <ListItemText>{item.title}</ListItemText>
                </ListItem>
              </List>
            );
          })}
        </List>
      </Box>
    </Box>
  );
  return (
    <Drawer
      anchor="left"
      // open={props.isSidebarOpen}
      variant="permanent"
      PaperProps={{ sx: { width: 220 } }}
    >
      {SidebarContent}
    </Drawer>
  );
};
// const Sidebar = () => {
//   return (
//     <Drawer variant="permanent">
//       <List>
//         <ListItem button component={Link} to="/home/item1">
//           <ListItemText primary="Item 1" />
//         </ListItem>
//         <ListItem button component={Link} to="/home/item2">
//           <ListItemText primary="Item 2" />
//         </ListItem>
//         <ListItem button component={Link} to="/home/item3">
//           <ListItemText primary="Item 3" />
//         </ListItem>
//       </List>
//       <Divider />
//     </Drawer>
//   );
// };

export default Sidebar;
