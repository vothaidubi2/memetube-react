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
import VideoAPI from "../../utils/VideoAPI";
import numeral from "numeral";
import DateConvert from "../../utils/DayConvert";

function RecommendVideos() {
    //number formatter
    const NumberFormatter = ({ value }) => {
        const formattedValue = numeral(value).format('0.0a');
        return <>{formattedValue}</>;
    };

    const videoRef = useRef(null);
    const [controlsVisible, setControlsVisible] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current); // Clear any existing timeout
        timeoutRef.current = setTimeout(() => {
            setControlsVisible(true);
            videoRef.current.play();
        }, 500); // Delay of 1 second (1000 milliseconds)
    };

    const handleMouseLeave = () => {
        setControlsVisible(false);
        clearTimeout(timeoutRef.current); // Clear any existing timeout
        videoRef.current.pause();
    };

    //fetch api
    const [videosList, setVideosList] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            const data = await VideoAPI.getallData("/listvideo");
            setVideosList(data);
            console.log(data)
        };

        return () => {
            fetchResults();
            clearTimeout(timeoutRef.current); // Cleanup timeout on component unmount
        };
    }, []);

    return (
        <div className="re-videos">
            <Box
                component="div"
                sx={{
                    margin: "10px 25px 0 25px"
                }}
            >
                <Typography paragraph sx={{ fontSize: '24px', fontWeight: "600" }}>
                    Recommended
                </Typography>
                <Box
                    component="div"
                    sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between' }}
                >
                    {(videosList.map((item, key) => {
                        return (
                            <Card sx={{ borderRadius: '10px', minWidth: '150px', width: '380px', maxWidth: '450px' }} key={key}>
                                <CardActionArea>
                                    <Link to={`/watch?id=${item.idvideo}`} style={{ textDecoration: 'none', color: 'white' }} >
                                        <CardMedia
                                            component="video"
                                            src={item.videourl}
                                            title={item.title}
                                            width={'100%'}
                                            sx={{objectFit:'cover',maxHeight:'200px'}}
                                            ref={videoRef}
                                            frameBorder={'0'}
                                            poster={item.imageurl}
                                        // onMouseEnter={handleMouseEnter}
                                        // onMouseLeave={handleMouseLeave}
                                        // controls={controlsVisible}
                                        />
                                        <CardContent >
                                            <Typography gutterBottom variant="h6" component="div" sx={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.channel.channelname}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                {(item.viewcount >= 1000 ? <NumberFormatter value={item.viewcount} /> : item.viewcount)} Views<CircleIcon sx={{ fontSize: '12px' }} /> <DateConvert date={item.datecreated} />
                                            </Typography>
                                        </CardContent>
                                    </Link>
                                </CardActionArea>
                            </Card>
                        )
                    }))}
                </Box>
            </Box>
        </div >
    )
}

export default RecommendVideos;