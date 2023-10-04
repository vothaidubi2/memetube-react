import './App.css';

import ResponsiveDrawer from './Components/ResponsiveDrawer/ResponsiveDrawer';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import RecommendVideos from './Components/RecommendVideos/RecommendVideos';
import SearchPage from './Components/Search/SearchPage';
import Sidebar from './Components/Sidebar/Sidebar';
import VideoDetail from './Components/VideoDetail/VideoDetail';


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
    ]
  },
]);


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
}

export default App;
