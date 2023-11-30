import React, { useContext, useEffect, useState } from "react";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import '../../Components/Sidebar/Sidebar.scss';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, colors } from "@mui/material";
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Link } from 'react-router-dom';
import './Navbar.css';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { UserContext } from "../Cookie/UserContext";
import ChannelAPI from "../../utils/ChannelAPI";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
const drawerWidth = 240;


function Sidebar(props) {
    const dataUser = useContext(UserContext)
    const [currentChannel, setCurrentChannel] = useState();
    useEffect(() => {
        const fetchDataChannel = async () => {
            const data = await ChannelAPI.getOneItem(`/findchannelbyiduser?iduser=${dataUser.Iduser}`)
            setCurrentChannel(data)
        }
        if(dataUser){
            fetchDataChannel()
        }
    }, [dataUser])
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItem = [
        {
            path: "/admin/user",
            name: "User Manage",
            icon: AccountCircleIcon
        }, {
            path: `/admin/category`,
            name: "Category Manage",
            icon: CategoryIcon
        }, {
            path: "/admin/video",
            name: "Video Manage",
            icon: VideoSettingsIcon
        },
        //  {
        //     path: "/admin/comment",
        //     name: "Comment Manage",
        //     icon: MarkChatReadIcon
        // }

    ]
    const drawer = (
        (currentChannel && (
            <div >
                <div className="top_section">
                    <Link to='https://google.com'>
                        <img className="avatarchanel" src={currentChannel.users.avatar} alt="" /></Link>

                    <div className="title">{currentChannel.channelname}</div>
                    <div className="namechanel">{currentChannel.users.email}</div>
                </div>
                {dataUser &&(
                    <List  >
                    {menuItem.map((item, index) => (
                        <Link to={item.path} className="titlenavbar">
                            <ListItem disablePadding>

                                <ListItemButton sx={{ borderRadius: '15px', margin: "0 10px" }}>
                                    <ListItemIcon style={{ color: 'rgb(151,151,151)' }}>
                                        <item.icon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />

                                </ListItemButton>

                            </ListItem>

                        </Link>

                    ))

                    }

                </List>
                )}

            </div>
        ))
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
