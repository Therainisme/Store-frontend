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

export default function App() {
    const [isLogin, setIsLogin] = useState(() => {
        const token = localStorage.getItem("token");
        return !(token === null)
    });

    return (
        <>
        
            <MyMenu isLogin={isLogin} setIsLogin={setIsLogin}/>
            <Routes>
                <Route path="/" element={<CommodityList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/indent" element={<IndentList />} />
                <Route path="/info" element={<Info />} />
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
        </>
    );
}