import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx"; // ✅ note the exact casing and local path

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      {/* example: <Route path="/projects" element={<Projects />} /> */}
      {/* example 404: <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
