
import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, message, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const loginApi = (username: string, password: string) => {
    // API调用逻辑  
};
const Login: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const handleFinish = (values: any) => {
        console.log(values);

        if (values.username === "admin" && values.password === "123456") {
            console.log(values);
            message.success('登陆成功')
            navigate('/')
        } else {
            message.warning('登录失败')
        }
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
    };

    return (
        <div className="login-page">
            <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <div className='login-cover'>
                    <Col span={14}></Col>
                    <Col span={10}>
                        <Card style={{ width: 400, height: 400, margin: 20 }}>
                            <div style={{ marginTop: 100 }}>
                                <div style={{ fontSize: 20, margin: 10 }}>Login</div>
                                <Form
                                    form={form}
                                    name="login"
                                    className="login-form"
                                    initialValues={{ remember: true }}
                                    onFinish={handleFinish}
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
                                        <Button type="primary" htmlType="submit" className="login-form-button" block>
                                            登录
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Card>
                    </Col>
                </div>

            </Row>
        </div>
    );
};
export default Login