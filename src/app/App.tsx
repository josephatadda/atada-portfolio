import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import WorksPage from "./pages/WorksPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/project/:slug" element={<ProjectDetailPage />} />
        <Route path="/playground" element={<PlaygroundPage />} />
      </Routes>
    </BrowserRouter>
  );
}