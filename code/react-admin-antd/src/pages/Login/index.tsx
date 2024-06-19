
import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const loginApi = (username: string, password: string) => {
    // API调用逻辑  
};
const Login: React.FC = () => {
    const [form] = Form.useForm();

    // const handleFinish = (values: any) => {
    //     loginApi(values.username, values.password)
    //         .then(response => {
    //             if (response.success) {
    //                 // 登录成功逻辑  
    //             } else {
    //                 message.error('登录失败');
    //             }
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             message.error('登录时发生错误');
    //         });
    // };

    return (
        <div className="login-page">
            <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <Col span={12}>
                    <Form
                        form={form}
                        name="login"
                        className="login-form"
                        initialValues={{ remember: true }}
                    // onFinish={handleFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};
export default Login