import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import './Header.scss';
import { Avatar } from "@mui/material";

function Header2() {
    return (
        <div className="header-page">
            <div className="start">
                <MenuIcon className="menu-icon" />
                <div className="logo">
                    <YouTubeIcon className="logo-icon" />
                    <h1 className="logo-content">MemeTube</h1>
                </div>
            </div>
            <div className="middle">
                <form className="search-input" action="action_page.php">
                    <input className="input-search" type="text" placeholder="Search..." name="search" />
                    <button className="submit-search" type="submit"><SearchIcon /></button>
                </form>
            </div>
            <div className="end">
                <VideoCallIcon className="end-icon"/>
                <NotificationsNoneIcon className="end-icon"/>
                <Avatar src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" alt="" className="avatar"/>
            </div>

        </div>
    )
}

export default Header2;