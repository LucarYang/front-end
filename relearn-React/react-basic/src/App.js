// 项目的根组件

// App -> index.js -> public/index.html(root)

// 定于文章类型
const artcleType=1 //0 1 3

// 定义核心函数：根据文章类型返回不同JSX模板
const getArtcleTem=()=>{
  if(artcleType===0){
    return <div>无图模式</div>
  }
  else if(artcleType===1){
    return <div>单模式</div>
  }
  else if(artcleType===3){
    return <div>三模式</div>
  }
}

function App() {
  return (
    <div className="App">
     {getArtcleTem()}
    </div>
  );
}

export default App;
