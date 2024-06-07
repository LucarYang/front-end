import Barchart from "./components/Barchart";
const Home = () => {
  return (
    <div>
      <div>
        <Barchart title={"满意度"} />
        <Barchart title={"使用度"} />
      </div>
    </div>
  );
};

export default Home;
