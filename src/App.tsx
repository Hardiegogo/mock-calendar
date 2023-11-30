import { Route, Routes } from "react-router-dom";
import "./App.css";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <div className="bg-zinc-950 dark:bg-white min-h-screen">
      <Routes>
        <Route path="/" element={<Calendar />} />
      </Routes>
    </div>
  );
}

export default App;
