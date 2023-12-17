import React, { useEffect, useState } from "react";
import './Sidebar.scss';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ToggleButton, ToggleButtonGroup } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import HistoryIcon from '@mui/icons-material/History';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import HomeIconOutlined from '@mui/icons-material/HomeOutlined';
import WhatshotIconOutlined from '@mui/icons-material/WhatshotOutlined';
import SubscriptionsIconOutlined from '@mui/icons-material/SubscriptionsOutlined';
import HistoryIconOutlined from '@mui/icons-material/HistoryOutlined';
import OndemandVideoIconOutlined from '@mui/icons-material/OndemandVideoOutlined';
import ThumbUpIconOutlined from '@mui/icons-material/ThumbUpOutlined';
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

function Sidebar(props) {
    const menuItem = [
        {
            path: "/",
            name: "Home",
            icon: HomeIcon,
        }, {
            path: `/trending`,
            name: "Trending",
            icon: WhatshotIcon 
        }, {
            path: "/subscription",
            name: "Subscription",
            icon: SubscriptionsIcon 
        }

    ]
    const menuItem2 = [

         {
            path: `/studio/mychannel`,
            name: "Your Videos",
            icon: OndemandVideoIcon  
        }, {
            path: "/likevideo",
            name: "Liked Videos",
            icon: ThumbUpIcon  
        }

    ]
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const location = useLocation();
    const [view, setView] = useState(location.pathname.slice(1, location.pathname.length) != null ? location.pathname.slice(1, location.pathname.length) : '/');

    const handleChange = (event, nextView) => {
        setView(nextView);
    };

    useEffect(() => {
        return (() => {
            console.log(location.pathname.slice(1, location.pathname.length))
        })
    })

    const drawer = (
        <div>
       <List  >
                    {menuItem.map((item, index) => (
                        <Link to={item.path} style={{ textDecoration: 'none', color: 'white'}}>
                            <ListItem disablePadding>

                                <ListItemButton sx={{ borderRadius: '15px', margin: "0 10px" }}>
                                    <ListItemIcon >
                                        <item.icon  Outlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />

                                </ListItemButton>

                            </ListItem>

                        </Link>

                    ))

                    }

                </List>
        <Divider />
        <List  >
                    {menuItem2.map((item, index) => (
                        <Link to={item.path} style={{ textDecoration: 'none', color: 'white'}}>
                            <ListItem disablePadding>

                                <ListItemButton sx={{ borderRadius: '15px', margin: "0 10px" }}>
                                    <ListItemIcon >
                                        <item.icon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />

                                </ListItemButton>

                            </ListItem>

                        </Link>

                    ))

                    }

                </List>
    </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        position: 'fixed',
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box', width: drawerWidth,
                        },

                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        position: 'fixed',
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box', width: drawerWidth,
                        },

                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    )
}

Sidebar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Sidebar;