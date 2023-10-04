import { Container } from "@mui/material";
import Header from "./Components/ResponsiveDrawer/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {

    return (
        <div className="App">
            <Header />
            <Outlet />
        </div>
    )
}