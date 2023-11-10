import React, { useEffect, useRef, useState } from "react";
import './RecommendVideos.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip, Stack } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import VideoAPI from "../../utils/VideoAPI";
import numeral from "numeral";
import DateConvert from "../../utils/DayConvert";
import CategoryAPI from "../../utils/CategoryAPI";

function RecommendVideos() {
    //number formatter
    const NumberFormatter = ({ value }) => {
        const formattedValue = numeral(value).format('0.0a');
        return <>{formattedValue}</>;
    };

    const videoRef = useRef(null);
    // const [controlsVisible, setControlsVisible] = useState(false);
    // const timeoutRef = useRef(null);

    // const handleMouseEnter = () => {
    //     clearTimeout(timeoutRef.current); // Clear any existing timeout
    //     timeoutRef.current = setTimeout(() => {
    //         setControlsVisible(true);
    //         videoRef.current.play();
    //     }, 500); // Delay of 1 second (1000 milliseconds)
    // };

    // const handleMouseLeave = () => {
    //     setControlsVisible(false);
    //     clearTimeout(timeoutRef.current); // Clear any existing timeout
    //     videoRef.current.pause();
    // };

    //fetch api
    const [videosList, setVideosList] = useState([]);
    const [listCate, setListcate] = useState([]);

    const fetchResults = async () => {
        const data = await VideoAPI.getallData("/listvideo");
        setVideosList(data);
        console.log('this is data',data)
    };
    const fetchsByIdcate = async (cate) => {
        const data = await VideoAPI.getByCate(`/videobycate?cate=${cate}`);
        setVideosList(data);
        console.log(data)
    };
    const fetchCategory = async () => {
        const data = await CategoryAPI.getAll("/getallcate")
        setListcate(data.data);
        console.log("cate: ",data)
    }
    useEffect(() => {
        return(()=>{
            fetchResults();
        fetchCategory();
        })
    }, []);

    return (
        <div className="re-videos">
            <Box
                component="div"
                sx={{
                    margin: "10px 25px 0 25px"
                }}
            >
                <Box sx={{ marginTop: 2 }}>
                    <Stack direction="row" spacing={1} sx={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
                        <Chip onClick={fetchResults} component="button" label="All" sx={{ cursor: 'pointer',padding:'0 5px' }} />
                        {listCate &&( listCate.map((item,key)=>{
                            return(
                                <Chip onClick={()=>fetchsByIdcate(item.idcategory)} component="button" key={key} label={item.name} sx={{ cursor: 'pointer',padding:'0 5px' }} />
                            )
                        }))}
                    </Stack>
                </Box>
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
                                            sx={{ objectFit: 'cover', maxHeight: '200px' }}
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