import { Card, Avatar } from 'antd';
import styles from './index.module.css';
import { ShoppingCartOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default function CommodityList() {

    return (
        <>
            <div className={styles.container}>
                <Card
                    style={{ width: 300 }}
                    cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                    actions={[
                        <ShoppingCartOutlined />
                    ]}
                >
                    <Meta
                        title="商品名称"
                    />
                    <Meta
                        title=" "
                        description="描述描述描述描述描述描述描述描述"
                    />
                    <Meta
                        title=" "
                        description="￥ 250"
                    />
                </Card>
                <Card
                    style={{ width: 300 }}
                    cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                    actions={[
                        <ShoppingCartOutlined />
                    ]}
                >
                    <Meta
                        title="商品名称"
                    />
                    <Meta
                        title=" "
                        description="描述描述描述描述描述描述描述描述"
                    />
                    <Meta
                        title=" "
                        description="￥ 250"
                    />
                </Card>
            </div>
        </>
    )
}