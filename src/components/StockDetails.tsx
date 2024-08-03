import { useEffect, useRef, useState } from "react";
import { useStockOverview } from "../utils/api/stock-api";

interface ReadMoreProps {
  text: string;
  maxLength: number;
}

interface KeyStatsProps {
  weekHigh: string;
  weekLow: string;
  fiftyDMA: string;
  twoHundredsDMA: string;
}

const StockDetails: React.FC = () => {
  const { data, error, isLoading } = useStockOverview<unknown>("IBM");
  const stockData = data as Record<string, string>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <h3 className="font-bold mb-">
        {stockData.Name}
        <span className="text-red-600"> ({stockData.Symbol})</span>
      </h3>
      <ReadMore text={stockData.Description} maxLength={100} />
      <KeyStats
        weekHigh={stockData["52WeekHigh"]}
        weekLow={stockData["52WeekHigh"]}
        fiftyDMA={stockData["50DayMovingAverage"]}
        twoHundredsDMA={stockData["200DayMovingAverage"]}
      />
    </>
  );
};

const ReadMore: React.FC<ReadMoreProps> = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);

  const needsTruncation = text.length > maxLength;
  const displayText =
    isExpanded || !needsTruncation ? text : `${text.slice(0, maxLength)}...`;
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight + 50);
    }
  }, [text, isExpanded]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="read-more overflow-hidden transition-all duration-300 ease-in-out mb-4"
      style={{ maxHeight: isExpanded ? `${height}px` : "100px" }}
    >
      <p ref={ref}>{displayText}</p>
      {needsTruncation && (
        <button
          type="button"
          onClick={toggleReadMore}
          className="read-more-button text-cyan-500 hover:text-cyan-700 mt-2 focus:outline-none"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

const KeyStats: React.FC<KeyStatsProps> = (props) => {
  const { weekHigh, weekLow, fiftyDMA, twoHundredsDMA } = props;
  return (
    <div className="border-t-2 border-white py-4">
      <h3 className="font-bold mb-4">Key Stats</h3>
      <div className="grid grid-rows-4 gap-2">
        <p>
          {" "}
          Weekly High: <span className="font-bold"> {weekHigh}</span>
        </p>
        <p>
          {" "}
          Weekly Low: <span className="font-bold"> {weekLow}</span>
        </p>
        <p>
          {" "}
          50 Days Moving Average: <span className="font-bold">{fiftyDMA}</span>
        </p>
        <p>
          {" "}
          200 Days Moving Average:{" "}
          <span className="font-bold">{twoHundredsDMA}</span>
        </p>
      </div>
    </div>
  );
};

export default StockDetails;
