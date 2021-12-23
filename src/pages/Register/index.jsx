import { useState } from 'react';
import { Input, Space, Button, message, Result } from 'antd';
import { Link } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function Register({ isLogin, setIsLogin }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [rpassword, setRpassword] = useState("");

    function handleInput(field) {
        return (e) => {
            const data = e.target.value;
            switch (field) {
                case "userName": setUserName(data);
                    break;
                case "password": setPassword(data);
                    break;
                case "rpassword": setRpassword(data);
                    break;
            }
        }
    }

    async function handleRegister() {
        if (password !== rpassword) {
            message.warn("两次密码输入不一致");
            return
        }
        const { data: response } = await axios.post("/api/user/register", {
            name: userName, password
        })
        if (response.code < 0) {
            message.error("注册失败");
            return
        }
        localStorage.setItem("token", response.data.token);
        setIsLogin(true);
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
            <Space direction="vertical">
                <Input placeholder="用户名" onChange={handleInput("userName")} />
                <Input.Password
                    placeholder="密码"
                    onChange={handleInput("password")}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                <Input.Password
                    placeholder="重复输入一次密码"
                    onChange={handleInput("rpassword")}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                <span>
                    <Button type="primary" onClick={handleRegister}>注册</Button> &nbsp;
                    <Link to="/login">已有帐号？点击登陆</Link>
                </span>
            </Space>
        )
}