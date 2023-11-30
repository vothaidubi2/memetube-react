import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { Box } from "@mui/material";
import './VideoDetail.scss'
import { Link, useSearchParams } from "react-router-dom";
import VideoAPI from "../../utils/VideoAPI";
import ContentBar from "./ContentBar";

function VideoDetail() {
  let [params] = useSearchParams();
  const [videoDetail, setVideoDetail] = useState({});
  const [top10Video, setTop10Video] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await VideoAPI.getOneItem(`/getonevideo?id=${params.get('id')}`);
        const suggest = await VideoAPI.getOneItem(`/gettop10video`);
        setVideoDetail(data.data);
        setTop10Video(suggest.data)
        console.log(suggest.data)
      } catch (error) {
        if (error.response || error.response.status === 404) {
          setIsAvailable(false);
        }
      }
    };
    fetchResults();
  }, [params]);
  const setCount = async () => {
    await VideoAPI.setCount(`/setcountvideo?id=${params.get('id')}`)
  }
  if (!isAvailable) {
    return <div
      className="re-videos"
      style={{
        display: "flex",
        flexDirection: 'row',
        padding: "10px 50px 30px",
        flexWrap: "wrap",
        gap: "30px",
        justifyContent: "space-between",
        width: '100%'
      }}
    >
      <h1>404 not found</h1>
    </div>
  }
  else return (
    <div
      className="re-videos"
      style={{
        display: "flex",
        flexDirection: 'row',
        padding: "10px 70px 30px",
        flexWrap: "wrap",
        gap: "30px",
        justifyContent: "space-between",
        width: '100%'
      }}
    >
      <Box sx={{ flexGrow: '6', flexBasis: '650px', width: '65%', display: 'flex', flexDirection: 'column' }}>
        <Card sx={{ borderRadius: "10px", display: "flex", maxHeight: '508px' }}>
          <CardActionArea >
            <CardMedia
              component="video"
              height={'100%'}
              controls
              autoPlay
              allowFullScreen
              frameBorder={'0'}
              onLoadStart={e => {
                e.currentTarget.volume = 0.3;
                setCount()
              }}
              src={videoDetail.videourl}
              title={videoDetail.title}
              width={"100%"}
              poster="https://i.ytimg.com/vi/-U5N3237WCw/maxresdefault.jpg"
            />
            {/* <CardContent >
                                <Typography gutterBottom variant="h6" component="div" sx={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    Mãi mãi là của nhau | Bùi Anh Tuấn
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Channel name
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    500K views <CircleIcon sx={{ fontSize: '12px' }} /> 1 years ago
                                </Typography>
                            </CardContent> */}
          </CardActionArea>
        </Card>
        <Box >
          <Card sx={{
            borderRadius: "10px", display: "flex", flexDirection: 'column', background: 'none',
            boxShadow: 'none',
          }}>
            <Typography
              gutterBottom
              component="h6"
              sx={{
                margin: '10px 0',
                fontSize: '24px',
                display: "block",
              }}
            >
              {videoDetail.title}
            </Typography>
            <CardActionArea sx={{ display: 'flex' }}>
            </CardActionArea>
          </Card>
          {videoDetail?.channel?.channelname ? (
            <ContentBar props={videoDetail} />
          ) : (<></>)}
        </Box>
      </Box>
      <Box component="div" sx={{ flexGrow: '1', flexBasis: '350px', width: '30%' }}>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: "10px",
            width: "100%",
          }}
        >
          {top10Video && (top10Video.map((item, key) => {
            return(
              <Card sx={{ width: "100%" }} key={key}>
              <CardActionArea>
                <Link
                  style={{
                    backgroundImage: "none",
                    display: "flex",
                    textDecoration: "none",
                    color: "white",
                    width: '100%'
                  }}
                  to={`/watch?id=${item.idvideo}`}
                >
                  <div style={{ width: '40%' }}>
                    <CardMedia
                      component="video"
                      height="100%"
                      poster={item.imageurl}
                      src={item.videourl}
                      frameBorder="0"
                      title={item.title}
                      sx={{ width: '100%' }}
                    />
                  </div>
                  <div style={{ width: '60%' }}>
                    <CardContent
                    >
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          fontSize: '16px',
                          display: "block",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "13px", }}>
                        {item.channel.channelname}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: "13px",
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        {item.viewcount} <CircleIcon sx={{ fontSize: "12px" }} /> {item.datecreated}
                      </Typography>
                    </CardContent>
                  </div>
                </Link>
              </CardActionArea>
            </Card>
            )
          }))}
        </Box>
      </Box>
    </div>
  );
}

export default VideoDetail;
