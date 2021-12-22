import { useState, useEffect } from 'react';
import { List, Avatar, Button, Skeleton, message } from 'antd';
import axios from 'axios';

const data = [
    {
        title: '商品名称',
        description: "这里是商品描述",
        price: "￥ 9.9"
    },
    {
        title: '商品名称',
        description: "这里是商品描述",
        price: "￥ 9.9"
    },
    {
        title: '商品名称',
        description: "这里是商品描述",
        price: "￥ 9.9"
    },
    {
        title: '商品名称',
        description: "这里是商品描述",
        price: "￥ 9.9"
    },
];

export default function Cart() {
    const [cartList, setCartList] = useState([]);

    useEffect(() => {
        updateCartList()
    }, []);

    async function updateCartList() {
        const { data: response } = await axios.get("/api/user/cart", {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        if (response.code < 0) {
            message.error(`获取购物车列表失败：${response.msg}`)
            return
        }
        setCartList(JSON.parse(response.data.commodities))
        console.log(cartList)
    }

    function removeFromCart(itemId) {
        return async () => {
            console.log(itemId);
        }
    }

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={cartList}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar shape="square" size={100} src={item.cover} />}
                            title={<a href="https://ant.design">{item.name}</a>}
                            description={
                                <>{item.description} <br /> 数量：{"8"} <br /> {item.price}</>
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
            <Button type="primary">创建订单</Button>
        </>
    )
}