import { useEffect, useState } from "react";
import { Card, Avatar, message } from 'antd';
import styles from './index.module.css';
import { ShoppingCartOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from "axios";

const { Meta } = Card;

const list = [
    {
        id: 1,
        cover: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        name: "商品名称",
        description: "描述描述描述描述描述描述描述描述",
        price: "250"
    },
]

export default function CommodityList() {
    const [commodityList, setCommodityList] = useState([]);

    useEffect(() => {
        (async function () {
            const { data: response } = await axios.get("/api/commodity/list?page=0");
            const { data, code, msg } = response;
            if (code === 0) {
                console.log(data);
                setCommodityList(data)
            }
        }())
    }, []);

    function addToCart(commodityId) {
        return async () => {
            // 获取商品详细信息
            const {data: commodityResponse} = await axios.post(`/api/commodity/detail?id=${commodityId}`)
            if (commodityResponse.code === -1) {
                message.error("添加失败");
                return;
            }
            const commodityString = JSON.stringify(commodityResponse.data)
            console.log(commodityString);
            // todo
        }
    }

    return (
        <>
            <div className={styles.container}>
                {
                    commodityList.map(x => {
                        return (
                            <Card
                                key={x.id}
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        height={250}
                                        alt="example"
                                        src={x.cover}
                                    />
                                }
                                actions={[
                                    <ShoppingCartOutlined onClick={addToCart(x.id)} />
                                ]}
                            >
                                <Meta
                                    title={x.name}
                                />
                                <Meta
                                    title=" "
                                    description={x.description}
                                />
                                <Meta
                                    title=" "
                                    description={"￥ " + x.price}
                                />
                            </Card>
                        )
                    })
                }
            </div>
        </>
    )
}