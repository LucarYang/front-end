import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,

    MessageFilled,
    SettingFilled
} from '@ant-design/icons';
import { Button, Layout as LayoutAntD, theme, Breadcrumb, ConfigProvider, Badge, Space, MenuProps, Dropdown } from 'antd';
import SiderCom from '../Sider';
import { Outlet } from 'react-router-dom';
import LinkedTabs from './LinkedTabs';

const { Header, Content } = LayoutAntD;

// 自定义 useResizeObserver 钩子  
function useResizeObserver<T extends HTMLElement>(ref: React.RefObject<T>) {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver(([entry]) => {
            // console.log(entry.contentRect)
            setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
        });

        if (ref.current) {
            resizeObserver.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                resizeObserver.unobserve(ref.current);
            }
        };
    }, []);

    return size;
}

const SOME_THRESHOLD = 500;
function debounce(func: Function, wait: number) {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return function (...args: any[]) {
        const context = func;
        clearTimeout(wait);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}


// Header 设置-下拉菜单
const items: MenuProps['items'] = [
    {
        label: (
            <a target="_blank">
                设置
            </a>
        ),
        key: '0',
    },
    {
        label: (
            <a target="_blank">
                登出
            </a>
        ),
        key: '1',
    }
];

const Layout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const { width } = useResizeObserver(headerRef);


    const handleResize = debounce(() => {
        if (headerRef.current) {
            const width = headerRef.current.offsetWidth;
            // if (width < SOME_THRESHOLD) {
            //     setCollapsed(true);
            // } else {
            //     setCollapsed(false);
            // }
            if (width >= 500) {
                setCollapsed(false);
            } else {
                setCollapsed(true);
            }

        }
    }, 1000); // 设置防抖时间，例如100毫秒  

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                handleResize();
            }
        });

        if (headerRef.current) {
            resizeObserver.observe(headerRef.current);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            if (headerRef.current) {
                resizeObserver.unobserve(headerRef.current);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
                    <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
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
                    </Dropdown>

                </Header>
                <LinkedTabs />
                <Content ref={headerRef}
                    style={{
                        margin: '10px 10px',
                        // padding: '0px 24px 10px 0px',
                        minHeight: 280,
                        // background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >



                    <Outlet />


                </Content>
            </LayoutAntD>
        </LayoutAntD >
    );
};

export default Layout;