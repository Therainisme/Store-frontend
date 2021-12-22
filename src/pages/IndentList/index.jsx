import { useState, useEffect } from 'react';
import { Card } from 'antd';
import { List, Typography, Divider, Button, message } from 'antd';
import axios from 'axios';

const { Text, Link } = Typography;

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

export default function IndentList() {
    const [indentList, setIndentList] = useState([]);

    useEffect(() => {
        reloadIndentList()
    }, [])

    async function reloadIndentList() {
        const { data: response } = await axios.get("/api/indent", {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        if (response.code < 0) {
            message.error("获取订单数据失败")
        }
        const newIndentList = response.data.map(x => {
            return {
                ...x,
                commodities: JSON.parse(x.commodities)
            }
        })
        console.log(newIndentList);
        setIndentList(newIndentList)
    }

    function handleOnClickIndent(indentId) {
        return async () => {
            console.log(indentId);
        }
    }


    return (
        <div className="site-card-border-less-wrapper">
            {indentList.map(x => (
                <Card title={`创建于 ${new Date(x.createTime).toLocaleString()}`} bordered={false} key={x.id} extra={
                    <Button type="primary" onClick={handleOnClickIndent(x.id)}>删除</Button>
                }>
                    <>
                        <List
                            bordered
                            dataSource={x.commodities}
                            renderItem={item => (
                                <List.Item>
                                    <Text>
                                        <Typography.Text mark>[已支付] 
                                        </Typography.Text>
                                        <Text>&nbsp;&nbsp;{item.name}&nbsp;&nbsp;</Text>
                                        <Text type="secondary">{item.description}</Text>
                                    </Text>

                                    <Text type="strong">￥ {item.price}</Text>

                                </List.Item>
                            )}
                        />
                    </>
                </Card>
            ))}
        </div>
    )
}