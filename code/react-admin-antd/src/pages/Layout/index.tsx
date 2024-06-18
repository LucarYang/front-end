import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,

    MessageFilled,
    SettingFilled
} from '@ant-design/icons';
import { Button, Layout as LayoutAntD, theme, Breadcrumb } from 'antd';
import SiderCom from '../Sider';

const { Header, Content } = LayoutAntD;

const Layout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <LayoutAntD style={{ height: 'calc(100vh - 0px)' }}>
            {/* <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical"> React-Admin</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider> */}
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
                    <div>
                        <Button
                            type="text"
                            icon={<MessageFilled />}

                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <Button
                            type="text"
                            icon={<SettingFilled />}

                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </div>
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
                </Content>
            </LayoutAntD>
        </LayoutAntD>
    );
};

export default Layout;