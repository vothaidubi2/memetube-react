import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Tabs,
  Typography,
} from "@mui/material";
function createdatauser(linkimage, name, id, subscribercount, videocount) {
  return {
    linkimage,
    name,
    id,
    subscribercount,
    videocount,
  };
}
function createdatavideo(imagevideo, name, viewcount, time) {
  return {
    imagevideo,
    name,
    viewcount,
    time,
  };
}
function createdatasubscribe(imagechannel, name, subscribers) {
  return {
    imagechannel,
    name,
    subscribers,
  };
}
const rowcubcribe = [
  createdatasubscribe(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "channel1",
    150
  ),
  createdatasubscribe(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "channel1",
    150
  ),
  createdatasubscribe(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "channel1",
    150
  ),
  createdatasubscribe(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "channel1",
    150
  ),
  createdatasubscribe(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "channel1",
    150
  ),
  createdatasubscribe(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "channel1",
    150
  ),
  createdatasubscribe(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "channel1",
    150
  ),
  createdatasubscribe(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "channel1",
    150
  ),
  createdatasubscribe(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "channel1",
    150
  ),
  createdatasubscribe(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "channel1",
    150
  ),
];
const rowvideo = [
  createdatavideo(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "video1",
    7000,
    "2"
  ),
  createdatavideo(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "video2",
    7000,
    "2"
  ),
  createdatavideo(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "video3",
    7000,
    "2"
  ),
  createdatavideo(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "video3",
    7000,
    "2"
  ),
  createdatavideo(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "video3",
    7000,
    "2"
  ),
  createdatavideo(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "video3",
    7000,
    "2"
  ),
  createdatavideo(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "video3",
    7000,
    "2"
  ),
  createdatavideo(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "video3",
    7000,
    "2"
  ),
  createdatavideo(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "video3",
    7000,
    "2"
  ),
];
function a11yPropstable(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const rows = [
  createdatauser(
    "https://img.uhdpaper.com/wallpaper/anime-girl-reading-with-cat-147@0@h-thumb.jpg",
    "Lê Xuân Bình",
    1,
    70,
    4
  ),
];

const cardList = rowvideo.map((video, index) => (
  <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={video.imagevideo}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {video.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video.viewcount} víews -- {video.time} hours ago
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default function MyChannel() {
  const [sub, setSub] = React.useState(Array(rowcubcribe.length).fill(true));
  const handleSubClick = (index) => {
    const updatedStatus = [...sub];
    updatedStatus[index] = !updatedStatus[index];
    setSub(updatedStatus);
  };
  const statusSub = (index) => {
    if (sub[index] === true) {
      return <Typography>Registered</Typography>;
    } else {
      return <Typography>register</Typography>;
    }
  };
  const subscribersList = rowcubcribe.map((video, index) => (
    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
      <Box sx={{ textAlign: "center" }}>
        <Avatar
          alt="Remy Sharp"
          src={video.imagechannel}
          sx={{ width: 150, height: 150, margin: "0 auto 1rem" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {video.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video.subscribers} Subscribers
          </Typography>
        </CardContent>
        <Button
          variant={sub[index] ? "contained" : "outlined"}
          onClick={() => handleSubClick(index)}
        >
          {statusSub(index)}
        </Button>
      </Box>
    </Grid>
  ));
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabstable = () => {
    return (
      <Box sx={{ width: "100%", typography: "body1", padding: " 0 5%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={<div>Home page</div>}
            sx={{ width: "33.3%" }}
            {...a11yPropstable(0)}
          />
          <Tab
            label={<div>Video</div>}
            sx={{ width: "33.3%" }}
            {...a11yPropstable(1)}
          />
          <Tab
            label={<div>Channel</div>}
            sx={{ width: "33.3%" }}
            {...a11yPropstable(2)}
          />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <Typography sx={{ margin: "2%  0% " }}>Uploaded videos</Typography>
          <Grid container spacing={2}>
            {cardList}
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Typography sx={{ margin: "2%  0% " }}></Typography>
          <Grid container spacing={2}>
            {cardList}
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Typography sx={{ margin: "2%  5% " }}>Subscribe channel</Typography>
          <Grid container spacing={2}>
            {subscribersList}
          </Grid>
        </CustomTabPanel>
      </Box>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container>
        <Grid item sx={{ width: "100%" }}>
          <Typography
            sx={{
              fontSize: 27,
              fontWeight: "bold",
              margin: "2%  10%",
            }}
          >
            <div className="allinformation">
              <React.Fragment>
                <Box sx={{ display: "flex", margin: "3% 0" }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={rows[0].linkimage}
                    sx={{ width: 150, height: 150, marginRight: "1rem" }}
                  />
                  <div className="informationuserandtime">
                    <Box sx={{ marginLeft: "10%", width: "100%" }}>
                      <Link to="https://google.com">
                        <Typography sx={{ fontSize: 25, color: "white" }}>
                          {rows[0].name}
                        </Typography>
                      </Link>
                      <Typography sx={{ fontSize: 18, color: "gray" }}>
                        @{rows[0].id} {rows[0].subscribercount} subscriber{" "}
                        {rows[0].videocount} video
                      </Typography>

                      <Link to="https://google.com">
                        <Typography sx={{ fontSize: 18, color: "gray" }}>
                          Learn more about this channel
                        </Typography>
                      </Link>
                    </Box>
                  </div>
                </Box>
                <Box></Box>
              </React.Fragment>
            </div>
          </Typography>

          <Divider sx={{ marginBottom: "10px" }} light />
          {tabstable()}
          <div className="content"></div>
          <div className="iconfilter" style={{ padding: "1% 2%" }}>
            {/* ... */}
          </div>
          <Divider sx={{ marginBottom: "2px" }} light />
          {/* Render commentuser based on replyingToIndex */}
        </Grid>
      </Grid>
      <Grid></Grid>
    </Box>
  );
}
