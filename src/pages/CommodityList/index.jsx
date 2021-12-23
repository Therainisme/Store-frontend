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
            // 获取用户的购物车 id
            const { data: response } = await axios.get("/api/user/cart", {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            if (response.code < 0) {
                message.error("添加失败");
                return;
            }
            const cartId = response.data.id;
            const commodityList = JSON.parse(response.data.commodities);
            let theNum = 0;
            commodityList.forEach(x => {
                if (x.id === commodityId) theNum = x.num;
            })
            // 添加
            const { data: addResponse } = await axios.post("/api/cart/add", {
                commodityId, cartId, num: 1
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            if (addResponse < 0) {
                message.error("添加失败")
                return;
            } else {
                message.info("添加成功")
            }
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
                                style={{ width: 300, marginTop: "10px" }}
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