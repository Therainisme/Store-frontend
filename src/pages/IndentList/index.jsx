import { useState, useEffect } from 'react';
import { Card } from 'antd';
import { List, Typography, Divider, Button, Result, message } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from "./index.module.css";

const { Text } = Typography;

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

export default function IndentList({ setLoading }) {
    const [indentList, setIndentList] = useState([]);

    useEffect(() => {
        reloadIndentList()
    }, [])

    async function reloadIndentList() {
        setLoading(true)
        const { data: response } = await axios.get("/api/indent", {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        if (response.code < 0) {
            message.error(`获取订单数据失败, ${response.msg}`)
            setLoading(false)
            return;
        }
        const newIndentList = response.data.map(x => {
            return {
                ...x,
                commodities: JSON.parse(x.commodities)
            }
        })
        setLoading(false)
        setIndentList(newIndentList)
    }

    function handleOnClickIndent(indentId) {
        return async () => {
            console.log(indentId);
            const { data: response } = await axios.post("/api/indent/cancel", {
                indentId
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            if (response.code < 0) {
                message.error(`取消订单失败 ${response.msg}`)
                return;
            }
            message.info("已取消该订单")
            reloadIndentList()
        }
    }

    function getIndentMoney(commodities) {
        return commodities.reduce((pre, now) => {
            return pre + now.price * now.num;
        }, 0)
    }


    return (
        <div className={`${styles.container} site-card-border-less-wrapper`}>
            {indentList.length > 0 ? indentList.map(x => (
                <Card title={`创建于 ${new Date(x.createTime).toLocaleString()}`} bordered={false} key={x.id} extra={
                    <span>
                        <span>总金额：￥ {getIndentMoney(x.commodities)}</span> &nbsp;&nbsp;&nbsp; 
                        <Button type="primary" onClick={handleOnClickIndent(x.id)} disabled={x.status === 1}>取消该订单</Button>
                    </span>
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

                                    <Text type="strong" className={styles.np}>
                                        <span>数量：{item.num} &nbsp;&nbsp;</span>
                                        <span>￥ {item.price}</span>
                                    </Text>

                                </List.Item>
                            )}
                        />
                    </>
                </Card>
            )) :
                (
                    <Result
                        title="你现在还没有下过单！"
                        extra={
                            <Button type="primary" key="console">
                                <Link to="/">去购物</Link>
                            </Button>
                        }
                    />
                )
            }
        </div>
    )
}