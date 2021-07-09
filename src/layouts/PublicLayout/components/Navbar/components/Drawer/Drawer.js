import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import MailIcon from "@material-ui/icons/Mail";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Avatar, CustomDropDown, DynamicListItems } from "../../components";
import HistoryIcon from "@material-ui/icons/History";
import Button from "@material-ui/core/Button";
import { Text } from "../../../../../../components";
import { connect } from "react-redux";
import { drawerState } from "../../../../../../store/actions";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    overflow: "!important hidden",
    flexShrink: 0,
    whiteSpace: "nowrap",
    overflowY: "overlay",
    "&::-webkit-scrollbar": {
      display: "none !important",
    },
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
    },
  },
  drawerOpen: {
    width: drawerWidth,
    overflowY: "overlay",
    "&::-webkit-scrollbar": {
      display: "none !important",
    },
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#f5f5f5",
    fontSize: "12px",
    "&:hover": {
      backgroundColor: "#eeeeee",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    fontWeight: "bold",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    fontSize: "12px",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  nested: {
    paddingTop: theme.spacing(0),
    paddingLeft: theme.spacing(4),
  },
}));

const MiniDrawer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [listData, setListData] = React.useState([
    {
      id: "dashboard",
      itemname: "dashboard",
      hasdropdown: false,
      isexpanded: false,
      subitemlist: [],
      route: '/',
      itemicon: '<svg class="w-4 h-4 text-purple-800 text-bold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>'
    },
    {
      id: "manageoffers",
      itemname: "offers",
      hasdropdown: true,
      isexpanded: false,
      route: false,
      subitemlist: [
        {
          'item': 'Add Offers',
          'route': '/add-offers'
        },
        {
          'item': 'View Offers',
          'route': '/view-offers'
        },
      ],
      itemicon: '<svg class="w-4 h-4 text-purple-800 text-bold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>'
    },
    {
      id: "manageannouncements",
      itemname: "announcements",
      hasdropdown: true,
      isexpanded: false,
      route: false,
      subitemlist: [
        {
          'item': 'Add Announcements',
          'route': '/add-announcements'
        },
        {
          'item': 'View announcements',
          'route': '/view-announcements'
        },
      ],
      itemicon: '<svg class="w-4 h-4 text-purple-800 text-bold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>'
    },
    {
      id: "managetips",
      itemname: "tips",
      hasdropdown: true,
      isexpanded: false,
      route: false,
      subitemlist: [
        {
          'item': 'Add Tips',
          'route': '/add-tips'
        },
        {
          'item': 'View Tips',
          'route': '/view-tips'
        },
      ],
      itemicon: '<svg class="w-4 h-4 text-purple-800 text-bold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>'
    },
    {
      id: "managenotification",
      itemname: "notification",
      hasdropdown: true,
      isexpanded: false,
      route: false,
      subitemlist: [
        {
          'item': 'Add Notification',
          'route': '/add-notification'
        },
        {
          'item': 'View Notification',
          'route': '/view-notification'
        },
      ],
      itemicon: '<svg class="w-4 h-4 text-purple-800 text-bold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>'
    },
    {
      id: "logout",
      itemname: "logout",
      hasdropdown: false,
      isexpanded: false,
      subitemlist: [],
      route: '/logout',
      itemicon: '<svg class="w-4 h-4 text-purple-800 text-bold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>'
    },
  ]);

  React.useEffect(() => {
    getCurrentDate();
  });

  const getCurrentDate = () => {
    var today = new Date();
    var day = today.getDay();
    var daylist = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday ",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();
    var prepand = hour >= 12 ? " PM " : " AM ";
    hour = hour >= 12 ? hour - 12 : hour;
    if (hour === 0 && prepand === " PM ") {
      if (minute === 0 && second === 0) {
        hour = 12;
        prepand = " Noon";
      } else {
        hour = 12;
        prepand = " PM";
      }
    }
    if (hour === 0 && prepand === " AM ") {
      if (minute === 0 && second === 0) {
        hour = 12;
        prepand = " Midnight";
      } else {
        hour = 12;
        prepand = " AM";
      }
    }
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const d = new Date();
    return (
      hour +
      ":" +
      minute +
      prepand +
      " at " +
      new Date().getDate() +
      "th " +
      monthNames[d.getMonth()] +
      " " +
      new Date().getFullYear()
    );
  };
  const handleDrawerOpen = () => {
    setOpen(true);
    props.drawerState(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    props.drawerState(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.grow}>
        <AppBar
          position="fixed"
          color={"inherit"}
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <div className="flex flex-row justify-between sm:space-x-8">
              {open ? (
                ""
              ) : (
                <img
                  src="./img/brandlogo.PNG"
                  className="hidden sm:block object-contain object-fit w-12 h-12 py-2 -mx-3"
                />
              )}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <div className="flex flex-col ml-4">
              <Typography className={classes.title} variant="h6" noWrap>
                <Text variant="infoDark" weight="700">
                  Offers Panel
                </Text>
              </Typography>
              <small
                className={clsx(
                  classes.title,
                  "text-xs font-medium text-gray-400"
                )}
              >
                {getCurrentDate()}
              </small>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <div className="flex flex-row justify-between items-center">
                <Avatar />
                <CustomDropDown />
              </div>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx("hide-vertical-scroll", {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <div className="pl-4">
            <img
              src="http://adsrevenue.co/img/final-logo.png"
              className="mx-auto object-contain object-fit w-40 h-8"
            />
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List className="bg-blue-50">
          <ListItem className="bg-green-50">
            {open ? (
              <div className="w-full">
                <div className="h-full flex flex-row justify-start items-center rounded-lg">
                  <Avatar />
                  <div className="flex-grow">
                    <div className="flex flex-row justify-start items-center">
                      <h2 className="text-blue-800 title-font font-bold">
                        Clerk Kent
                      </h2>
                      <img
                        src="/img/checkmark.png"
                        className="ml-1 object-contain object-cover w-4 h-4"
                      />
                    </div>
                    <p className="text-gray-600 font-medium text-xs">
                      clerkkent@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="-mx-4 sm:-mx-2 p-0">
                <Avatar />
              </div>
            )}
          </ListItem>
        </List>
        {open ? (
          <h4 className="text-gray-600 font-bold ml-3 pt-2">Navigation</h4>
        ) : (
          ""
        )}
        <List id="drawer-item-container">
          <DynamicListItems itemsData={listData} open={open} />
        </List>
      </Drawer>
    </div>
  );
};

export default connect(null, { drawerState })(MiniDrawer);
