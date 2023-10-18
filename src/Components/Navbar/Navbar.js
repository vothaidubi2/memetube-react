import React from "react";
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
import { Height } from "@mui/icons-material";
const drawerWidth = 240;


function Sidebar(props) {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const menuItem=[
      {
      path:"/studio/home",
      name:"Overview page",
      icon:ViewQuiltIcon
    },  {
      path:"/studio/content",
      name:"Content",
      icon:FileCopyIcon
    },  {
      path:"/studio/data",
      name:"Analytical data",
      icon:InsertChartIcon
    },  {
      path:"/studio/comment",
      name:"Comment",
      icon:ForumOutlinedIcon
    }
  
  ]
    const drawer = (
      
        <div >
                     <div className="top_section">
<Link to='https://google.com'>    
    <img  className="avatarchanel" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWd96a9UE3aFBK97Vts75h_57qGKuUXK7MNWjloWH3-uQdwJfI0fKOVZPb-w9W6NKS-Xg&usqp=CAU" alt="" /></Link>
  
            <div className="title">Your Channer</div>
            <div className="namechanel">Your Channer</div>
          </div>
            <List  >
                {menuItem.map((item, index) => (
                   <Link to={item.path} className="titlenavbar">
                    <ListItem  disablePadding>

                        <ListItemButton sx={{ borderRadius: '15px', margin: "0 10px" }}>   
                            <ListItemIcon style={{color:'rgb(151,151,151)'}}>
                              <item.icon/>
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                            
                        </ListItemButton>
                     
                    </ListItem>
                
                    </Link>
                    
                ))
                
                }

            </List>
      
            {/* <ListItemButton style={{ borderRadius: '15px', margin: "70%  10px 0 10px "}}>   
          <Link to={''} className="titlenavbar">
                    <ListItem  disablePadding>


                            <ListItemIcon style={{color:'rgb(151,151,151)'}}>
                             sdfsd
                            </ListItemIcon>
                            <ListItemText  />
                    
                     
                    </ListItem>
                
                    </Link>
                          
                            
                        </ListItemButton> */}
           
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
