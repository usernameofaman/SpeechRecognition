import React, { useEffect, useState } from "react";
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
import DataTable from "./dataTable";
import SetQuestions from "./SetQuestions/setQuestion";

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";
import { QuestionsService } from "../../services";
import ChiefComplaint from "./Models/ChiefComplaint";

const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [allQuestionsData, setAllQuestionsData] = useState([]);
  const [allLots, setAllLots] = useState([]);
  const [allDisorderData, setAllDisorderData] = useState([]);
  const [activeTab, setActiveTab] = useState("Questions"); // Initial active tab

  const fetchData = async () => {
    try {
      let response;
      switch (activeTab) {
        case "Questions":
          const allQuestionsDataRes =
            await QuestionsService.getAllQuestionsData();
          response = allQuestionsDataRes; // Assign the correct response variable
          break;
        case "LOTS":
          const allLotsRes = await QuestionsService.getAllLots();
          response = allLotsRes; // Assign the correct response variable
          break;
        case "Disorder":
          const allDisorderRes = await QuestionsService.getAllDisorderData();
          response = allDisorderRes; // Assign the correct response variable
          break;
        default:
          response = null;
      }

      if (response) {
        const data = await response;
        switch (activeTab) {
          case "Questions":
            setAllQuestionsData(data);
            ;
            break;
          case "LOTS":
            setAllLots(data); // Check if this function name is correct
            break;
          case "Disorder":
            setAllDisorderData(data);
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            variant={activeTab === "Questions" ? "contained" : "outlined"}
            onClick={() => setActiveTab("Questions")}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Questions" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            variant={activeTab === "LOTS" ? "contained" : "outlined"}
            onClick={() => setActiveTab("LOTS")}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="LOTS" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            variant={activeTab === "Disorder" ? "contained" : "outlined"}
            onClick={() => setActiveTab("Disorder")}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Disorder" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            variant={activeTab === "SetQuestions" ? "contained" : "outlined"}
            onClick={() => setActiveTab("SetQuestions")}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="SetQuestions" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            variant={activeTab === "Chief Complaint" ? "contained" : "outlined"}
            onClick={() => setActiveTab("Chief Complaint")}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Chief Complaint" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
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
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {activeTab === "SetQuestions" ? (
          <>
            <SetQuestions />
          </>
        ) : activeTab === "Chief Complaint" ?
          <ChiefComplaint />
          : (
            <DataTable
              activeTab={activeTab}
              allQuestionsData={allQuestionsData}
              allLots={allLots}
              allDisorderData={allDisorderData}
            />
          )}



        {/* <DataGrid
       activeTab={activeTab}
       allQuestionsData={allQuestionsData}
       allLots={allLots}
       allDisorderData={allDisorderData}/> */}
      </Box>
    </Box>

  );
}

