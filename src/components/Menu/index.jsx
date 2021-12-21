import { useState } from 'react'
import { Link } from "react-router-dom";
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

export default function MyMenu() {
    const [current, setCurrent] = useState();

    function handleClick(e) {
        setCurrent(e.key)
    }

    return (
        <>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="index" icon={<MailOutlined />}>
                    <Link to="/">首页</Link>
                </Menu.Item>
                <Menu.Item key="cart" icon={<AppstoreOutlined />}>
                    <Link to="/cart">购物车</Link>
                </Menu.Item>
                <Menu.Item key="indent" icon={<AppstoreOutlined />}>
                    <Link to="/indent">订单</Link>
                </Menu.Item>
                <Menu.Item key="info" icon={<AppstoreOutlined />}>
                    <Link to="/info">个人中心</Link>
                </Menu.Item>
                <Menu.Item key="login" icon={<AppstoreOutlined />}>
                    <Link to="/login">服务</Link>
                </Menu.Item>
            </Menu>
        </>
    )
}