import React, { useEffect, useState } from "react";
import { visuallyHidden } from "@mui/utils";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Alert,
  Avatar,
  Button,
  Collapse,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { Link } from "react-router-dom";
import VideoAPI from "../../utils/VideoAPI";
function createdatauser(
  idcomment,
  nameuser,
  timecomment,
  contentcomment,
  videocommet,
  namevideocomment,
  avatar
) {
  return {
    idcomment,
    nameuser,
    timecomment,
    contentcomment,
    videocommet,
    namevideocomment,
    avatar,
  };
}

const rows = [
  createdatauser(
    1,
    "le xuan binh",
    "10/10/2023",
    "hahaha",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWd96a9UE3aFBK97Vts75h_57qGKuUXK7MNWjloWH3-uQdwJfI0fKOVZPb-w9W6NKS-Xg&usqp=CAU",
    "video1",
    "https://i.ytimg.com/vi/-U5N3237WCw/maxresdefault.jpg"
  ),
  createdatauser(
    2,
    "le xuan binh",
    "10/10/2023",
    "hihihi",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWd96a9UE3aFBK97Vts75h_57qGKuUXK7MNWjloWH3-uQdwJfI0fKOVZPb-w9W6NKS-Xg&usqp=CAU",
    "video2",
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg"
  ),
  createdatauser(
    3,
    "le xuan binh",
    "10/10/2023",
    "hihihi",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWd96a9UE3aFBK97Vts75h_57qGKuUXK7MNWjloWH3-uQdwJfI0fKOVZPb-w9W6NKS-Xg&usqp=CAU",
    "video3",
    "https://img.uhdpaper.com/wallpaper/cute-anime-girl-blonde-750@0@i-thumb.jpg"
  ),
];
export default function Comment() {
  const [replyingToIndex, setReplyingToIndex] = useState(
    Array(rows.length).fill(false)
  );
  const [openAlertIndex, setOpenAlertIndex] = useState(
    Array(rows.length).fill(false)
  );
  const [openWatchReplyComment, setopenWatchReplyComment] = useState(
    Array(rows.length).fill(false)
  );
  const [isThumbUpClicked, setThumbUpClicked] = useState(
    Array(rows.length).fill(false)
  );
  const [isThumbDownClicked, setThumbDownClicked] = useState(
    Array(rows.length).fill(false)
  );
  const [isFavoriteClicked, setFavoriteClicked] = useState(
    Array(rows.length).fill(false)
  );
  const handleReplyClick = (index) => {
    const updatedStatus = [...replyingToIndex];
    updatedStatus[index] = !updatedStatus[index];
    setReplyingToIndex(updatedStatus);
    const updateStatusAlert = [...openAlertIndex];
    updateStatusAlert[index] = !updateStatusAlert[index];
    setOpenAlertIndex(updateStatusAlert);
  };

  const handleAlertClose = (index) => () => {
    const updatedStatus = [...openAlertIndex];
    updatedStatus[index] = false;
    setOpenAlertIndex(updatedStatus);
  };
  const watchUserReply = (index) => {
    const updatedStatus = [...openWatchReplyComment];
    updatedStatus[index] = !updatedStatus[index];
    setopenWatchReplyComment(updatedStatus);
  };
  const handleThumbUpClicked = (index) => {
    console.log(isThumbUpClicked);
    const updatedStatus = [...isThumbUpClicked];
    console.log(updatedStatus);
    updatedStatus[index] = !updatedStatus[index];
    setThumbUpClicked(updatedStatus);
    if (isThumbUpClicked[index] === false) {
      isThumbDownClicked[index] = false;
    }
  };

  const handleThumbDownClicked = (index) => {
    const updatedStatus = [...isThumbDownClicked];
    updatedStatus[index] = !updatedStatus[index];
    setThumbDownClicked(updatedStatus);
    if (isThumbDownClicked[index] === false) {
      isThumbUpClicked[index] = false;
    }
  };

  const handleFavoriteClicked = (index) => {
    const updatedStatus = [...isFavoriteClicked];
    updatedStatus[index] = !updatedStatus[index];
    setFavoriteClicked(updatedStatus);
  };
  const [videoComment, setIdvideoComment] = React.useState();
  const [listVIdeoComment,setListVideoComment] = useState([])

  const handleChangeSelectComment = (event) => {
    setIdvideoComment(event.target.value);
    console.log(event.target.value)
  };
  
  const dataVideoComment = async()=>{
    const data = await VideoAPI.getOneItem("/listvideobycomment")
    if(data?.data.length>0){
      let listretult = [];
      for(let i=0;i<data.data.length;i++){
        const result = await VideoAPI.getOneItem(`/getonevideo?id=${data.data[i]}`)
        listretult.push(result.data)
      }
      setListVideoComment(listretult)
      console.log(listretult)
    }
  }
  useEffect(()=>{
    dataVideoComment()
  },[])

  const commentuser = () => {
    return (
      <Box sx={{ display: 'flex', width: '100%' }}>
        <div className="allinformation" style={{ flexBasis: '1', flex: '2' }}>
          {rows.map((row, rowIndex) => {
            return (
              <React.Fragment key={rowIndex}>
                <Box
                  sx={{
                    display: "flex",
                    margin: "2% 3%",
                    justifyContent: "space-between", // Căn chỉnh sang hai phía
                    alignItems: "center", // Căn chỉnh theo chiều dọc
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={row.avatar}
                      sx={{ width: 56, height: 56, marginRight: "1rem" }}
                    />
                    <div className="informationuserandtime">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Link to="https://google.com">
                          <Typography color={"text.secondary"}>
                            {row.nameuser} -
                          </Typography>
                        </Link>

                        <div className="content">
                          <Typography color={"text.secondary"}>
                            - {row.timecomment}
                          </Typography>
                        </div>
                      </Box>
                      <Typography>{row.contentcomment} </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          color={"text.secondary"}
                          variant="none"
                          onClick={() => handleReplyClick(rowIndex)} // Clicking "Reply" shows replycomment
                        >
                          Feedback
                        </Typography>
                        <Typography
                          sx={{ width: "auto", margin: " 0 20px" }}
                          color={"text.secondary"}
                          variant="none"
                          onClick={() => watchUserReply(rowIndex)} // Clicking "1 Reply" shows commentuser
                        >
                          1 Feedback
                        </Typography>
                        <IconButton
                          aria-label="fingerprint"
                          onClick={() => {
                            handleThumbUpClicked(rowIndex);
                          }}
                          style={{
                            color: isThumbUpClicked[rowIndex] ? "red" : "gray",
                          }}
                        >
                          <ThumbUpIcon />
                        </IconButton>
                        <IconButton
                          aria-label="fingerprint"
                          onClick={() => {
                            handleThumbDownClicked(rowIndex);
                          }}
                          style={{
                            color: isThumbDownClicked[rowIndex]
                              ? "red"
                              : "gray",
                          }}
                        >
                          <ThumbDownIcon />
                        </IconButton>
                        <IconButton
                          aria-label="fingerprint"
                          onClick={() => handleFavoriteClicked(rowIndex)}
                          style={{
                            color: isFavoriteClicked[rowIndex] ? "red" : "gray",
                          }}
                        >
                          <FavoriteIcon />
                        </IconButton>
                      </Box>
                    </div>
                  </Box>
                </Box>

                <Box>
                  <Box
                    sx={{
                      margin: "0% 5%",
                    }}
                  >
                    {replycomment(rowIndex)}
                    {watchcommentuser(rowIndex)}
                  </Box>
                </Box>
              </React.Fragment>
            );
          })}
        </div>
        <Box
          sx={{
            flexDirection: 'column', flexBasis: '1',
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <img
            className="smallimage"
            src={rows[0].videocommet}
            alt=""
            width={"50%"}
          />
          <Typography sx={{ marginLeft: "3%" }}>
            {rows[0].namevideocomment}
          </Typography>
        </Box>
      </Box>
    );
  };

  const watchcommentuser = (index) => {
    if (openWatchReplyComment[index] === true) {
      return (
        <>
          <div className="allinformation">
            {rows.map((row, rowIndex) => {
              return (
                <React.Fragment key={rowIndex}>
                  <Box sx={{ display: "flex", margin: "3% 0" }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={row.avatar}
                      sx={{ width: 56, height: 56, marginRight: "1rem" }}
                    />
                    <div className="informationuserandtime">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Link to="https://google.com">
                          <Typography color={"text.secondary"}>
                            {row.nameuser} -
                          </Typography>
                        </Link>
                        <div className="content">
                          <Typography color={"text.secondary"}>
                            {" "}
                            - {row.timecomment}
                          </Typography>
                        </div>
                      </Box>
                      <Typography>{row.contentcomment} </Typography>
                    </div>
                  </Box>
                  <Box></Box>
                </React.Fragment>
              );
            })}
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  const replycomment = (index) => {
    if (openAlertIndex[index] === true) {
      return (
        <>
          <div className="allinformation">
            {rows.map((row, rowIndex) => {
              console.log(index + "sss" + rowIndex);
              return (
                <React.Fragment key={rowIndex}>
                  <Box sx={{ display: "flex" }}>
                    <div className="informationuserandtime">
                      <Collapse in={index === rowIndex}>
                        <Alert icon={false}>
                          <Box
                            sx={{
                              margin: "0 0 0 82%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Button onClick={handleAlertClose(rowIndex)}>
                              Sumbit
                              <DoneIcon />
                            </Button>
                            <Button onClick={handleAlertClose(rowIndex)}>
                              Cancel
                              <CloseIcon />
                            </Button>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Link to="https://google.com">
                              <Avatar
                                alt="Remy Sharp"
                                src={row.avatar}
                                sx={{
                                  width: 40,
                                  height: 40,
                                  marginRight: "1rem",
                                }}
                              />
                            </Link>
                            <TextField
                              sx={{ width: "1000px", marginLeft: "1rem" }}
                              id="outlined-multiline-static"
                              label="Title (required)"
                              multiline
                              rows={3}
                            />
                          </Box>
                        </Alert>
                      </Collapse>
                    </div>
                  </Box>
                  <Box></Box>
                </React.Fragment>
              );
            })}
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container>
        <Grid item sx={{ width: "100%" }}>
          <Typography
            sx={{
              fontSize: 27,
              fontWeight: "bold",
              padding: "2% ",
            }}
          >
            Channel comments
          </Typography>
          <Divider sx={{ marginBottom: "10px" }} light />
          <Box sx={{ minWidth: 120 ,maxWidth:'50%'}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Video</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={videoComment}
                label="Age"
                onChange={handleChangeSelectComment}
              >
                {listVIdeoComment&&listVIdeoComment.map((item,key)=>{
                  return(
                    <MenuItem key={key} value={item.idvideo}>{item.title}</MenuItem>
                  )
                }
                  
                )}
                
              </Select>
            </FormControl>
          </Box>
          <Divider sx={{ marginBottom: "2px",marginTop:'10px' }} light />
          {/* Render commentuser based on replyingToIndex */}
          {commentuser()}
        </Grid>
      </Grid>
      <Grid></Grid>
    </Box>
  );
}
