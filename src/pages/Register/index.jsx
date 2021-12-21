import { useState } from 'react';
import { Input, Space, Button } from 'antd';
import { Link } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export default function Login() {
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
    
    function handleRegister() {
        console.log(userName, password, rpassword)
    }

    return (
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
            <Button type="primary" onClick={handleRegister}>注册</Button>
            <Link to="/login">已有帐号？点击登陆</Link>
        </Space>
    )
}