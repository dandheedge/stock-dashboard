import React from "react";
import { useStockDaily } from "./utils/api/stock-api";
import { transformStockData, type StockData } from "./utils/transform-data";
import StockDetails from "./components/StockDetails";
import Layout from "./components/Layout";

const App: React.FC = () => {
  const { data, error, isLoading } = useStockDaily("IBM");

  // Use React.useMemo to memoize the transformed data
  const transformedData = React.useMemo(() => {
    if (data && "Meta Data" in data && "Time Series (Daily)" in data) {
      return transformStockData(data as StockData);
    }
    return null;
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <div className="flex flex-row items-center">
        <div className="w-6/12">
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
        </div>
        <div className="w-6/12">Hi HI</div>
      </div>
      {transformedData && (
        <div>
          <h2>Stock Data for {transformedData.metaData["2. Symbol"]}</h2>
          <ul>
            {transformedData.timeSeries.slice(0, 5).map((day) => (
              <li key={day.date}>
                {day.date}: Open ${day.open}, Close ${day.close}
              </li>
            ))}
          </ul>
        </div>
      )}
      <StockDetails />
    </Layout>
  );
};

export default App;
