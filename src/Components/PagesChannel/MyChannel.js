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
import { UserContext } from "../Cookie/UserContext";
import VideoAPI from "../../utils/VideoAPI";
import SubscribeAPI from "../../utils/SubscribeAPI";

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

function a11yPropstable(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}



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

  const userData = React.useContext(UserContext)
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [totalChannel, setTotalChannel] = React.useState(0);
  const [channel, setChannel] = React.useState([]);
  const [totalChannelSub, setTotalChannelSub] = React.useState(0);
  const fetchDataChannel = async () => {
    const data = await VideoAPI.getallByUser(`/videobyiduser?iduser=${userData.Iduser}`);
    setTotalChannel(data.total);
    setRows(data.data);
  };
  const fetchDataSub = async () => {
    const data = await SubscribeAPI.getCountSubById(`/getCountSubById?iduser=${userData.Iduser}`);
    setChannel(data.data)
    setTotalChannelSub(data.data.length)
  };
  React.useEffect(() => {
    if (!open) {
      fetchDataChannel();
      fetchDataSub();
    }
    fetchDataChannel();
    fetchDataSub();
  }, [open]);
  console.log(totalChannel)
  console.log(rows)
  function convertTime(inputTime) {
    // Chuyển đổi thời gian từ chuỗi thành đối tượng Date
    const inputDate = new Date(inputTime);

    // Tính thời gian hiện tại
    const currentTime = new Date();

    // Tính khoảng cách thời gian giữa hiện tại và thời gian đầu vào
    const timeDifference = currentTime - inputDate;

    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);
    let result = "";
    if (days > 0) {
        result += days + " day" + (days > 1 ? "s " : " ");
    } else if (hours > 0) {
        result += hours + " hour" + (hours > 1 ? "s " : " ");
    } else if (minutes > 0) {
        result += minutes + " minute" + (minutes > 1 ? "s " : " ");
    } else {
        result += seconds + " second" + (seconds > 1 ? "s " : " ");
    }
    
    result += "ago";
    

    return result;
}
const cardList = rows.map((video, index) => (
  <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
    <Link to={`/watch?id=${video.idvideo}`}>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={video.imageurl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {video.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video.viewcount} views -- {convertTime(video.datecreated)} hours ago
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  </Grid>
));
  const [sub, setSub] = React.useState(Array(rows.length).fill(true));
  const handleSubClick = async(index) => {
    const updatedStatus = [...sub];
    updatedStatus[index] = !updatedStatus[index];
    setSub(updatedStatus);
    const tempchanel=[...channel];
    if(updatedStatus[index]===true){
      tempchanel[index][3]=tempchanel[index][3]-1
      const data=SubscribeAPI.deleteSub(`/deletesub?iduser=${userData.Iduser}&idchannel=${tempchanel[index][0]}`)
    }else{
      tempchanel[index][3]=tempchanel[index][3]+1
      const data=SubscribeAPI.addSub(`/addsub?iduser=${userData.Iduser}&idchannel=${tempchanel[index][0]}`)
    }
console.log('index',updatedStatus[index])
  };
  const statusSub = (index) => {
    if (sub[index] === true) {
      return <Typography>register</Typography>;
    } else {
      return <Typography>Registered</Typography>;

    }
  };
  const subscribersList = channel.map((video, index) => (
    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
      <Box sx={{ textAlign: "center" }}>
        <Avatar
          alt="Remy Sharp"
          src={video[2]}
          sx={{ width: 150, height: 150, margin: "0 auto 1rem" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {video[1]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video[3]} Subscribers
          </Typography>
        </CardContent>
        <Button
          variant={sub[index] ? "outlined" : "contained"}
          onClick={() => handleSubClick(index)}
        >
          {statusSub(index)}
        </Button>
      </Box>
    </Grid>
  ));
  const [value, setValue] = React.useState(0);

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
            label={<div>subscribed channel</div>}
            sx={{ width: "33.3%" }}
            {...a11yPropstable(1)}
          />
        </Tabs>
        {value=== 0 ? <>        <CustomTabPanel >
          <Typography sx={{ margin: "2%  0% " }}>Uploaded videos</Typography>
          <Grid container spacing={2}>
            {cardList}
          </Grid>
        </CustomTabPanel></>:<></>}

        <CustomTabPanel value={value} index={1}>
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
                    src={userData.Avatar}
                    sx={{ width: 150, height: 150, marginRight: "1rem" }}
                  />
                  <div className="informationuserandtime">
                    <Box sx={{ marginLeft: "10%", width: "100%" }}>
                      <Link to="https://google.com">
                        <Typography sx={{ fontSize: 25, color: "white" }}>
                          {userData.Email}
                        </Typography>
                      </Link>
                      <Typography sx={{ fontSize: 18, color: "gray" }}>
                        {/* @{rows[0].id} {rows[0].subscribercount} subscriber{" "} */}
                        {totalChannel} video
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
