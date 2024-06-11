import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import "./index.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { CreateArticleAPI, UpdateArticleAPI, getArticleById } from "@/apis/article";
import { useChannel } from "@/hooks/useChannel";

const { Option } = Select;

const Publish = () => {
  // 获取频道列表
  const { channelList } = useChannel();

  // 提交表单
  const onFinish = (fromVal) => {
    // console.log(fromVal);
    // 校验封面类型imageType是否和实际的图片列表imageList数量相等
    if (imageList.length !== imageType)
      return message.warning("封面类型和图片不匹配");
    const { title, content, channel_id } = fromVal;
    // 按照接口格式处理收集到的数据
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        // 这里的URL处理逻辑只是在新增时候的逻辑
        // 编辑的时候需要处理
        images: imageList.map((item) => {
          if (item.response) {
            return item.response.data.url;
          } else {
            return item.url;
          }
        }), // 图片列表
      },
      channel_id,
    };

    // 调用接口提交
    // 处理不同的接口 新增/编辑
    if (articleId) {
      // 编辑
      UpdateArticleAPI({...reqData,id:articleId})
    } else {
      CreateArticleAPI(reqData);
    }
  };

  // 上传回调
  const [imageList, setImageList] = useState([]);
  const onUploadChange = (val) => {
    console.log(val);
    setImageList(val.fileList);
  };

  // 切换封面图片类型
  const [imageType, setImageType] = useState(0);
  const onTypeChange = (e) => {
    setImageType(e.target.value);
  };

  // 回填数据
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  // 获取实例
  const [form] = Form.useForm();
  useEffect(() => {
    // 1.通过id获取数据
    async function getArticleDetail() {
      const res = await getArticleById(articleId);
      const data = res.data;
      const { cover } = data;
      form.setFieldsValue({
        ...data,
        type: cover.type,
      });
      // 为什么现在的写法无法回填封面？ 数据结构的问题

      // 回填图片
      setImageType(cover.type);
      // 显示图片
      setImageList(
        cover.images.map((url) => {
          return { url };
        })
      );
    }
    // 只有有id的时候才能调用此函数
    if (articleId) {
      getArticleDetail();
    }
    // 2.调用实例方法 完成回填
  }, [articleId, form]);
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: `${articleId ? "编辑文章" : "发布文章"}` },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item, index) => (
                // value 属性用户选中之后会自动收集起来作为接口提交的字段
                <Option key={index} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                {/* type的默认 受From的initialValues控制 */}
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
              listType:决定选择文件框的样式
              showUploadList：控制显示长传列表 
            */}
            {imageType > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                onChange={onUploadChange}
                maxCount={imageType}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                发布内容
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
