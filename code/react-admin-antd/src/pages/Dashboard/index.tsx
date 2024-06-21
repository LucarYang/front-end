import { Card, Col, Row, Statistic, Tag } from "antd"
import { LikeOutlined, DislikeOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const DashBoard = () => {
    return <>
        <Row gutter={16}>
            <Col className="gutter-row" span={6}>
                <Card title={"Default size card"} extra={<Tag color="purple">purple</Tag>} >
                    <div style={{ display: 'flex' }}>
                        <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
                        <Statistic title="Feedback" value={123} prefix={<DislikeOutlined />} />
                    </div>

                </Card>
            </Col>
            <Col className="gutter-row" span={6}>
                <Card title={"Default size card"} extra={<Tag color="geekblue">geekblue</Tag>}>
                    <Statistic title="Unmerged" value={93} suffix="/ 100" />
                </Card>
            </Col>
            <Col className="gutter-row" span={6}>
                <Card title={"Default size card"} extra={<Tag color="green">green</Tag>}>
                    <Statistic
                        title="Active"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                    />
                </Card>
            </Col>
            <Col className="gutter-row" span={6}>
                <Card title={"Default size card"} extra={<Tag color="orange">orange</Tag>}>
                    <Statistic
                        title="Idle"
                        value={9.3}
                        precision={2}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%"
                    />
                </Card>
            </Col>
        </Row>

    </>
}
export default DashBoard