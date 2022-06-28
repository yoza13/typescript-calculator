import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Collapse,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  Switch,
} from "@mui/material";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { func } from "prop-types";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AppContext from "../ApplicationContext";
import Yash from "../Yash.jpg";
import { useStyles } from "../useStyles";
import ScrollTop from "./ScrollTop";

export default function ButtonAppBar() {
  const { isDarkTheme, setIsDarkTheme } = useContext(AppContext);
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const leftNavItems = [
    {
      title: "Home",
      page: "/home",
    },
    {
      title: "About Me",
      page: "/about-me",
    },
    {
      title: "Experience",
      page: "/experience",
    },
    {
      title: "Projects",
      list: [
        {
          title: "Weather App",
          page: "/projects/weather-app",
        },
        {
          title: "Calculator",
          page: "/projects/calculator",
        },
        {
          title: "To Do",
          page: "/projects/todo",
        },
        {
          title: "Mine-Sweeper (Single Player Game)",
          page: "/projects/mine-sweeper",
        },
      ],
    },
    {
      title: "Contact Me",
      page: "/contact-me",
    },
  ];
  const drawer = () => {
    return (
      <Box onClick={() => setOpenDrawer(false)}>
        <List>
          {leftNavItems.map((item, index) => (
            <>
              {!item.list ? (
                <ListItem
                  component={RouterLink}
                  to={item.page}
                  className={classes.drawerListItem}
                >
                  <ListItemButton
                    key={item + index}
                    disablePadding
                    onClick={() => {
                      navigate(item.page);
                    }}
                  >
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ) : (
                <>
                  <ListItemButton key={item + index} disablePadding>
                    <ListItemText primary={item.title} sx={{ pl: "16px" }} />
                  </ListItemButton>
                  <Collapse in={true} timeout="auto" unmountOnExit>
                    <List component="ul" className={classes.listStyleDisc}>
                      {item?.list.map((projects, index) => {
                        return (
                          <ListItem
                            key={index + projects.page}
                            component={RouterLink}
                            to={projects.page}
                            className={classes.drawerListItem}
                          >
                            <ListItemButton
                              sx={{ pl: 4 }}
                              onClick={() => {
                                navigate(projects.page);
                              }}
                            >
                              <ListItemText primary={projects.title} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              )}
            </>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          &nbsp;&nbsp;&nbsp;
          <IconButton onClick={() => navigate("/home")}>
            <Avatar alt="Yash Oza" src={Yash} />
          </IconButton>
          &nbsp; &nbsp; &nbsp;
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Yash Oza
          </Typography>
          <>
            <Switch
              onChange={() => setIsDarkTheme(!isDarkTheme)}
              checked={isDarkTheme}
            />
            <NightlightOutlinedIcon />
          </>
          <SwipeableDrawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            onOpen={() => setOpenDrawer(true)}
            PaperProps={{
              sx: {
                width: "300px",
              },
            }}
          >
            {drawer()}
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
}

ButtonAppBar.propTypes = {
  handleDrawerToggle: func,
};
