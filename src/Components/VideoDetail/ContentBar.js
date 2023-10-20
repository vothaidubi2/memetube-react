import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar, Button, TextField, makeStyles } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import RedoIcon from '@mui/icons-material/Redo';
import './ContentBar.scss'
import { Form, Link } from 'react-router-dom';
import numeral from 'numeral';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SortIcon from '@mui/icons-material/Sort';
import DateConvert from '../../utils/DayConvert';
import CircleIcon from '@mui/icons-material/Circle';
import CheckIcon from '@mui/icons-material/Check';
import SubscribeAPI from '../../utils/SubscribeAPI';
import RatingAPI from '../../utils/RatingAPI';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const buttonStyles = styled(IconButton)(({ theme }) => ({
    root: {
        "&:hover": {
            backgroundColor: 'transparent'
        }
    },
}));

export default function ContentBar({ props }) {
    //fetchdata
    const [isSub, setIsSub] = useState(false);
    const [rate, setRate] = useState(null);
    const [countLike, setCountLike] = useState(null);
    const [countDislike, setCountDislike] = useState(null);

    useEffect(() => {
        const fetchSub = async () => {
            try {
                const data = await SubscribeAPI.getOneItem(`/getsubinfo?iduser=2&idchannel=${props.channel.idchannel}`);
                if (data.status == 200) {
                    setIsSub(true)
                }
            } catch (error) {
                if (error.response || error.response.status === 404) {
                    setIsSub(false);
                }
            }
        };
        const fetchRate = async () => {
            try {
                const data = await RatingAPI.getOneItem(`/getratinginfo?iduser=2&idvideo=${props.idvideo}`);
                if (data.status == 200) {
                    setRate(data.data.rate)
                    console.log("rate:", data.data)
                }
            } catch (error) {
                if (error.response || error.response.status === 404) {
                    setRate(null);
                    console.log("error:", error)
                }
            }
        };
        const fetchCountRate = async () => {
            const rateData = await RatingAPI.countRating(`/countrating?idvideo=${props.idvideo}`);
            if (rateData.status == 200) {
                setCountLike(rateData.data.like)
                setCountDislike(rateData.data.dislike)
                console.log("count:", rateData.data)
            }
        };
        return () => {
            fetchSub();
            fetchRate();
            fetchCountRate();
        }
    }, [isSub, rate])

    //change data sub,like/dislike
    const addSub = async () => {
        try {
            const data = await SubscribeAPI.addSub(`/addsub?iduser=2&idchannel=${props.channel.idchannel}`);
            if (data.status == 201) {
                setIsSub(true)
            }
        } catch (error) {
            if (error.response || error.response.status === 400) {
                setIsSub(false);
            }
        }
    }

    const deleteSub = async () => {
        try {
            const data = await SubscribeAPI.deleteSub(`/deletesub?iduser=2&idchannel=${props.channel.idchannel}`);
            if (data.status == 200) {
                setIsSub(false)
            }
        } catch (error) {

        }
    }

    const modifyRate = async (inputRate) => {
        if(rate != null){
            try {
                const data = await RatingAPI.updateRate(`/updaterate?iduser=2&idvideo=${props.idvideo}&rate=${inputRate}`);
                if (data.status == 200) {
                    setRate(inputRate)
                }
            } catch (error) {
                if (error.response || error.response.status === 400) {
                    setRate(null)
                }
            }
        }else{
            try {
                const data = await RatingAPI.addRate(`/addrate?iduser=2&idvideo=${props.idvideo}&rate=${inputRate}`);
                if (data.status == 201) {
                    setRate(inputRate)
                }
            } catch (error) {
                if (error.response || error.response.status === 400) {
                    setRate(null)
                }
            }
        }
    }

    const deleteRate = async () => {
        try {
            const data = await RatingAPI.deleteRate(`/deleterate?iduser=2&idvideo=${props.idvideo}`);
            if (data.status == 200) {
                setRate(null)
            }
        } catch (error) {

        }
    }

    //layout
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const NumberFormatter = ({ value }) => {
        const formattedValue = numeral(value).format('0.0a');
        return <Typography sx={{ textTransform: 'uppercase' }}>{formattedValue} </Typography>;
    };

    //tabs
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    //comments
    const [anchorOrder, setAnchorOrder] = React.useState(null);
    const openMenuComment = Boolean(anchorOrder);
    const handleClick = (event) => {
        setAnchorOrder(event.currentTarget);
    };
    const closeMenuComment = () => {
        setAnchorOrder(null);
    };

    const menuId = 'primary-search-account-menu';

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <buttonStyles sx={{ '& :hover': { background: 'none' } }} size="large" aria-label="show 4 new mails" color="inherit">
                    <Button component="label" variant="secondary" sx={{ color: 'white', border: '1px solid #aaa', borderRadius: '15px 0 0 15px' }} startIcon={<ThumbUpIcon />}>
                        Like
                    </Button>
                    <Button component="label" variant="secondary" sx={{ color: 'white', borderRadius: '0 15px 15px 0', border: '1px solid #aaa' }} startIcon={<ThumbDownIcon />}>
                        Dislike
                    </Button>
                </buttonStyles>
            </MenuItem>
            <MenuItem>
                <buttonStyles
                    size="large"
                    color="inherit"
                >
                    <Button sx={{ color: 'white', border: '1px solid #aaa', borderRadius: "15px" }} variant="secondary" startIcon={<RedoIcon />}>Share</Button>
                </buttonStyles>
            </MenuItem>
        </Menu>
    );
    return (

        <Box sx={{ flexGrow: 1, }}>
            <AppBar position="static" sx={{ backgroundImage: 'none', boxShadow: 'none' }}>
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: '10px' }}
                        >
                            <Link>
                                <img src="https://as2.ftcdn.net/v2/jpg/02/08/98/05/1000_F_208980504_njS12KTuZLQ3wQZaHLbKpSLFNu9rF6Hs.jpg" width={'40'} style={{ borderRadius: '50%' }}></img>
                            </Link>
                            <Link style={{ color: 'white', textDecoration: 'none' }}>
                                <Typography noWrap
                                    component="div">
                                    <h4>{props?.channel?.channelname}</h4>
                                    <h6 style={{ fontWeight: '100', color: '#aaa' }}>6 Subscriber</h6>
                                </Typography>
                            </Link>
                        </Typography>
                        <buttonStyles
                            size="large"
                            color="inherit"
                        >
                            {isSub ? <Button onClick={deleteSub} sx={{ color: 'white', border: '1px solid #aaa', borderRadius: "15px" }} variant="secondary" ><CheckIcon />Subscribed</Button>
                                : <Button onClick={addSub} sx={{ color: 'white', border: '1px solid #aaa', borderRadius: "15px" }} variant="secondary" >Subscribe</Button>}
                        </buttonStyles>
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '10px' }}>
                        <buttonStyles sx={{ '& :hover': { background: 'none' } }} size="large" aria-label="show 4 new mails" color="inherit">
                            {rate != null && rate ?
                                <Button onClick={()=>deleteRate()} component="label" variant="secondary" sx={{ color: '#90CAF9', border: '1px solid #aaa', borderRadius: '15px 0 0 15px' }} startIcon={<ThumbUpIcon />}>
                                    {countLike < 1000 ? countLike : <NumberFormatter value={countLike} />}
                                </Button> :
                                <Button onClick={()=>modifyRate(true)} component="label" variant="secondary" sx={{ color: 'white', border: '1px solid #aaa', borderRadius: '15px 0 0 15px' }} startIcon={<ThumbUpIcon />}>
                                    {countLike < 1000 ? countLike : <NumberFormatter value={countLike} />}
                                </Button>
                            }
                            {rate != null && rate == false ?
                                <Button onClick={()=>deleteRate()} component="label" variant="secondary" sx={{ color: '#90CAF9', borderRadius: '0 15px 15px 0', border: '1px solid #aaa' }} startIcon={<ThumbDownIcon />}>
                                    {countDislike < 1000 ? countDislike : <NumberFormatter value={countDislike} />}
                                </Button>
                                :
                                <Button onClick={()=>modifyRate(false)} component="label" variant="secondary" sx={{ color: 'white', borderRadius: '0 15px 15px 0', border: '1px solid #aaa' }} startIcon={<ThumbDownIcon />}>
                                    {countDislike < 1000 ? countDislike : <NumberFormatter value={countDislike} />}
                                </Button>

                            }
                        </buttonStyles>
                        <buttonStyles
                            size="large"
                            color="inherit"
                        >
                            <Button sx={{ color: 'white', border: '1px solid #aaa', borderRadius: "15px" }} variant="secondary" startIcon={<RedoIcon />}>Share</Button>
                        </buttonStyles>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList textColor='inherit' indicatorColor='primary' onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Description" value="1" />
                            <Tab label="Comment" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <Typography sx={{ fontSize: '14px', display: 'flex', gap: '5px', alignItems: 'center' }}>
                                {(props.viewcount >= 1000 ? <NumberFormatter value={props.viewcount} /> : props.viewcount)} Views<CircleIcon sx={{ fontSize: '12px' }} /> <DateConvert date={props.datecreated} />
                            </Typography>
                            <Typography sx={{ fontSize: '14px' }}>
                                {props.describes}
                            </Typography>
                        </Box>
                    </TabPanel>
                    <TabPanel value="2">
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Typography component='h6' sx={{ display: 'flex', gap: '5px' }}>
                                    <NumberFormatter value={195131242} /> Comments
                                </Typography>
                                <Box>
                                    <Button
                                        id="demo-positioned-button"
                                        aria-controls={openMenuComment ? 'demo-positioned-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openMenuComment ? 'true' : undefined}
                                        onClick={handleClick}
                                        sx={{ color: 'white' }}
                                    >
                                        <SortIcon /> Sort by
                                    </Button>
                                    <Menu
                                        id="demo-positioned-menu"
                                        aria-labelledby="demo-positioned-button"
                                        anchorEl={anchorOrder}
                                        open={openMenuComment}
                                        onClose={closeMenuComment}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <MenuItem onClick={closeMenuComment}>Newest first</MenuItem>
                                        <MenuItem onClick={closeMenuComment}>Oldest first</MenuItem>
                                    </Menu>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: "15px" }}>
                                <Avatar sx={{ color: 'action.active', my: 0.5 }} src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg" />
                                <TextField sx={{ width: '100%' }} id="input-with-sx" label="Your comment" variant="standard" />
                            </Box>
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>

    );
}
