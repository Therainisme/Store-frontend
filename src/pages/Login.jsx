import { useState } from 'react';
import { Input, Space, Button } from 'antd';
import { Link } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function handleInput(field) {
        return (e) => {
            const data = e.target.value;
            switch (field) {
                case "userName": setUserName(data);
                    break;
                case "password": setPassword(password);
                    break;
            }
        }
    }

    function handleLogin() {
        console.log(userName, password);
    }

    return (
        <Space direction="vertical">
            <Input placeholder="用户名" onChange={handleInput("userName")} />
            <Input.Password
                placeholder="密码"
                onChange={handleInput("password")}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            <Button type="primary" onClick={handleLogin}>登陆</Button>
            <Link to="/register">没有帐号？点击注册</Link>
        </Space>
    )
}