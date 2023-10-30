import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
} from "@mui/material";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Fingerprint } from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import CallEndIcon from "@mui/icons-material/CallEnd";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import MainScreenComponent from "../MainScreen/MainScreen.component";
import Chat from "../ChatVideo/Chat";
const messageExamples = [
  {
    primary: "Brunch this week?",
    secondary:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: "/static/images/avatar/5.jpg",
  },
  {
    primary: "Birthday Gift",
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    primary: "Recipe to try",
    secondary:
      "I am try out this new BBQ recipe, I think this might be amazing",
    person: "/static/images/avatar/2.jpg",
  },
  {
    primary: "Yes!",
    secondary: "I have the tickets to the ReactConf for this year.",
    person: "/static/images/avatar/3.jpg",
  },
  {
    primary: "Doctor's Appointment",
    secondary:
      "My appointment for the doctor was rescheduled for next Saturday.",
    person: "/static/images/avatar/4.jpg",
  },
  {
    primary: "Discussion",
    secondary: `Menus that are generated by the bottom app bar (such as a bottom
      navigation drawer or overflow menu) open as bottom sheets at a higher elevation
      than the bar.`,
    person: "/static/images/avatar/5.jpg",
  },
  {
    primary: "Summer BBQ",
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
    person: "/static/images/avatar/1.jpg",
  },

  {
    primary: "Birthday Gift",
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    primary: "Birthday Gift",
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    primary: "Birthday Gift",
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    primary: "Birthday Gift",
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    primary: "Birthday Gift",
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: "/static/images/avatar/1.jpg",
  },
];
export default function Stream1() {
  const actions = [
    { icon: <ThumbUpIcon />, name: 'Like' },
    { icon: <TagFacesIcon />, name: 'Haha' },
    { icon: <FavoriteIcon />, name: 'Love' },
    { icon: <SentimentVeryDissatisfiedIcon />, name: 'Sad' },
  ];
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const [messages, setMessages] = React.useState(() => messageExamples);

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    setMessages(messageExamples);
  }, [value, setMessages]);
  const giveicon =()=>{
    return (
      <>
       <Box sx={{   transform: 'translateZ(0px)', flexGrow: 50  }}>
      <SpeedDial
      backgroundColor="none"
        ariaLabel="SpeedDial basic example"
        sx={{  position: 'absolute', bottom: 60, right: 30,opacity:"0.8" }}
        
        icon={<ThumbUpIcon />}

      >
        {actions.map((action) => (
          <SpeedDialAction
          sx={{opacity:"1.2"}}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
      </>
    )
  }
  const commentUser = () => {
    return (
      <>
        <Card>
          <CardHeader
      
            title="1147 views"
            subheader="Comment"
          />
          <Card sx={{ maxHeight: "58vh", overflowY: "auto" }} ref={ref}>
            <CssBaseline />
            <List>
              {messages.map(({ primary, secondary, person }, index) => (
                <ListItem button key={index + person}>
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={person} />
                  </ListItemAvatar>
                  <ListItemText primary={primary} secondary={secondary} />
                </ListItem>
              ))}
            </List>
            {/* <Paper elevation={5}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
  
        </BottomNavigation>
      </Paper> */}
          </Card>
          <Box sx={{ display: "flex", alignItems: "center",margin:"0 2%" }}>
            <Link to="https://google.com">
              <Avatar
                alt="Remy Sharp"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWd96a9UE3aFBK97Vts75h_57qGKuUXK7MNWjloWH3-uQdwJfI0fKOVZPb-w9W6NKS-Xg&usqp=CAU"
                sx={{
                  width: 40,
                  height: 40,
                  marginRight: "1rem",
                }}
              />
            </Link>
            <TextField
              id="standard-basic"
              label="Comment"
              variant="standard"
              sx={{ width: 450 }}
            />
            <IconButton aria-label="settings">
              <SendIcon />
            </IconButton>
            {giveicon()}
          </Box>
        </Card>
      </>
    );
  };

  const adminStream = () => {
    return (
      <>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          sx={{ maxWidth: "100%", objectFit: "cover" }}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWd96a9UE3aFBK97Vts75h_57qGKuUXK7MNWjloWH3-uQdwJfI0fKOVZPb-w9W6NKS-Xg&usqp=CAU"
          alt="Paella dish"
        />
                <CardMedia
          component="img"
          sx={{ maxWidth: "30%", objectFit: "cover" ,position:"absolute" ,bottom:"0",right:"0"}}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWd96a9UE3aFBK97Vts75h_57qGKuUXK7MNWjloWH3-uQdwJfI0fKOVZPb-w9W6NKS-Xg&usqp=CAU"
          alt="Paella dish"
        />

      </Card>
      <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along with
                the mussels, if you like.
              </Typography>
            </CardContent>
            </>
    );
  };
  return (
    <>
      <Box
        className="Allinformation"
        sx={{ padding: "1% 7%", width: "100%", display: "flex"}}
      >
        <Box className="informationVideo" sx={{  width: "65%", margin: "0 1%" }}>
          {adminStream()}
        </Box>

        <Box
          className="customersComment"
          sx={{ position: "relative", width: "35%" }}
        >
          {commentUser()}
        </Box>
        <Box
          className="controlCall"
          sx={{ position: "fixed", bottom: "2%", width: "100%", left: "40%" }}
        >
          <Box sx={{ width: 1000 }}>
            <Button
              aria-label="fingerprint"
              sx={{
                backgroundColor: "#EA4335",
                borderRadius: "100px",
                width: 60,
                height: 35,
                margin: "0 2%",
                color: "#FFFFFF",
              }}
            >
              <MicIcon />
            </Button>
            <Button
              aria-label="fingerprint"
              sx={{
                backgroundColor: "#EA4335",
                borderRadius: "100px",
                width: 60,
                height: 35,
                margin: "0 2%",

              }}
            >
              <VideocamIcon />
            </Button>
            <Button
              aria-label="fingerprint"
              sx={{
                backgroundColor: "#3C4043",
                borderRadius: "100px",
                width: 60,
                height: 35,
                margin: "0 2%",
                color: "#FFFFFF",
              }}
            >
              <ScreenShareIcon />
            </Button>
            <Button
              aria-label="fingerprint"
              sx={{
                backgroundColor: "#3C4043",
                borderRadius: "100px",
                width: 60,
                height: 35,
                margin: "0 2%",
                color: "#FFFFFF",
              }}
            >
              <MoreVertIcon />
            </Button>
            <Button
              aria-label="fingerprint"
              sx={{
                backgroundColor: "#EA4335",
                borderRadius: "100px",
                width: 60,
                height: 35,
                margin: "0 2%",
                color: "#FFFFFF",
              }}
            >
              <CallEndIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}