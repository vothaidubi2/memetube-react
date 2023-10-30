import React, { useState, useRef, useContext, useEffect } from "react";
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
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import MainScreen from "../MainScreen/MainScreen.component";
import Chat from "../ChatVideo/Chat";
import { UserContext } from "../Cookie/UserContext";

export default function Stream() {
  let user = useContext(UserContext);
  console.log("userrrrrr", user)
  if (user == null) {
    return <></>;
  } else
    return (
      <>
        <div style={{ margin: "10px  5% 0 5%  ", display: "flex" }}>
          <MainScreen userName={user.Email} />
          <div className="App" style={{ marginLeft: "3%" }}>
            <Chat name={user.Email} />
          </div>
        </div>
      </>
    );
}
