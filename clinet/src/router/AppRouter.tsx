import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { Register } from "../pages/register/Register";
import AboutPage from "../pages/AboutPage";
import Comment from "../componnets/Comment";
import CommentRejister from "../pages/CommentRejister";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addc" element={<Comment />} />
        <Route path="/comment" element={<CommentRejister />} />
      </Routes>
    </div>
  );
}
