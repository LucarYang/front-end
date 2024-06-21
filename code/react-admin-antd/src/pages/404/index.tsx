import { ExclamationCircleOutlined } from '@ant-design/icons'
const Err = () => {
    const errCode = 404
    return <>
        <div>
            <ExclamationCircleOutlined />
            Error:
            {errCode === 404 ? '404' : '未知异常'}
        </div>
    </>
}
export default Err