import { useEffect, useState } from "react";
import { Card, Avatar, message } from 'antd';
import styles from './index.module.css';
import { ShoppingCartOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

export default function CommodityList({setLoading}) {
    const [commodityList, setCommodityList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async function () {
            setLoading(true)
            const { data: response } = await axios.get("/api/commodity/list?page=0");
            const { data, code, msg } = response;
            if (code === 0) {
                console.log(data);
                setCommodityList(data)
            }
            setLoading(false)
        }())
    }, []);

    function addToCart(commodityId) {
        return async () => {
            if (localStorage.getItem("token") === null) {
                message.info("请先登陆");
                navigate("/login");
                return
            } else {
                const token = localStorage.getItem("token");
                const { data: response } = await axios.get(`/api/user/checkToken?token=${token}`);
                if (response.code === -100) {
                    message.info("请先登陆");
                    navigate("/login")
                    return
                }
            }

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
                                className={styles.card}
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