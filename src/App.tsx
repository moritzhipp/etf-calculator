import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import PricingPage from "@/pages/pricing";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />

      <Route element={<PricingPage />} path="/pricing" />
    </Routes>
  );
}

export default App;
