import React from "react";
import './Sidebar.scss';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import HistoryIcon from '@mui/icons-material/History';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const drawerWidth = 240;

function Sidebar(props) {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <List>
                {['Home', 'Trending', 'Subscription'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton sx={{ borderRadius: '15px', margin: "0 10px" }}>
                            <ListItemIcon>
                                {index == 0 ? <HomeIcon /> : index == 1 ? <WhatshotIcon /> : <SubscriptionsIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['History', 'Your Videos', 'Liked Videos'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton sx={{ borderRadius: '15px', margin: "0 10px" }}>
                            <ListItemIcon>
                                {index == 0 ? <HistoryIcon /> : index == 1 ? <OndemandVideoIcon /> : <ThumbUpIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
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