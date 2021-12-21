import { Descriptions, Badge } from 'antd';

export default function Info() {
    return (
        <Descriptions title="欢迎您" bordered>
            <Descriptions.Item label="用户名">Wei Junyu</Descriptions.Item>
            <Descriptions.Item label="性别">男</Descriptions.Item>
            <Descriptions.Item label="年龄">20</Descriptions.Item>
            <Descriptions.Item label="生日">2018-04-24 18:00:00</Descriptions.Item>
            <Descriptions.Item label="用户描述" span={2}>
                2019-04-24 18:00:00
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
                <Badge status="processing" text="已认证" />
            </Descriptions.Item>
            <Descriptions.Item label="名">Junyu</Descriptions.Item>
            <Descriptions.Item label="姓">Wei</Descriptions.Item>
            <Descriptions.Item label="手机号">17687647640</Descriptions.Item>
        </Descriptions>
    )
}