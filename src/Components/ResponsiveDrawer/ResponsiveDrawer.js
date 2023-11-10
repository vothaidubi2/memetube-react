import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from '../Sidebar/Sidebar';
import './ResponsiveDrawer.scss'
import { useLocation } from 'react-router-dom';



function ResponsiveDrawer({ Showsidebar, Page, props }) {
  const location = useLocation();
  return (
    <div className="app_page">
      <Box sx={{
        display: 'flex', position: 'sticky',
        left: '0',
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        "&::-webkit-scrollbar": {
          width: "0.4em"
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: '5px'
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: '5px'
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}>
        <CssBaseline />
        {(!location.pathname.startsWith('/userchannel') &&!location.pathname.startsWith('/stream') &&!location.pathname.startsWith('/teststream')&&!location.pathname.startsWith('/admin/user')
         && !location.pathname.startsWith('/watch')) ? (
          <Showsidebar props={props} />
        ) : null}
            
           
        <Page />
      </Box >
    </div>
  );
}



export default ResponsiveDrawer;
