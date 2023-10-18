import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { Box } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import VideoAPI from "../../utils/VideoAPI";

function SearchPage() {
  let [params] = useSearchParams();
  const [videosList, setVideosList] = useState([]);
  useEffect(() => {
    const fetchResults = async () => {
      const data = await VideoAPI.getallData(`/searchvideo?search=${params.get('search')}`);
      setVideosList(data);
      console.log(data)
    };

    fetchResults()
  }, [params]);
  return (
    <div className="re-videos" style={{ width: '100%', minWidth: '200px' }}>
      <Box component="div" sx={{
        padding: '20px 30px 0', display: "flex",
        flexDirection: "column", gap: '10px'
      }}>
        {(videosList.map((item, key) => {
          return (
            <Box key={key}
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                width: "100%",
                height: '200px'
              }}
            >
              <Card sx={{ width: "100%" }} >
                <CardActionArea>
                  <Link
                    style={{
                      backgroundImage: "none",
                      display: "flex",
                      textDecoration: "none",
                      color: "white",
                      width: '100%',
                    }}
                    to={`/watch?id=${item.idvideo}`}
                  >
                    <div style={{ width: '30%' }}>
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
                    <div style={{ width: '70%' }}>
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
                          {item.viewcount} <CircleIcon sx={{ fontSize: "12px" }} />
                          {item.datecreated}
                        </Typography>
                      </CardContent>
                    </div>
                  </Link>
                </CardActionArea>
              </Card>
            </Box>
          )
        }))}
      </Box>
    </div >
  )
}

export default SearchPage;