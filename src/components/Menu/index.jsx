import { useState } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Button, message } from 'antd';
import { MailOutlined, LoginOutlined, ShoppingCartOutlined, UnorderedListOutlined, InfoCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect } from 'react';

function MyMenu({ isLogin, setIsLogin }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [current, setCurrent] = useState("index");

    useEffect(() => {
        const {pathname} = location;
        if (pathname === "/") setCurrent("index")
        if (pathname === "/cart") setCurrent("cart")
        if (pathname === "/indent") setCurrent("/indent")
        if (pathname === "/info") setCurrent("info")
        if (pathname === "/login") setCurrent("/login")
    });

    async function handleClick(e) {
        setCurrent(e.key)
        if (e.key === "cart" || e.key === "indent" || e.key === "info") {
            if (localStorage.getItem("token") === null) {
                setIsLogin(false);
                message.error("未登录，请先登陆")
                setCurrent("login")
                navigate("/login")
            } else {
                const token = localStorage.getItem("token");
                const { data: response } = await axios.get(`/api/user/checkToken?token=${token}`);
                if (response.code === -100) {
                    setIsLogin(false);
                    setCurrent("login")
                    navigate("/login")
                }
            }
        }
    }

    function handleLogout() {
        localStorage.removeItem("token")
        setIsLogin(false)
    }

    return (
        <>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="index" icon={<MailOutlined />}>
                    <Link to="/">首页</Link>
                </Menu.Item>
                <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
                    <Link to="/cart">购物车</Link>
                </Menu.Item>
                <Menu.Item key="indent" icon={<UnorderedListOutlined />}>
                    <Link to="/indent">订单</Link>
                </Menu.Item>
                <Menu.Item key="info" icon={<InfoCircleOutlined />}>
                    <Link to="/info">个人中心</Link>
                </Menu.Item>
                <Menu.Item key="login" icon={<LoginOutlined />} onClick={handleLogout}>
                    <Link to="/login">{isLogin ? "登出" : "服务"}</Link>
                </Menu.Item>
            </Menu>
        </>
    )
}

export default MyMenu;