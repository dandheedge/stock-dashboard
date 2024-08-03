import StockDetails from "./components/StockDetails";
import Layout from "./components/Layout";
import Chart from "./components/Chart";

const App: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-row items-center">
        <div className="w-6/12">
          <Chart />
        </div>

        <div className="w-6/12">
          <StockDetails />
        </div>
      </div>
    </Layout>
  );
};

export default App;
