import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginpage";
import BlogPage from "./pages/blogpage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/blog" element={<BlogPage />} />
    </Routes>
  );
};

export default App;
