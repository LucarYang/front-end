import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,

    MessageFilled,
    SettingFilled
} from '@ant-design/icons';
import { Button, Layout as LayoutAntD, theme, Breadcrumb, ConfigProvider, Badge, Space } from 'antd';
import SiderCom from '../Sider';

const { Header, Content } = LayoutAntD;

const Layout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <LayoutAntD style={{ height: 'calc(100vh - 0px)' }}>
            <SiderCom collapsed={collapsed} />
            <LayoutAntD>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    <Space style={{
                        float: "right",
                        marginRight: 30,
                        marginLeft: 30
                    }}>
                        <Badge count={5}>
                            <MessageFilled style={{
                                fontSize: '20px',
                                color: '#1677ff',
                            }} />
                        </Badge>
                    </Space>

                    <Button
                        type="text"

                        icon={<SettingFilled style={{
                            fontSize: '20px',
                            color: '#1677ff',
                        }} />}

                        style={{
                            fontSize: '26px',
                            color: '#1677ff',
                            width: 64,
                            height: 64,
                            float: "right",
                        }}
                    />
                </Header>
                <Breadcrumb style={{ margin: '10px 0px 0 20px' }} items={[
                    {
                        breadcrumbName: '首页',
                        key: 'home',
                    },
                    {
                        breadcrumbName: '应用中心',
                        key: 'app-center',
                    },
                    {
                        breadcrumbName: '我的应用',
                        key: 'my-app',
                    },
                ]} />
                <Breadcrumb style={{ margin: '10px 20px' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    style={{
                        margin: '10px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >

                    Content
                    <ConfigProvider theme={{
                        token: {
                            // Seed Token，影响范围大
                            colorPrimary: '#00b96b',
                            borderRadius: 2,

                            // 派生变量，影响范围小
                            colorBgContainer: '#f6ffed',
                        },
                    }}>
                        <Button type="primary">Primary Button</Button>
                    </ConfigProvider>

                </Content>
            </LayoutAntD>
        </LayoutAntD>
    );
};

export default Layout;