import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"
import CommodityList from "./pages/CommodityList";
import MyMenu from "./components/Menu";
import Cart from "./pages/Cart";
import IndentList from "./pages/IndentList";
import Info from "./pages/Info";

export default function App() {
    return (
        <>
            <MyMenu />
            <Routes>
                <Route path="/" element={<CommodityList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/indent" element={<IndentList />} />
                <Route path="/info" element={<Info />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
}