import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { Box } from "@mui/material";

function VideoDetail() {
  return (
    <div
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
      <Box sx={{ flexGrow: '6', flexBasis: '500px', width: '65%', display: 'flex', flexDirection: 'column' }}>
        <Card sx={{ borderRadius: "10px", display: "flex" }}>
          <CardActionArea>
            <CardMedia
              controls
              autoPlay
              component="video"
              onPlay={e => e.currentTarget.volume = 0.5}
              height={"100%"}
              src="https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT"
              title="Mãi mãi là của nhau | Bùi Anh Tuấn"
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
        <Card sx={{ borderRadius: "10px", display: "flex", flexDirection: 'column',backgroundImage:'none',
              boxShadow:'none', }}>
          <Typography
            gutterBottom
            component="h6"
            sx={{
              margin:'10px 0',
              fontSize: '24px',
              display: "block",
            }}
          >
            Mãi mãi là của nhau | Bùi Anh Tuấn
          </Typography>
          <CardActionArea sx={{display:'flex'}}>
              
          </CardActionArea>
        </Card>
      </Box>
      <Box component="div" sx={{ flexGrow: '1', flexBasis: '300px', width: '30%' }}>
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
          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <a
                style={{
                  backgroundImage: "none",
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                  width: '100%'
                }}
                href="https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT"
              >
                <div style={{ width: '40%' }}>
                  <CardMedia
                    component="video"
                    height="100%"
                    poster="https://i.ytimg.com/vi/-U5N3237WCw/maxresdefault.jpg"
                    src={`https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT`}
                    frameBorder="0"
                    title="Mãi mãi là của nhau | Bùi Anh Tuấn"
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
                      Mãi mãi là của nhau | Bùi Anh Tuấn
                      adddddddadddddddddddddddddddddddddd
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "13px", }}>
                      Channel name
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
                      500K views <CircleIcon sx={{ fontSize: "12px" }} /> 1
                      years ago
                    </Typography>
                  </CardContent>
                </div>
              </a>
            </CardActionArea>
          </Card>
          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <a
                style={{
                  backgroundImage: "none",
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                  width: '100%'
                }}
                href="https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT"
              >
                <div style={{ width: '40%' }}>
                  <CardMedia
                    component="video"
                    height="100%"
                    poster="https://i.ytimg.com/vi/-U5N3237WCw/maxresdefault.jpg"
                    src={`https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT`}
                    frameBorder="0"
                    title="Mãi mãi là của nhau | Bùi Anh Tuấn"
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
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Mãi mãi là của nhau | Bùi Anh Tuấn
                      adddddddadddddddddddddddddddddddddd
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Channel name
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      500K views <CircleIcon sx={{ fontSize: "12px" }} /> 1
                      years ago
                    </Typography>
                  </CardContent>
                </div>
              </a>
            </CardActionArea>
          </Card>
          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <a
                style={{
                  backgroundImage: "none",
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                  width: '100%'
                }}
                href="https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT"
              >
                <div style={{ width: '40%' }}>
                  <CardMedia
                    component="video"
                    height="100%"
                    poster="https://i.ytimg.com/vi/-U5N3237WCw/maxresdefault.jpg"
                    src={`https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT`}
                    frameBorder="0"
                    title="Mãi mãi là của nhau | Bùi Anh Tuấn"
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
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Mãi mãi là của nhau | Bùi Anh Tuấn
                      adddddddadddddddddddddddddddddddddd
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Channel name
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      500K views <CircleIcon sx={{ fontSize: "12px" }} /> 1
                      years ago
                    </Typography>
                  </CardContent>
                </div>
              </a>
            </CardActionArea>
          </Card>
          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <a
                style={{
                  backgroundImage: "none",
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                  width: '100%'
                }}
                href="https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT"
              >
                <div style={{ width: '40%' }}>
                  <CardMedia
                    component="video"
                    height="100%"
                    poster="https://i.ytimg.com/vi/-U5N3237WCw/maxresdefault.jpg"
                    src={`https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT`}
                    frameBorder="0"
                    title="Mãi mãi là của nhau | Bùi Anh Tuấn"
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
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Mãi mãi là của nhau | Bùi Anh Tuấn
                      adddddddadddddddddddddddddddddddddd
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Channel name
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      500K views <CircleIcon sx={{ fontSize: "12px" }} /> 1
                      years ago
                    </Typography>
                  </CardContent>
                </div>
              </a>
            </CardActionArea>
          </Card>
          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <a
                style={{
                  backgroundImage: "none",
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                  width: '100%'
                }}
                href="https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT"
              >
                <div style={{ width: '40%' }}>
                  <CardMedia
                    component="video"
                    height="100%"
                    poster="https://i.ytimg.com/vi/-U5N3237WCw/maxresdefault.jpg"
                    src={`https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT`}
                    frameBorder="0"
                    title="Mãi mãi là của nhau | Bùi Anh Tuấn"
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
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Mãi mãi là của nhau | Bùi Anh Tuấn
                      adddddddadddddddddddddddddddddddddd
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Channel name
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      500K views <CircleIcon sx={{ fontSize: "12px" }} /> 1
                      years ago
                    </Typography>
                  </CardContent>
                </div>
              </a>
            </CardActionArea>
          </Card>
          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <a
                style={{
                  backgroundImage: "none",
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                  width: '100%'
                }}
                href="https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT"
              >
                <div style={{ width: '40%' }}>
                  <CardMedia
                    component="video"
                    height="100%"
                    poster="https://i.ytimg.com/vi/-U5N3237WCw/maxresdefault.jpg"
                    src={`https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT`}
                    frameBorder="0"
                    title="Mãi mãi là của nhau | Bùi Anh Tuấn"
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
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Mãi mãi là của nhau | Bùi Anh Tuấn
                      adddddddadddddddddddddddddddddddddd
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Channel name
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      500K views <CircleIcon sx={{ fontSize: "12px" }} /> 1
                      years ago
                    </Typography>
                  </CardContent>
                </div>
              </a>
            </CardActionArea>
          </Card>
          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <a
                style={{
                  backgroundImage: "none",
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                  width: '100%'
                }}
                href="https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT"
              >
                <div style={{ width: '40%' }}>
                  <CardMedia
                    component="video"
                    height="100%"
                    poster="https://i.ytimg.com/vi/-U5N3237WCw/maxresdefault.jpg"
                    src={`https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT`}
                    frameBorder="0"
                    title="Mãi mãi là của nhau | Bùi Anh Tuấn"
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
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Mãi mãi là của nhau | Bùi Anh Tuấn
                      adddddddadddddddddddddddddddddddddd
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Channel name
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      500K views <CircleIcon sx={{ fontSize: "12px" }} /> 1
                      years ago
                    </Typography>
                  </CardContent>
                </div>
              </a>
            </CardActionArea>
          </Card>
          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <a
                style={{
                  backgroundImage: "none",
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                  width: '100%'
                }}
                href="https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT"
              >
                <div style={{ width: '40%' }}>
                  <CardMedia
                    component="video"
                    height="100%"
                    poster="https://i.ytimg.com/vi/-U5N3237WCw/maxresdefault.jpg"
                    src={`https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT`}
                    frameBorder="0"
                    title="Mãi mãi là của nhau | Bùi Anh Tuấn"
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
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Mãi mãi là của nhau | Bùi Anh Tuấn
                      adddddddadddddddddddddddddddddddddd
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Channel name
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      500K views <CircleIcon sx={{ fontSize: "12px" }} /> 1
                      years ago
                    </Typography>
                  </CardContent>
                </div>
              </a>
            </CardActionArea>
          </Card>
          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <a
                style={{
                  backgroundImage: "none",
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                  width: '100%'
                }}
                href="https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT"
              >
                <div style={{ width: '40%' }}>
                  <CardMedia
                    component="video"
                    height="100%"
                    poster="https://i.ytimg.com/vi/-U5N3237WCw/maxresdefault.jpg"
                    src={`https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT`}
                    frameBorder="0"
                    title="Mãi mãi là của nhau | Bùi Anh Tuấn"
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
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Mãi mãi là của nhau | Bùi Anh Tuấn
                      adddddddadddddddddddddddddddddddddd
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Channel name
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      500K views <CircleIcon sx={{ fontSize: "12px" }} /> 1
                      years ago
                    </Typography>
                  </CardContent>
                </div>
              </a>
            </CardActionArea>
          </Card>
          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <a
                style={{
                  backgroundImage: "none",
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                  width: '100%'
                }}
                href="https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT"
              >
                <div style={{ width: '40%' }}>
                  <CardMedia
                    component="video"
                    height="100%"
                    poster="https://i.ytimg.com/vi/-U5N3237WCw/maxresdefault.jpg"
                    src={`https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT`}
                    frameBorder="0"
                    title="Mãi mãi là của nhau | Bùi Anh Tuấn"
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
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Mãi mãi là của nhau | Bùi Anh Tuấn
                      adddddddadddddddddddddddddddddddddd
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Channel name
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      500K views <CircleIcon sx={{ fontSize: "12px" }} /> 1
                      years ago
                    </Typography>
                  </CardContent>
                </div>
              </a>
            </CardActionArea>
          </Card>
          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <a
                style={{
                  backgroundImage: "none",
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                  width: '100%'
                }}
                href="https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT"
              >
                <div style={{ width: '40%' }}>
                  <CardMedia
                    component="video"
                    height="100%"
                    poster="https://i.ytimg.com/vi/-U5N3237WCw/maxresdefault.jpg"
                    src={`https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT`}
                    frameBorder="0"
                    title="Mãi mãi là của nhau | Bùi Anh Tuấn"
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
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Mãi mãi là của nhau | Bùi Anh Tuấn
                      adddddddadddddddddddddddddddddddddd
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Channel name
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      500K views <CircleIcon sx={{ fontSize: "12px" }} /> 1
                      years ago
                    </Typography>
                  </CardContent>
                </div>
              </a>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
    </div>
  );
}

export default VideoDetail;
