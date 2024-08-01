import { createContext } from "react";
interface CurrentUserContextType {
  symbol: string;
}
const StockContext = createContext<CurrentUserContextType | null>(null);
export default StockContext;
