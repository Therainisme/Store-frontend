import { useState, useEffect } from 'react';
import { List, Avatar, Button, Skeleton, message, Result } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Cart({setLoading}) {
    const [cartList, setCartList] = useState([]);
    const [cartId, setCartId] = useState("");

    useEffect(() => {
        updateCartList()
    }, []);

    async function updateCartList() {
        setLoading(true)
        const { data: response } = await axios.get("/api/user/cart", {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        if (response.code < 0) {
            message.error(`获取购物车列表失败：${response.msg}`)
            setLoading(false)
            return
        }
        setCartId(response.data.id)
        setCartList(JSON.parse(response.data.commodities))
        setLoading(false)
    }


    async function handleCreateIndent() {
        const { data: response } = await axios.post("/api/indent/create", {
            commodities: cartList
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        if (response.code < 0) {
            message.error("创建订单失败")
            return
        }
        const { data: removeCartResponse } = await axios.post("/api/cart/removeAll", {
            cartId
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        if (response.code < 0) {
            message.error("清空购物车失败");
            return;
        }
        message.info("创建订单成功")
        updateCartList();
    }

    function removeFromCart(itemId) {
        return async () => {
            const { data: response } = await axios.get("/api/user/cart", {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            if (response.code < 0) {
                message.error(`移除商品失败`)
                return
            }
            const { data: removeResponse } = await axios.post("/api/cart/delete", {
                cartId: response.data.id,
                commodityId: itemId
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            if (removeResponse.code < 0) {
                message.error(`移除商品失败`)
                return
            }
            message.info("移除商品成功")
            updateCartList()
        }
    }

    return cartList.length > 0 ? (
        <>
            <List
                itemLayout="horizontal"
                dataSource={cartList}
                renderItem={item => (
                    <List.Item style={{margin: "10px"}}>
                        <List.Item.Meta
                            avatar={<Avatar shape="square" size={100} src={item.cover} />}
                            title={<a href="https://ant.design">{item.name}</a>}
                            description={
                                <>{item.description} <br /> 数量： {item.num} <br /> ￥ {item.price}</>
                            }
                        />
                        <List.Item
                            actions={[
                                <a key={`remove${item.id}`} onClick={removeFromCart(item.id)}>移出购物车</a>
                            ]}
                        ></List.Item>
                    </List.Item>
                )}
            />
            <Button type="primary" onClick={handleCreateIndent} style={{margin: "10px"}}>创建订单</Button>
        </>)
        :
        <Result
            title="快去商品页寻找你喜欢的商品吧！"
            extra={
                <Button type="primary" key="console">
                    <Link to="/">去购物</Link>
                </Button>
            }
        />
}