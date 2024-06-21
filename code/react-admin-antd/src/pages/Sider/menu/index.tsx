
import {
    AppstoreOutlined,
    ContainerOutlined,
    ClusterOutlined,
    FileExclamationOutlined,
    MailOutlined,
    CodepenOutlined,
    FileWordOutlined,
    ScheduleOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    { key: '/', icon: <AppstoreOutlined />, label: 'Dashboard' },
    { key: '/home', icon: <ClusterOutlined />, label: '管理' },
    { key: '/error', icon: <FileExclamationOutlined />, label: '异常页' },
    { key: '/comp0', icon: <CodepenOutlined />, label: '组件' },
    { key: '/comp1', icon: <ContainerOutlined />, label: '功能' },
    { key: '/comp2', icon: <FileWordOutlined />, label: '富文本' },
    { key: '/board', icon: <ScheduleOutlined />, label: '看板' },
    {
        key: 'sub1',
        label: '一级菜单',
        icon: <MailOutlined />,
        children: [
            { key: '5', label: 'Option 5' },
            { key: '6', label: 'Option 6' },
            { key: '7', label: 'Option 7' },
            { key: '8', label: 'Option 8' },
        ],
    },
    {
        key: 'sub2',
        label: '二级菜单',
        icon: <AppstoreOutlined />,
        children: [
            { key: '9', label: 'Option 9' },
            { key: '10', label: 'Option 10' },
            {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    { key: '11', label: 'Option 11' },
                    { key: '12', label: 'Option 12' },
                ],
            },
        ],
    },
    {
        key: 'sub2',
        label: '二级菜单',
        icon: <AppstoreOutlined />,
        children: [
            { key: '9', label: 'Option 9' },
            { key: '10', label: 'Option 10' },
            {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    { key: '11', label: 'Option 11' },
                    { key: '12', label: 'Option 12' },
                ],
            },
        ],
    },
];

const Mune: React.FC = () => {
    const navigate = useNavigate();
    const onMenuClick = (route: any) => {
        console.log(route);
        navigate(route.key);
    };
    return (
        <div>
            <Menu style={{ "backgroundColor": '#002c8c', 'color': '#fff', overflowY: 'auto', height: 'calc(100vh - 60px)' }}
                defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                theme="dark"
                mode="inline"
                onClick={onMenuClick}
                // inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    );
};

export default Mune;