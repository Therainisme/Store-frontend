import { useState, useEffect } from 'react';
import { Descriptions, Badge, Modal, Input, message, notification } from 'antd';
import styles from "./index.module.css";
import axios from 'axios';

export default function Info({ setLoading }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fieldName, setFieldName] = useState("");
    const [fieldOldValue, setFieldOldValue] = useState("");
    const [fieldNewValue, setFieldNewValue] = useState("");
    const [fieldClickKey, setFieldClickKey] = useState("");
    const [userInfo, setUserInfo] = useState({})

    function handleFieldNewValueChange(e) {
        setFieldNewValue(e.target.value)
    }

    const showModal = ([clickFieldName, clickFieldKey]) => {
        return (e) => {
            setIsModalVisible(true);
            setFieldName(clickFieldName)
            setFieldOldValue(e.target.innerText)
            setFieldClickKey(clickFieldKey)
        }
    };

    const handleOk = async () => {
        console.log(fieldNewValue, fieldClickKey);
        console.log(userInfo);
        const newUserInfo = { ...userInfo, [fieldClickKey]: fieldNewValue };
        const { data: response } = await axios.post("/api/user/modify", { ...newUserInfo })
        if (response.code < 0) {
            message.error("修改个人信息失败");
        } else {
            message.info("修改成功")
        }
        setIsModalVisible(false);
        reloadUserInfo();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        reloadUserInfo();
    }, [])

    async function reloadUserInfo() {
        setLoading(true)
        const { data: response } = await axios.get("/api/user/info", {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        if (response.code < 0) {
            message.error(`获取个人信息失败, ${response.msg}`)
            setLoading(false)
            return
        }
        setUserInfo(response.data)
        setLoading(false)
        notification.open({
            message: '提示',
            description:
                '可以双击对应信息可以进行修改',
        })
    }

    return (
        <>

            <Descriptions title=" " bordered >
                <Descriptions.Item label="用户名" onClick={showModal} >
                    <span onDoubleClick={showModal(["用户名", "userAccount"])} className={styles.fieldValue}>
                        {userInfo.userAccount}
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="性别">
                    <span onDoubleClick={showModal(["性别", "sex"])} className={styles.fieldValue}>
                        {userInfo.sex}
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="年龄">
                    <span onDoubleClick={showModal(["年龄", "age"])} className={styles.fieldValue}>
                        {userInfo.age}
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="生日">
                    <span onDoubleClick={showModal(["生日", "birthday"])} className={styles.fieldValue}>
                        {userInfo.birthday}
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="用户描述" span={2}>
                    <span onDoubleClick={showModal(["用户描述", "description"])} className={styles.fieldValue}>
                        {userInfo.description}
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                    <Badge status="processing" text="已认证" />
                </Descriptions.Item>
                <Descriptions.Item label="名">
                    <span onDoubleClick={showModal(["名", "firstName"])} className={styles.fieldValue}>
                        {userInfo.firstName}
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="姓">
                    <span onDoubleClick={showModal(["姓", "lastName"])} className={styles.fieldValue}>
                        {userInfo.lastName}
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="手机号">
                    <span onDoubleClick={showModal(["手机号", "phone"])} className={styles.fieldValue}>
                        {userInfo.phone}
                    </span>
                </Descriptions.Item>
            </Descriptions>
            <Modal title="修改信息" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>请输入新的{fieldName}</p>
                <Input disabled placeholder="" value={fieldOldValue} />
                <Input autoFocus placeholder="" value={fieldNewValue} onChange={handleFieldNewValueChange} />
            </Modal>
        </>
    )
}