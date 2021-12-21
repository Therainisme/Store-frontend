import { Card } from 'antd';
import { List, Typography, Divider, Button } from 'antd';

const { Text, Link } = Typography;

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

export default function IndentList() {
    return (
        <div className="site-card-border-less-wrapper">
            <Card title="创建于 2021年12月21日" bordered={false} extra={<Button type="primary" >删除</Button>}>
                <>
                    <List
                        bordered
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <Text>
                                    <Typography.Text mark>[已支付]
                                    </Typography.Text>
                                    <Text>这里肯定是商品名称了</Text>
                                    <Text type="secondary">这里肯定是商品数量了</Text>
                                </Text>

                                <Text type="strong">￥ 250.00</Text>

                            </List.Item>
                        )}
                    />
                </>
            </Card>
            <Card title="创建于 2021年12月21日" bordered={false} extra={<Button type="primary" >删除</Button>}>
                <List
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Text>
                                <Typography.Text mark>[已支付]
                                </Typography.Text>
                                <Text>这里肯定是商品名称了</Text>
                                <Text type="secondary">这里肯定是商品数量了</Text>
                            </Text>

                            <Text type="strong">￥ 250.00</Text>

                        </List.Item>
                    )}
                />
            </Card>
        </div>
    )
}