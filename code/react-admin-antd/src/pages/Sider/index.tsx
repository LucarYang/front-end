import { Layout as LayoutAntD } from 'antd';
import Menu from './menu'


const SiderAntD = LayoutAntD.Sider
const SiderCom = (props: any) => {
    return (
        <SiderAntD trigger={null} collapsible collapsed={props.collapsed}>
            <div className="demo-logo-vertical"> React-Admin</div>
            <Menu />
        </SiderAntD>
    )
}

export default SiderCom