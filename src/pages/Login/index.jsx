import { useState } from 'react';
import { Input, Space, Button, message, Result } from 'antd';
import { Link } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';
import styles from "./index.module.css";

export default function Login({ isLogin, setIsLogin }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function handleInput(field) {
        return (e) => {
            const data = e.target.value;
            switch (field) {
                case "userName": setUserName(data);
                    break;
                case "password": setPassword(data);
                    break;
            }
        }
    }

    async function handleLogin() {
        const { data: response } = await axios.post("/api/user/login", {
            name: userName,
            password
        })
        if (response.code === -1) {
            message.error('登陆失败');
        } else {
            localStorage.setItem("token", response.data.token)
            setIsLogin(true);
            message.info('登陆成功');
        }
    }

    return isLogin
        ? (
            <Result
                icon={<SmileOutlined />}
                title="太好了！你已经登陆了自己的账户！"
                extra={
                    <Link to="/">
                        <Button type="primary">返回首页</Button>
                    </Link>
                }
            />
        )
        : (
            <Space direction="vertical" >
                <Input placeholder="用户名" onChange={handleInput("userName")} />
                <Input.Password
                    placeholder="密码"
                    onChange={handleInput("password")}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                <span>
                    <Button type="primary" onClick={handleLogin}>登陆</Button> &nbsp;
                    <Link to="/register">没有帐号？点击注册</Link>
                </span>
            </Space>
        )
}