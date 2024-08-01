import "./App.css";
import { useSearchSymbol } from "../utils/api/stock-api";
function App() {
  const { data } = useSearchSymbol("FB");
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}

export default App;
