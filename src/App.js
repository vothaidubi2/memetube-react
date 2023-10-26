import './App.css';

import ResponsiveDrawer from './Components/ResponsiveDrawer/ResponsiveDrawer';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import RecommendVideos from './Components/RecommendVideos/RecommendVideos';
import SearchPage from './Components/Search/SearchPage';
import Sidebar from './Components/Sidebar/Sidebar';
import VideoDetail from './Components/VideoDetail/VideoDetail';
import UserChannel from './Components/Navbar/Navbar';
import Homepage from './Components/PagesChannel/Homepage';
import Content from './Components/PagesChannel/Content';
import Comment from './Components/PagesChannel/Comment';
import DataDetails from './Components/PagesChannel/DataDetails';
import MyChannel from './Components/PagesChannel/MyChannel';
import SignIn from './Components/Form/SignIn';
import SignUp from './Components/Form/SignUp';
import Stream from './Components/Stream/Stream';
import { UserContext } from './Components/Cookie/UserContext';
import jwt_decode from "jwt-decode";
import getCookie from './Components/Cookie/getCookie';
import { useState ,useEffect} from 'react';
// import Homepage from './Components/pageChannel/Homepage';
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <ResponsiveDrawer Showsidebar={Sidebar} Page={RecommendVideos} />
      },
      {
        path: '/search',
        element: <ResponsiveDrawer Showsidebar={Sidebar} Page={SearchPage} />
      },
      {
        path: '/watch',
        element: <ResponsiveDrawer Page={VideoDetail} />
      }
      ,{
        path: '/studio/home',
        element: <ResponsiveDrawer Showsidebar={UserChannel} Page={Homepage} />
      },{
        path: '/studio/content',
        element: <ResponsiveDrawer Showsidebar={UserChannel} Page={Content} />
      },{
        path: '/studio/data',
        element: <ResponsiveDrawer Showsidebar={UserChannel} Page={DataDetails} />
      },
      {
        path: '/studio/comment',
        element: <ResponsiveDrawer Showsidebar={UserChannel} Page={Comment} />
      }
      ,
      
      {
        path: '/channel/home',
        element: <ResponsiveDrawer Showsidebar={Sidebar} Page={MyChannel} />
      }
      ,
      
      {
        path: '/signin',
        element: <ResponsiveDrawer Showsidebar={Sidebar} Page={SignIn} />
      }
      ,
      
      {
        path: '/signup',
        element: <ResponsiveDrawer Showsidebar={Sidebar} Page={SignUp} />
      }
      ,
      
      {
        path: '/stream',
        element: <ResponsiveDrawer Page={Stream} />
      }
    ]
  },
]);


function App() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const tokenCookie = getCookie('user');
    if (tokenCookie) {
      const decodedToken = jwt_decode(tokenCookie);
      setUserData(decodedToken);
    }
  }, []); 

  return (
    <UserContext.Provider value={userData}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router}/>
    </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
