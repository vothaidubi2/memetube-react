import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { Box } from "@mui/material";

function SearchPage() {
    return (
        <div className="re-videos" style={{width:'100%',minWidth:'200px'}}>
            {/* <Box
                component="div"
                sx={{ margin: "10px 25px 0 25px"}}
            >
                <Typography paragraph sx={{ fontSize: '24px', fontWeight: "600" }}>
                    Recommended
                </Typography>
                <Box
                    component="div"
                    sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '20px',width:'100%'}}
                >
                    <Card sx={{width:'100%'}}>
                        <CardActionArea >
                            <a style={{backgroundImage:'none',display:"flex", textDecoration:'none' ,color:'white'}} href="https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT">
                                <div style={{flex:'0.3'}}>
                                <CardMedia 
                                component="video"
                                maxHeight="200"
                                poster = "https://i.ytimg.com/vi/-U5N3237WCw/maxresdefault.jpg"
                                src={`https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT`}
                                frameBorder="0"
                                title="Mãi mãi là của nhau | Bùi Anh Tuấn"
                                width={'100%'}
                            />
                                </div>
                                <div style={{flex:'0.7'}}>
                                <CardContent sx={{marginLeft:'30px',minWidth:"50px" ,maxWidth:'700px'}}>
                                    <Typography gutterBottom variant="h6" component="div" sx={{display:'block', whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                    Mãi mãi là của nhau | Bùi Anh Tuấn adddddddadddddddddddddddddddddddddd
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Channel name
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{display:'flex', gap:'10px', alignItems:'center'}}>
                                        500K views <CircleIcon sx={{fontSize:'12px'}}/> 1 years ago
                                    </Typography>
                                </CardContent>
                                </div>
                            </a>
                        </CardActionArea>
                    </Card>
                    
                </Box>
            </Box> */}
            <Box component="div" sx={{padding:'20px 30px 0'}}>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: "10px",
            width: "100%",
            height:'200px'
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
                  width: '100%',
                }}
                href="https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT"
              >
                <div style={{ width: '30%' }}>
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
          </Box>
          </Box>
        </div >
    )
}

export default SearchPage;