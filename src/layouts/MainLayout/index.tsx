import { Outlet } from "react-router-dom";
import { MainLayoutSection } from "./style";
import Navbar from "../../components/Navbar";

export default function MainLayout() {
    return (
        <MainLayoutSection>
            <Navbar />
            <Outlet />
        </MainLayoutSection>
    )
}