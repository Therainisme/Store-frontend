import { List, Avatar, Button, Skeleton } from 'antd';

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
    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar shape="square" size={100} src="https://joeschmoe.io/api/v1/random" />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description={item.description + "\n" + item.price}
                        />
                        <List.Item
                            actions={[<a key="list-loadmore-more">移出购物车</a>]}
                        ></List.Item>
                    </List.Item>
                )}
            />
        </>
    )
}