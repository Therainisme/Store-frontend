import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"
import CommodityList from "./pages/CommodityList";
import MyMenu from "./components/Menu";
import Cart from "./pages/Cart";
import IndentList from "./pages/IndentList";
import Info from "./pages/Info";
import ServiceContainer from "./components/ServiceContainer";
import { useState } from 'react';
import { Skeleton } from 'antd';

export default function App() {
    const [isLogin, setIsLogin] = useState(() => {
        const token = localStorage.getItem("token");
        return !(token === null)
    });

    const [loading, setLoading] = useState(true);

    return (
        <>
            <MyMenu isLogin={isLogin} setIsLogin={setIsLogin} />
            {loading ? <Skeleton active /> : ""}
            <span style={loading ? { visibility: "hidden" } : {}}>
                <Routes>
                    <Route path="/" element={<CommodityList setLoading={setLoading}/>} />
                    <Route path="/cart" element={<Cart setLoading={setLoading} />} />
                    <Route path="/indent" element={<IndentList setLoading={setLoading} />} />
                    <Route path="/info" element={<Info setLoading={setLoading} />} />
                    <Route path="/login" element={
                        <ServiceContainer>
                            <Login isLogin={isLogin} setIsLogin={setIsLogin} />
                        </ServiceContainer>
                    } />
                    <Route path="/register" element={
                        <ServiceContainer>
                            <Register isLogin={isLogin} setIsLogin={setIsLogin} />
                        </ServiceContainer>
                    } />
                </Routes>
            </span>
        </>
    );
}