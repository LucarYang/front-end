# 记账本环境创建

CRA 创建项目

```bash
npx create-react-app react-bill-test
```

1. Redux 状态管理 - @reduxjs/toolkit react-redux
2. 路由 - react-router-dom
3. 时间处理 - dayjs
4. class 类管理处理 - classNames
5. 移动端组件库 - antd-mobile
6. 请求插件 - axios

```bash
npm i @reduxjs/toolkit react-redux react-rourter-dom dayjs classnames antd-mobile axios
```

# 配置别名路径@

别名路径配置

1. 路径解析配置(webpack),把@/解析为 src/
   - 插件 craco
2. 路径联想配置(VScode),VsCode 在输入@/时候，自动联想出 src/下的子目录
   - jsconfig.json

## 路径解析配置

CRA 本身把 webpack 配置包装到了黑盒里无法直接修改，需要借助一个插件 craco

配置步骤：

1. 安装 craco(安装在开发环境)
   npm i -D @craco/craco
2. 项目根目录下创建配置文件
   craco.config.js
3. 配置文件中添加路径解析配置
4. 包文件中配置启动和打包命令

\craco.config.js

```js
const path = require("path");
module.exports = {
  // webpack配置
  webpack: {
    // 别名配置
    alias: {
      // 约定使用@ 表示 src 文件所在目录
      "@": path.resolve(__dirname, "src"),
    },
  },
};
```

package.json

```json
// ...
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
// ...
```

src\index.js(测试)

```js
// ...
import Sum from "@/test";

const total = Sum(1, 2);
console.log(total); //3

// ...
```

## 联想路径配置

VsCode 的联想配置，需要我们在的项目目录下添加 jsconfig.json 文件，加入配置后 VSCO 的会自动读取配置帮助我们自动联想提示

在根目录下添加 jsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

# 数据 Mock

进行的数据的模拟

## json-server 实现数据 Mock

json-server 是一个 node 包，可以在不到 30 秒内获取得零编码的完整的 Mock 服务

实现步骤：

1. 项目中安装 json-server
   npm i -D json-server
2. 准备一个 json 命令
3. 添加启动命令
   "server": "json-server ./server/data.json --port 8888",
4. 访问接口进行测试

# 整体路由设计

src\router\index.js

```js
// 创建路由实例 绑定path element
import Layout from "@/pages/Layout";
import Month from "@/pages/Month";
import New from "@/pages/New";
import Year from "@/pages/Year";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        // path: "month",
        index: true,
        element: <Month />,
      },
      {
        path: "year",
        element: <Year />,
      },
    ],
  },
  {
    path: "/new",
    element: <New />,
  },
]);
export default router;
```

# antD-mobile 主题定制

定制方案

1. 全局定制
   整个应用范围内的组件都生效
2. 局部定制
   只在某些元素内部的组件生效

```css
/* 全局样式定制 */
:root:root {
  --adm-color-primary: rgb(105, 174, 120);
}

/* 局部样式定制 */
/* .puple{
    --adm-color-primary:#a062d4;
} */
```

src\pages\Layout\index.js

```js
import { Button } from "antd-mobile";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Outlet />
      Layout页面
      {/* 测试全局生效样式 */}
      <Button color="primary">测试全局</Button>
      <div className="puple">
        <Button color="primary">测试局部</Button>
      </div>
    </div>
  );
};

export default Layout;
```

# Redux 管理账目别表

基于 RTK 管理账目列表

RTK：

- 数据状态定义 state-billList
- 同步方法定义 reducer-setBillList
- 异步方法定义 异步 action

component:
dispatch 异步 action

# TabBar 功能实现

使用 antD 的 TabBar 标签栏组件进行布局以及路由的切换

实现方式 看文档 (找到相似 Demo-复制代码跑通-定制化修改)
Layout\index.js

```js
import { TabBar } from "antd-mobile";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBillList } from "@/store/modules/billStore";
import "./index.scss";
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline,
} from "antd-mobile-icons";

const tabs = [
  {
    key: "/month",
    title: "月度账单",
    icon: <BillOutline />,
  },
  {
    key: "/new",
    title: "记账",
    icon: <AddCircleOutline />,
  },
  {
    key: "/year",
    title: "年度账单",
    icon: <CalculatorOutline />,
  },
];

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);

  // 切换菜单 跳转路由
  const navigate = useNavigate();
  const switchRoute = (path) => {
    navigate(path);
  };
  return (
    <div className="layout">
      <div className="container">
        <Outlet />
      </div>
      <div className="footer">
        <TabBar onChange={switchRoute}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};

export default Layout;
```

# 月度账单 - 统计区域

## 搭建静态页面

```js
import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";

const Month = () => {
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date">
            <span className="text">2023 | 3月账单</span>
            <span className="arrow expand"></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={false}
            max={new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default Month;
```

## 切换时间框

> 实现思路：
>
> 1. 准备一个状态数据
> 2. 点击切换状态
> 3. 根据状态控制弹框打开关闭以及箭头样式

```js
import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useState } from "react";
import classNames from "classnames";

const Month = () => {
  // 控制弹框的打开和关闭
  const [dateVisible, setDateVidible] = useState(false);
  const onConfirm = () => {
    setDateVidible(false);
  };
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVidible(true)}>
            <span className="text">2023 | 3月账单</span>
            {/* 思路：根据弹框的状态控制 expand类名是否存在 */}
            <span
              className={classNames("arrow", dateVisible && "expand")}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVidible(false)}
            onConfirm={onConfirm}
            onClose={() => setDateVidible(false)}
            max={new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default Month;
```

## 切换时间显示

> 实现思路：
>
> 1. 以当前时间作为默认值
> 2. 在时间切换时完成时间修改

```js
import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";

const Month = () => {
  // 控制弹框的打开和关闭
  const [dateVisible, setDateVidible] = useState(false);

  // 控制时间显示的状态
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY | MM");
  });
  const onConfirm = (date) => {
    setDateVidible(false);
    // 其他逻辑
    console.log(date);
    setCurrentDate(dayjs(date).format("YYYY | MM"));
  };
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVidible(true)}>
            <span className="text">{currentDate + ""}月账单</span>
            {/* 思路：根据弹框的状态控制 expand类名是否存在 */}
            <span
              className={classNames("arrow", dateVisible && "expand")}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVidible(false)}
            onConfirm={onConfirm}
            onClose={() => setDateVidible(false)}
            max={new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default Month;
```

## 账单数据按月分组

```js
const Month = () => {
  // 按月做数据分组
  const billList = useSelector((state) => state.bill.billList);
  const monthGroup = useMemo(() => {
    // return 出去计算之后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  console.log(monthGroup);
  // 控制弹框的打开和关闭
  const [dateVisible, setDateVidible] = useState(false);
};
```

## 计算选择月份的统计数据

```js
const Month = () => {
  //...
  const [currentMonthList, setMonthList] = useState([]);

  const monthResult = useMemo(() => {
    // 支出 收入 结余
    const pay = currentMonthList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);
    const income = currentMonthList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    return { pay, income, total: pay + income };
  }, [currentMonthList]);

  // 确认回调
  const onConfirm = (date) => {
    setDateVidible(false);
    // 其他逻辑
    console.log(date);
    setCurrentDate(dayjs(date).format("YYYY | MM"));
    const formatDate = dayjs(date).format("YYYY-MM");
    setMonthList(monthGroup[formatDate]);
    console.log(formatDate);
  };
  return (
    <div className="monthlyBill">
      {/* ... */}
      <div className="content">
        <div className="header">
          {/* ... */}
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* ... */}
        </div>
      </div>
    </div>
  );
};
```

# 初始化渲染统计数据

useEffect

```js
// ...
const Month = () => {
  // 按月做数据分组
  const billList = useSelector((state) => state.bill.billList);
  const monthGroup = useMemo(() => {
    // return 出去计算之后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  console.log(monthGroup);
  // 控制弹框的打开和关闭
  const [dateVisible, setDateVidible] = useState(false);

  // 控制时间显示的状态
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY | MM");
  });

  const [currentMonthList, setMonthList] = useState([]);

  const monthResult = useMemo(() => {
    // 支出 收入 结余
    const pay = currentMonthList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);
    const income = currentMonthList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    return { pay, income, total: pay + income };
  }, [currentMonthList]);

  // 初始化的时候把当前月的数据显示出来
  useEffect(() => {
    const nowDate = dayjs().format("YYYY-MM");
    // 边界值的判断
    if (monthGroup[nowDate]) {
      setMonthList(monthGroup[nowDate]);
    }
  }, [monthGroup]);

  // ...
};

export default Month;
```

# 单日统计列表

## 1. 准备组件和配套样式

```jsx
import classNames from "classnames";
import "./index.scss";

const DailyBill = () => {
  return (
    <div className={classNames("dailyBill")}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{"03月23日"}</span>
          <span className={classNames("arrow")}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{100}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{200}</span>
          </div>
          <div className="balance">
            <span className="money">{100}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DailyBill;
```

配套样式

```css
.dailyBill {
  margin-bottom: 10px;
  border-radius: 10px;
  background: #ffffff;

  .header {
    --ka-text-color: #888c98;
    padding: 15px 15px 10px 15px;

    .dateIcon {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 21px;
      margin-bottom: 9px;
      .arrow {
        display: inline-block;
        width: 5px;
        height: 5px;
        margin-top: -3px;
        margin-left: 9px;
        border-top: 2px solid #888c98;
        border-left: 2px solid #888c98;
        transform: rotate(225deg);
        transform-origin: center;
        transition: all 0.3s;
      }
      .arrow.expand {
        transform: translate(0, 2px) rotate(45deg);
      }

      .date {
        font-size: 14px;
      }
    }
  }
  .oneLineOverview {
    display: flex;
    justify-content: space-between;

    .pay {
      flex: 1;
      .type {
        font-size: 10px;
        margin-right: 2.5px;
        color: #e56a77;
      }
      .money {
        color: var(--ka-text-color);
        font-size: 13px;
      }
    }

    .income {
      flex: 1;
      .type {
        font-size: 10px;
        margin-right: 2.5px;
        color: #4f827c;
      }
      .money {
        color: var(--ka-text-color);
        font-size: 13px;
      }
    }

    .balance {
      flex: 1;
      margin-bottom: 5px;
      text-align: right;

      .money {
        line-height: 17px;
        margin-right: 6px;
        font-size: 17px;
      }
      .type {
        font-size: 10px;
        color: var(--ka-text-color);
      }
    }
  }

  .billList {
    padding: 15px 10px 15px 15px;
    border-top: 1px solid #ececec;
    .bill {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 43px;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      .icon {
        margin-right: 10px;
        font-size: 25px;
      }
      .detail {
        flex: 1;
        padding: 4px 0;
        .billType {
          display: flex;
          align-items: center;
          height: 17px;
          line-height: 17px;
          font-size: 14px;
          padding-left: 4px;
        }
      }
      .money {
        font-size: 17px;

        &.pay {
          color: #ff917b;
        }
        &.income {
          color: #4f827c;
        }
      }
    }
  }
}
.dailyBill.expand {
  .header {
    border-bottom: 1px solid #ececec;
  }
  .billList {
    display: block;
  }
}
```

## 2.按日分组账单数据

```javascript
// 把当前月按日分组账单数据
const dayGroup = useMemo(() => {
  const group = _.groupBy(currentMonthList, (item) =>
    dayjs(item.date).format("YYYY-MM-DD")
  );
  return {
    dayKeys: Object.keys(group),
    group,
  };
}, [currentMonthList]);
console.log(dayGroup);
```

## 3. 遍历日账单组件并传入参数

```jsx
{
  /* 日账单 */
}
{
  dayGroup.dayKeys.map((dayKey) => (
    <DailyBill key={dayKey} date={dayKey} billList={dayGroup.group[dayKey]} />
  ));
}
```
