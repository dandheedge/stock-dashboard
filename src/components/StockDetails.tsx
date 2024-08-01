import { useStockOverview } from "../utils/api/stock-api";

const StockDetails: React.FC = () => {
  const { data, error, isLoading } = useStockOverview<unknown>("IBM");

  const stockData = data as { Description: string; Name: string };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      {/* <h3 className="font-bold">{stockData.Name}</h3> */}
      <p>{stockData.Description}</p>
    </>
  );
};

export default StockDetails;
