import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import WalletCards from "./pages/WalletCards";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/walletCards" element={<WalletCards />} />
    </Routes>
  );
}

export default App;
