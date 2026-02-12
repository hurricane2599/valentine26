import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./globals.css";
import LenisScroll from "./components/LenisScroll";

export default function App() {
    return (
        <>
            <LenisScroll />
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </>
    );
}