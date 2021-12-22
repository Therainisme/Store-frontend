import { useState } from 'react'
import { Link } from "react-router-dom";
import { Menu, Button } from 'antd';
import { MailOutlined, LoginOutlined, ShoppingCartOutlined, UnorderedListOutlined, InfoCircleOutlined } from '@ant-design/icons';

export default function MyMenu({isLogin, setIsLogin}) {
    const [current, setCurrent] = useState();

    function handleClick(e) {
        setCurrent(e.key)
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