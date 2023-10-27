import React, { useContext, useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Form, Link, useNavigate } from "react-router-dom";
import SignIn from "../Form/SignIn";
import { Avatar } from "@mui/material";
import { UserContext } from "../Cookie/UserContext";
import removeCookie from "../Cookie/removeCookie";
import getCookie from "../Cookie/getCookie";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        },
    },
}));
let boolean = false;
export default function Header() {
    let tempdataUser = useContext(UserContext);
    console.log(getCookie("user"));
    const [AvatarUser, setAvatarUser] = useState(null);
    const [dataUser, setDataUser] = useState(null);
    useEffect(() => {
        if (tempdataUser !== null && boolean === false) {
            setDataUser(tempdataUser);
            setAvatarUser(tempdataUser.Avatar);
            boolean = true;
        }
    }, [tempdataUser]);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const [openSignIn, setOpenSignIn] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const signin = () => {
        if (openSignIn === true) {
            return <SignIn onClose={handleCloseSignIn} isOpen={openSignIn} />;
        } else {
            return null;
        }
    };
    const handleOpenSignIn = () => {
        setOpenSignIn(true);
    };

    const handleCloseSignIn = () => {
        setOpenSignIn(false);
        window.location.reload();
    };
    const handleLogout = () => {
        removeCookie("user");
        setAvatarUser(null);
        setDataUser(null);
        return <>{handleMenuClose()}</>;
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
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {dataUser != null ? (
                <>
                    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Studio</MenuItem>
                    <MenuItem onClick={handleLogout}>Log out</MenuItem>
                </>
            ) : (
                <MenuItem onClick={handleOpenSignIn}>Signin/signup</MenuItem>
            )}
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleOpenSignIn}>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    //search input
    const [inputSearch, setInputSearch] = React.useState("");

    return (
        <Box
            sx={{
                flexGrow: 1,
                position: "fixed",
                zIndex: "1000",
                top: "0",
                width: "100%",
            }}
        >
            <AppBar position="relative">
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0 10px",
                    }}
                >
                    <Box sx={{ display: "flex", flex: "1" }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <Link
                                to={"/"}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "white",
                                    textDecoration: "none",
                                }}
                            >
                                <YouTubeIcon
                                    className="logo-icon"
                                    sx={{ fontSize: "40px", color: "red" }}
                                />
                                <h3 className="logo-content">MemeTube</h3>
                            </Link>
                        </Typography>
                    </Box>
                    <Box sx={{ flex: '2' }}>
                        <Search sx={{ borderRadius: '20px' }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <Form action={`/search?search=${inputSearch}`} style={{ width: '100%' }}>
                                <StyledInputBase sx={{ width: '100%' }}
                                    name='search'
                                    autoComplete="off"
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={e => {
                                        setInputSearch(e.target.value);
                                    }}
                                />
                            </Form>
                        </Search>
                    </Box>
                    <Box sx={{ display: "flex", flex: "1", justifyItems: "end" }}>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <IconButton
                                size="large"
                                aria-label="show 4 new mails"
                                color="inherit"
                            >
                                <Badge badgeContent={4} color="error">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                {AvatarUser == undefined ? (
                                    <AccountCircle />
                                ) : (
                                    <Avatar alt="Remy Sharp" src={AvatarUser} />
                                )}
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            {signin()}
        </Box>
    );
}
