import { Blocks } from "@/components/Blocks.tsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Price_Graph from "./components/Price_Graph";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Blocks />} />
          <Route path="/price" element={<Price_Graph />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
