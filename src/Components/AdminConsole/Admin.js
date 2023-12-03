import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CRUDOperations from './Crud/CrudIndex'
import Corporate from './Corporate/Main'
import SessionDash from "./SessionsDash/SessionDash";


const drawerWidth = 200;

export default function ResponsiveDrawer(props) {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("CRUD");

  let component

  console.log(activeTab)
  switch (activeTab) {
    case "CORPORATE":
      component = <Corporate />
      break;
    case "CRUD":
      component = <CRUDOperations />
      break;
    case "SESSION":
      component = <SessionDash />
      break;
    default:
      break;
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ backgroundColor: activeTab === "CRUD" ? "#cfcfcf" : "" }}
            onClick={() => setActiveTab("CRUD")}
          >
            <InboxIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Crud Operations" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ backgroundColor: activeTab === "CORPORATE" ? "#cfcfcf" : "" }}
            onClick={() => setActiveTab("CORPORATE")}
          >
            <InboxIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Corporate" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ backgroundColor: activeTab === "SESSION" ? "#cfcfcf" : "" }}

            onClick={() => setActiveTab("SESSION")}
          >
            <InboxIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Sessions" />
          </ListItemButton>
        </ListItem>

      </List >
    </div >
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            // onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            // container={container}
            variant="temporary"
            open={mobileOpen}
            // onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

      </Box>
      <Box
        // component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {component}
      </Box>
    </Box>

  );
}

