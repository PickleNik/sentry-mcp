import { Routes, Route } from "react-router";
import Docs from "./pages/docs";
import LandingPage from "./pages/landing";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/docstest" element={<p>hi docs</p>} />
      <Route path="/docs" element={<Docs />} />
    </Routes>
  );
}
