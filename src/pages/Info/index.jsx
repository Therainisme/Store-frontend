import { useState } from 'react';
import { Descriptions, Badge, Modal, Input } from 'antd';
import styles from "./index.module.css";

export default function Info() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fieldName, setFieldName] = useState("");
    const [fieldOldValue, setFieldOldValue] = useState("");

    const showModal = ([clickFieldName, clickFieldKey]) => {
        return (e) => {
            setIsModalVisible(true);
            console.log("WDNMD")
            setFieldName(clickFieldName)
            setFieldOldValue(e.target.innerText)
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>

            <Descriptions title="欢迎您" bordered>
                <Descriptions.Item label="用户名" onClick={showModal} >
                    <span onDoubleClick={showModal(["用户名", "userName"])} className={styles.fieldValue}>
                        Wei Junyu
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="性别">
                    <span onDoubleClick={showModal(["性别", "sex"])} className={styles.fieldValue}>
                        男
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="年龄">
                    <span onDoubleClick={showModal(["年龄", "age"])} className={styles.fieldValue}>
                        20
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="生日">
                    <span onDoubleClick={showModal(["生日", "birthday"])} className={styles.fieldValue}>
                        2018-04-24 18:00:00
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="用户描述" span={2}>
                    <span onDoubleClick={showModal(["用户描述", "description"])} className={styles.fieldValue}>
                        这里是用户的描述
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                    <Badge status="processing" text="已认证" />
                </Descriptions.Item>
                <Descriptions.Item label="名">
                    <span onDoubleClick={showModal(["名", "firstName"])} className={styles.fieldValue}>
                        Junyu
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="姓">
                    <span onDoubleClick={showModal(["姓", "lastName"])} className={styles.fieldValue}>
                        Wei
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="手机号">
                    <span onDoubleClick={showModal(["手机号", "phone"])} className={styles.fieldValue}>
                        17687647640
                    </span>
                </Descriptions.Item>
            </Descriptions>
            <Modal title="修改信息" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>请输入新的{fieldName}</p>
                <Input disabled placeholder="Basic usage" value={fieldOldValue} />
                <Input placeholder="Basic usage" value={"newvalue"} />
            </Modal>
        </>
    )
}