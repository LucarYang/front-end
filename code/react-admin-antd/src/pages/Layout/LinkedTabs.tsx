import { tabRoutes } from '@/router';
import { ConfigProvider, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

function LinkedTabs() {
    const [items, setItems] = useState(tabRoutes);
    const navigate = useNavigate();
    const location = useLocation();
    const activeKey = location.pathname; // 假设path与Tabs的key一致  

    const handleTabClick = (key: string) => {
        navigate(key); // 当点击Tabs时，导航到对应的路由  
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tabs: {
                        cardBg: '#FFF',
                        cardHeight: 0,
                        itemSelectedColor: '#FFF',
                        itemActiveColor: '#002c8c',
                    },
                },
            }}
        >
            <Tabs style={{ margin: 0, background: '#fff' }} size={'small'} type="editable-card" activeKey={activeKey} onChange={handleTabClick} items={items}>

            </Tabs>
        </ConfigProvider >

    );

}

export default LinkedTabs