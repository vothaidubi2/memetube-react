import './App.css';
import {
  child,
  db,
  onValue,
  push,
  refDatabase,
  firepadRef
} from "./utils/FirebaseConfig";
import "./App.css";
import { useContext, useEffect, useState } from "react";
import { userRole } from "./utils/FirebaseConfig";
import {
  setMainStream,
  addParticipant,
  setUser,
  removeParticipant,
  updateParticipant,
} from "./Components/Store/actioncreator";
import { connect } from "react-redux";
import {
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onDisconnect,
} from "firebase/database";
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
import Update from './Components/Form/Update';
import Stream from './Components/Stream/Stream';
import UserManager from './Components/Admin/UserManager';
import ForgotPass from './Components/Form/ForgotPass';
import { UserContext } from './Components/Cookie/UserContext';
import jwt_decode from "jwt-decode";
import getCookie from './Components/Cookie/getCookie';
import NotFound from './Components/ResponsiveDrawer/NotFound';
import ThankYou from './Components/ResponsiveDrawer/ThankYou';
import CategoryManager from './Components/Admin/CategoryManager';
function App(props) {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const tokenCookie = getCookie('user');
    if (tokenCookie) {
      const decodedToken = jwt_decode(tokenCookie);
      setUserData(decodedToken);
    }
  }, []);

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Authorization(options) {
  const { page = null, sidebars = null } = options;
 
console.log('userdataa',userData)
  const currentURL = new URL(window.location.href);
  const token = getCookie('user');
if(currentURL.pathname.startsWith('/studio') ){
if( userData==null){
  return <ResponsiveDrawer Showsidebar={Sidebar} Page={RecommendVideos} />
}else{
  return <ResponsiveDrawer Showsidebar={sidebars} Page={page} />
}

}else if(currentURL.pathname.startsWith('/stream')){
if(  userData==null){
  return <ResponsiveDrawer Showsidebar={Sidebar} Page={RecommendVideos} />
}else{
  return <ResponsiveDrawer Showsidebar={sidebars} Page={page} />
}

}else if(currentURL.pathname.startsWith('/admin')){
  if(userData==null){
    return <ResponsiveDrawer Showsidebar={Sidebar} Page={RecommendVideos} />
  }else if(userData.Role===false){
    return <ResponsiveDrawer Showsidebar={Sidebar} Page={RecommendVideos} />
  }else{
    return <ResponsiveDrawer Showsidebar={sidebars} Page={page} />
  }
}
}
const router = createBrowserRouter([
  {
    path: '/*',
    element: <NotFound />
  },
  {
    path: '/success-transaction',
    element: <ThankYou />
  },
  {
    element: <Layout />,

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
      , {
        path: '/studio/home',
        element: Authorization({sidebars:UserChannel,page:Homepage}) 
      }, {
        path: '/studio/content',
        element: Authorization({sidebars:UserChannel,page:Content})
      }, {
        path: '/studio/data',
        element: Authorization({sidebars:UserChannel,page:DataDetails})
      },
      {
        path: '/studio/comment',
        element: Authorization({sidebars:UserChannel,page:Comment}) 
      }
      ,

      {
        path: '/channel/home',
        element: Authorization(Sidebar,MyChannel )
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
        element: Authorization({ page: Stream})
      }      
,
      {
        path: '/admin/user',
        element: Authorization({page:UserManager} )
      }    ,

      {
        path: '/admin/category',
        element: Authorization({page:CategoryManager})
      }
      ,

      {
        path: '/update',
        element: Authorization({sidebars:Sidebar,page:Update}) 
      }
      , 
           {
        path: '/forgotpass',

        element: <ResponsiveDrawer Showsidebar={Sidebar} Page={ForgotPass} />

      }
    ]
  },
]);



  let dataUser = useContext(UserContext);
  let EmailUser = null
  if (dataUser != null) {
    EmailUser = dataUser.Email
  }
  const [showChat, setShowChat] = useState(false);
  const getUserStream = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    return localStream;
  };
  const connectedRef = refDatabase(db, ".info/connected");
  const participantRef = child(firepadRef, "participants");
  useEffect(() => {

    const getEffect = async () => {
      const stream = await getUserStream();
      stream.getVideoTracks()[0].enabled = false;
      props.setMainStream(stream);

      onValue(refDatabase(db, ".info/connected"), (snap) => {
        if (snap.val()) {
          const defaultPreference = {
            audio: false,
            video: false,
            screen: false,
            master: userRole,
          };
          const userStatusRef = push(participantRef, {
            EmailUser,
            preferences: defaultPreference,
          });
          props.setUser({
            [userStatusRef.key]: { name: EmailUser, ...defaultPreference },
          });
          console.log("props:", props);
          onDisconnect(userStatusRef).remove();
        }
      });
    };
    getEffect();
  }, []);

  const isUserSet = !!props.user;
  const isStreamSet = !!props.stream;

  useEffect(() => {
    if (isStreamSet && isUserSet) {
      onChildAdded(participantRef, (snap) => {
        const preferenceUpdateEvent = child(
          child(participantRef, snap.key),
          "preferences"
        );
        onChildChanged(preferenceUpdateEvent, (preferenceSnap) => {
          console.log("cai key:", preferenceSnap.key)
          props.updateParticipant({
            [snap.key]: {
              [preferenceSnap.key]: preferenceSnap.val(),
            },
          });
        });
        const { EmailUser: name, preferences = {} } = snap.val();
        props.addParticipant({
          [snap.key]: {
            name,
            ...preferences,
          },
        });
      });
      onChildRemoved(participantRef, (snap) => {
        props.removeParticipant(snap.key);
      });
    }
  }, [isStreamSet, isUserSet]);


  return (
    <UserContext.Provider value={userData}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserContext.Provider>
  );
}
const mapStateToProps = (state) => {
  return {
    stream: state.mainStream,
    user: state.currentUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setMainStream: (stream) => dispatch(setMainStream(stream)),
    addParticipant: (user) => dispatch(addParticipant(user)),
    setUser: (user) => dispatch(setUser(user)),
    removeParticipant: (userId) => dispatch(removeParticipant(userId)),
    updateParticipant: (user) => dispatch(updateParticipant(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
