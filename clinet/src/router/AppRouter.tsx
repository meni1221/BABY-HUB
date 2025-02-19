import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { Register } from "../pages/register/Register";
import AboutPage from "../pages/AboutPage";
import ParentPage from "../pages/ParentPage";
import { BaybisitterHomePage } from "../pages/BaybisitterHomePage";
import { EditBabysitter } from "../components/EditBabysitter";
import ErrorPage from "../pages/ErrorPage";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/babysitter/*" element={<BaybisitterHomePage />} />
        <Route path="/Edit/:id" element={<EditBabysitter />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/parent" element={<ParentPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
