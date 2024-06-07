// 封装柱状图组件
import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const Barchart = ({ title }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    // 保证dom可用 才进行图表得到渲染
    // 获取渲染的图片的dom节点
    // const chartDom = document.getElementById("main");
    const chartDom = chartRef.current; //ref获取dom节点
    // 图表初始化生成图标的实例对象
    var myChart = echarts.init(chartDom);
    // 图标参数
    var option = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    };
    // 渲染加载
    option && myChart.setOption(option);
  }, [title]);
  return (
    <div>
      <div ref={chartRef} style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
};

export default Barchart;
