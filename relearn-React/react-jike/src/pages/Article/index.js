import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Popconfirm,
} from "antd";
// 汉化包 时间选择器中文
import locale from "antd/es/date-picker/locale/zh_CN";

// 导入资源
import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.png";
import { useChannel } from "@/hooks/useChannel";
import { delArticleAPI, getArticleListAPI } from "@/apis/article";
import { useEffect, useState } from "react";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const navigate=useNavigate()
  const { channelList } = useChannel();

  // 定义枚举
  const status = {
    1: <Tag color="yellow">待审核</Tag>,
    2: <Tag color="green">审核通过</Tag>,
  };
  // 准备列数据
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      // data后端返回的status
      // render: (data) =>data===1?<Tag color="yellow">待审核</Tag>:<Tag color="green">审核通过</Tag>,//三元表示的写法
      render: (data) => status[data], //枚举的写法
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined onClick={()=>navigate(`/publish?id=${data.id}`)} />} />
            <Popconfirm
              title="删除文字"
              description="确认删除此项吗?"
              onConfirm={()=>onConfirm(data)}
              // onCancel={cancel}
              okText="是"
              cancelText="否"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  // 筛选功能
  // 1.准备参数
  const [reqData, setReqData] = useState({
    status: "",
    channel_id: "",
    begin_pudate: "",
    end_pudate: "",
    page: "1",
    per_page: "4",
  });

  // 获取文章list
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI(reqData);
      setList(res.data.results);
      setCount(res.data.total_count);
    }
    getList();
  }, [reqData]);

  // 2. 获取筛选数据
  const onFinish = (fromVal) => {
    console.log(fromVal);
    // 3. 表单数据放到参数中(不可变方式)
    setReqData({
      ...reqData,
      channel_id: fromVal.channel_id,
      status: fromVal.status,
      begin_pudate: fromVal.date[0].format("YYYY-MM-DD"),
      end_pudate: fromVal.date[1].format("YYYY-MM-DD"),
    });

    // 4. 重新拉取文章列表+ 渲染label逻辑重复的-服用
    // reqData依赖项发生变化 重复执行作用函数
  };

  // 分页
  const onPageChange = (page) => {
    console.log(page);
    // 修改参数依赖性 引发数据的重新获取列表的渲染
    setReqData({
      ...reqData,
      page,
    });
  };

  // 删除
  const onConfirm=async(data)=>{
    console.log('删除了',data);
    await delArticleAPI(data.id)
    setReqData({...reqData})
  }
  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "文章列表" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: "" }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              // defaultValue="lucy"
              style={{ width: 120 }}
            >
              {channelList.map((item, index) => (
                <Option key={index} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={{
            total: count,
            pageSize: reqData.per_page,
            onChange: onPageChange,
          }}
        />
      </Card>
    </div>
  );
};
export default Article;
