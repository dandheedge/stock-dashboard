import useSWR from "swr";

const basePath = "https://www.alphavantage.co";

/**
 * Wrapper Fetcher for React SWR
 * @param url
 * @returns {}
 */
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`An error has occurred: ${response.status}`);
  }
  return response.json();
};

/**
 * Searches best stock matches based on a user's query
 * @param {string} query - The user's query, e.g. 'fb'
 * @returns {Promise<Object[]>} Response array of best stock matches
 */

export function useSearchSymbol(query: string) {
  const url = `${basePath}/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${
    import.meta.env.VITE_API_KEY
  }`;
  return useSWR<object[]>(query ? url : null, fetcher);
}

/**
 * Fetches the latest quote of a given stock
 * @param {string} stockSymbol - Symbol of the company, e.g. 'FB'
 * @returns {Promise<Object>} Response object
 * https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo
 */
export function useStockQuote(stockSymbol: string) {
  const url = `${basePath}/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${
    import.meta.env.VITE_API_KEY
  }`;
  return useSWR<object>(stockSymbol ? url : null, fetcher);
}
