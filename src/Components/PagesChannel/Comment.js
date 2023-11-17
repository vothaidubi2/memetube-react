import React, { useContext, useEffect, useState } from "react";
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
import CommentAPI from "../../utils/CommentAPI";
import DateConvert from "../../utils/DayConvert";
import RatingAPI from "../../utils/RatingAPI";
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from "../Cookie/UserContext";
import ChannelAPI from "../../utils/ChannelAPI";

export default function Comment() {
  const userData = useContext(UserContext)
  const [videoComment, setIdvideoComment] = React.useState();
  const [listVIdeoComment, setListVideoComment] = useState([])
  const [listComment, setListComment] = useState([])
  const [currentVideo, setCurrentVideo] = useState({})
  const [listReplyCmt, setListReplyCmt] = useState([]);
  const [replyingToIndex, setReplyingToIndex] = useState(
    Array(listComment.length).fill(false)
  );
  const [openAlertIndex, setOpenAlertIndex] = useState(
    Array(listComment.length).fill(false)
  );
  const [openWatchReplyComment, setopenWatchReplyComment] = useState(
    Array(listComment.length).fill(false)
  );
  const [isThumbUpClicked, setThumbUpClicked] = useState(
    Array(listComment.length).fill(false)
  );
  const [isThumbDownClicked, setThumbDownClicked] = useState(
    Array(listComment.length).fill(false)
  );
  const [isFavoriteClicked, setFavoriteClicked] = useState(
    Array(listComment.length).fill(false)
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
  const watchUserReply = (index, idbasecmt) => {
    fetchReplyCmt(idbasecmt)
    const updatedStatus = openWatchReplyComment.map((_, i) => i === index ? openWatchReplyComment[i] : false);
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

  const handleChangeSelectComment = async (event) => {
    setIdvideoComment(event.target.value);
    const currentVideo = await VideoAPI.getOneItem(`/getonevideo?id=${event.target.value}`)
    const listComment = await CommentAPI.getAllBaseCmt(`/getallbasecmt?idvideo=${event.target.value}`)
    setCurrentVideo(currentVideo.data)
    setListComment(listComment.data)
    console.log("vao day", listComment.data)
  };

  const dataVideoComment = async () => {
    const channel = await ChannelAPI.getOneItem(`/findchannelbyiduser?iduser=${userData.Iduser}`)
    const data = await VideoAPI.getOneItem(`/listvideobycommentchannel?idchannel=${channel.idchannel}`)
    if (data?.data.length > 0) {
      let listretult = [];
      for (let i = 0; i < data.data.length; i++) {
        const result = await VideoAPI.getOneItem(`/getonevideo?id=${data.data[i]}`)
        listretult.push(result.data)
      }
      setListVideoComment(listretult)
      console.log(listretult)
    }
  }
  //reply comment
  const fetchReplyCmt = async (idbasecmt) => {
    const data = await RatingAPI.countRating(`/getallreplycmt?idvideo=${currentVideo.idvideo}&idbasecmt=${idbasecmt}`);
    if (data.status == 200) {
      setListReplyCmt(data.data)
      console.log("replycmt", data.data)
    }
  };
  useEffect(() => {
    if(userData){
      dataVideoComment()
    }
  }, [userData])

  const handleDeleteCmt = async (current) => {
    if (current.idbasecmt == null) {
      await CommentAPI.deleteComment(`/deletecomment?idcomment=${current.idcomment}&idbasecmt=${current.idcomment}`)
    } else {
      await CommentAPI.deleteComment(`/deletecomment?idcomment=${current.idcomment}&idbasecmt=${0}`)
    }
    const listComment = await CommentAPI.getAllBaseCmt(`/getallbasecmt?idvideo=${current.video.idvideo}`)
    const currentVideo = await VideoAPI.getOneItem(`/getonevideo?id=${current.video.idvideo}`)
    setCurrentVideo(currentVideo.data)
    setListComment(listComment.data)
    if(current.idbasecmt!=null){
      const data = await RatingAPI.countRating(`/getallreplycmt?idvideo=${current.video.idvideo}&idbasecmt=${current.idbasecmt}`);
      if (data.status == 200) {
        setListReplyCmt(data.data)
        console.log("replycmt", data.data)
      }
    }
  }

  const commentuser = () => {
    return (
      <Box sx={{ display: 'flex', width: '100%' }}>
        <div className="allinformation" style={{ flexBasis: '1', flex: '2' }}>
          {listComment && listComment.map((row, rowIndex) => {
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
                      src={row.users.avatar}
                      sx={{ width: 56, height: 56, marginRight: "1rem" }}
                    />
                    <div className="informationuserandtime">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Link to="https://google.com">
                          <Typography color={"text.secondary"}>
                            {row.users.email} -
                          </Typography>
                        </Link>

                        <div className="content">
                          <Typography color={"text.secondary"}>
                            - <DateConvert date={row.datecreated} />
                          </Typography>
                        </div>
                        <div style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => handleDeleteCmt(row)}>
                          <DeleteIcon />
                        </div>
                      </Box>
                      <Typography>{row.contents} </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", cursor: 'pointer' }}>
                        <Typography
                          color={"text.secondary"}
                          variant="none"
                          onClick={() => handleReplyClick(rowIndex)} // Clicking "Reply" shows replycomment
                        >
                          Feedback
                        </Typography>
                        <Typography
                          sx={{ width: "auto", margin: " 0 20px", cursor: 'pointer' }}
                          color={"text.secondary"}
                          variant="none"
                          onClick={() => watchUserReply(rowIndex, row.idcomment)} // Clicking "1 Reply" shows commentuser
                        >
                          Show Feedback
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
            paddingRight: '30px'
          }}
        >
          {currentVideo && (
            <>
              <img
                className="smallimage"
                src={currentVideo.imageurl}
                alt=""
                width={"200px"}
              />
              <Typography sx={{ maxWidth: '200px' }}>
                {currentVideo.title}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    );
  };

  const watchcommentuser = (index) => {
    if (openWatchReplyComment[index] === true) {
      return (
        <>
          <div className="allinformation">
            {listReplyCmt.map((row, rowIndex) => {
              return (
                <React.Fragment key={rowIndex}>
                  <Box sx={{ display: "flex", margin: "3% 0" }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={row.users.avatar}
                      sx={{ width: 56, height: 56, marginRight: "1rem" }}
                    />
                    <div className="informationuserandtime">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Link to="https://google.com">
                          <Typography color={"text.secondary"}>
                            {row.users.email} -
                          </Typography>
                        </Link>
                        <div className="content">
                          <Typography color={"text.secondary"}>
                            {" "}
                            - {row.datecreated}
                          </Typography>
                        </div>
                        <div style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => handleDeleteCmt(row)}>
                          <DeleteIcon />
                        </div>
                      </Box>
                      <Typography>{row.contents} </Typography>
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
            {listComment.map((row, rowIndex) => {
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
                                sx={{ width: 56, height: 56, marginRight: "1rem" }}
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
          <Box sx={{ minWidth: 120, maxWidth: '50%' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Video</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={videoComment}
                label="Age"
                onChange={handleChangeSelectComment}
              >
                {listVIdeoComment && listVIdeoComment.map((item, key) => {
                  return (
                    <MenuItem key={key} value={item.idvideo}>{item.title}</MenuItem>
                  )
                }

                )}

              </Select>
            </FormControl>
          </Box>
          <Divider sx={{ marginBottom: "2px", marginTop: '10px' }} light />
          {/* Render commentuser based on replyingToIndex */}
          {commentuser()}
        </Grid>
      </Grid>
      <Grid></Grid>
    </Box>
  );
}
