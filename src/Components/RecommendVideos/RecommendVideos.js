import React, { useEffect, useRef, useState } from "react";
import './RecommendVideos.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

function RecommendVideos() {
    // const videoRef = useRef(null);
    // const [controlsVisible, setControlsVisible] = useState(false);
    // let timeout;

    // const handleMouseEnter = () => {
    //     timeout = setTimeout(function () {
    //         videoRef.current.pause();
    //         setControlsVisible(true);
    //         videoRef.current.play();
    //     }, 1000); // Delay of 1 second (1000 milliseconds)
    // };

    // const handleMouseLeave = () => {
    //     setControlsVisible(false);
    //     clearTimeout(timeout); // Clear any existing timeout
    //     videoRef.current.pause();
    // };
    return (
        <div className="re-videos">
            <Box
                component="div"
                sx={{ margin: "10px 25px 0 25px" }}
            >
                <Typography paragraph sx={{ fontSize: '24px', fontWeight: "600" }}>
                    Recommended
                </Typography>
                <Box
                    component="div"
                    sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between' }}
                >
                    <Card sx={{ borderRadius: '10px', minWidth: '150px', width: '380px', maxWidth: '450px' }}>
                        <CardActionArea>
                            <Link to={'/watch'} style={{ textDecoration: 'none', color: 'white' }} href="https://drive.google.com/file/d/17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT/view">
                                <CardMedia
                                    component="video"
                                    maxHeight="200"
                                    src="https://drive.google.com/uc?id=17slrOe2qbsZEKGPrlNm3_PnP_QEtM3jT"
                                    title="Mãi mãi là của nhau | Bùi Anh Tuấn"
                                    width={'100%'}
                                    // ref={videoRef}
                                    muted
                                    poster="https://i.ytimg.com/vi/-U5N3237WCw/maxresdefault.jpg"
                                    // onMouseEnter={handleMouseEnter}
                                    // onMouseLeave={handleMouseLeave}
                                    // controls={controlsVisible}
                                />
                                <CardContent >
                                    <Typography gutterBottom variant="h6" component="div" sx={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        Mãi mãi là của nhau | Bùi Anh Tuấn
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Channel name
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        500K views <CircleIcon sx={{ fontSize: '12px' }} /> 1 years ago
                                    </Typography>
                                </CardContent>
                            </Link>
                        </CardActionArea>
                    </Card>

                </Box>
            </Box>
        </div >
    )
}

export default RecommendVideos;