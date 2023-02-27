import { AccountCircle, DarkMode, LightMode } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  Tab,
  Tabs,
  Container,
} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../../lib/auth";
import { useColorMode } from "../../../ThemeWraper";

export default function TeacherDashboard() {
  const { authenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authenticated()) navigate("/login");
  });
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  const [selectedTab, setSelectedTab] = useState("students");
  const sideWidths = 300;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <TabContext value={selectedTab}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <AppBar
          sx={{
            display: "flex",
            flexDirection: "row",
            bgcolor: "background.paper",
            alignItems: "center",
            px: 3,
          }}
        >
          <Box sx={{ width: sideWidths }}>
            <Typography variant="h6" whiteSpace="nowrap" color="text.secondary">
              Teacher dashboard
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Tabs
              value={selectedTab}
              onChange={(_, newValue) => setSelectedTab(newValue)}
              centered
            >
              <Tab label="Students" value="students" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </Tabs>
          </Box>
          <Box
            sx={{
              width: sideWidths,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <IconButton onClick={() => toggleColorMode()}>
              {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>
            <IconButton onClick={handleMenu} size="large">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </Box>
        </AppBar>
      <Box sx={{ flexGrow: 1, pt: 10 }} >
          <Outlet/>
        </Box>
      </Box>
    </TabContext>
  );
}
