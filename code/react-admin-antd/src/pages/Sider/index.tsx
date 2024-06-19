import { Layout as LayoutAntD } from 'antd';
import {
    ProductOutlined
} from '@ant-design/icons';
import Menu from './menu'
import './index.css'


const SiderAntD = LayoutAntD.Sider
const SiderCom = (props: any) => {
    return (
        <>
            <SiderAntD trigger={null} collapsible collapsed={props.collapsed} style={{ "backgroundColor": '#002c8c' }}>
                {!props.collapsed ? (
                    <div className="demo-logo-vertical" style={{ "color": '#fff' }}>
                        <ProductOutlined style={{ fontSize: '39px', margin: '10px' }} />
                        <span>React-Admin</span>
                    </div>
                ) : (
                    <div className="demo-logo-vertical" style={{ "color": '#fff' }}>
                        <ProductOutlined style={{ fontSize: '39px', margin: '0px' }} />
                    </div>
                )}  <Menu />
            </SiderAntD>
        </>
    )
}

export default SiderCom