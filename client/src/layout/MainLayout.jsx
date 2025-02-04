import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar/Sidebar";

export default function MainLayout() {
    return (
        <>
            <SideBar />
            <Outlet />

        </>
    )
}