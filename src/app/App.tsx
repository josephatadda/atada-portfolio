import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/works" element={<div className="min-h-screen w-full bg-[#f7f6f1] flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-semibold mb-4">Works Page</h1><p className="text-gray-600 mb-8">Coming Soon</p><Link to="/" className="text-blue-600 hover:underline">Go back home</Link></div></div>} />
        <Route path="/project/:slug" element={<ProjectDetailPage />} />
        <Route path="/playground" element={<div className="min-h-screen w-full bg-[#f7f6f1] flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-semibold mb-4">Playground</h1><p className="text-gray-600 mb-8">Coming Soon</p><Link to="/" className="text-blue-600 hover:underline">Go back home</Link></div></div>} />
      </Routes>
    </BrowserRouter>
  );
}