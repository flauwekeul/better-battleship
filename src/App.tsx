import "./App.css";
import Layout from "./Layout";
import { GameContextWrapper } from "./context/context";

function App() {
  return (
    <GameContextWrapper>
      <Layout />
    </GameContextWrapper>
  );
}

export default App;
