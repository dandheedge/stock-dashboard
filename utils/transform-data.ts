export interface StockData {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Output Size": string;
    "5. Time Zone": string;
  };
  "Time Series (Daily)": {
    [date: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    };
  };
}

interface TransformedData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export function transformStockData(data: StockData): {
  metaData: StockData["Meta Data"];
  timeSeries: TransformedData[];
} {
  const metaData = data["Meta Data"];
  const timeSeries = Object.entries(data["Time Series (Daily)"]).map(
    ([date, values]) => ({
      date,
      open: Number.parseFloat(values["1. open"]),
      high: Number.parseFloat(values["2. high"]),
      low: Number.parseFloat(values["3. low"]),
      close: Number.parseFloat(values["4. close"]),
      volume: Number.parseInt(values["5. volume"], 10),
    })
  );

  // Sort the time series by date in descending order (most recent first)
  timeSeries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return { metaData, timeSeries };
}
