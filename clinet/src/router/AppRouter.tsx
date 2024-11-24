import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { Register } from "../pages/register/Register";
import AboutPage from "../pages/AboutPage";
import ParentPage from "../pages/ParentPage";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/parent" element={<ParentPage />} />
      </Routes>
    </div>
  );

}
