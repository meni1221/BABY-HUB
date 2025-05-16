import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { Register } from "../pages/register/Register";
import AboutPage from "../pages/AboutPage";
import ParentPage from "../pages/ParentPage";
import { BaybisitterHomePage } from "../pages/BaybisitterHomePage";
import { EditBabysitter } from "../components/EditBabysitter";
import DisplayBabisitterPage from "../pages/DisplayBabisitterPage";
import ErrorPage from "../pages/ErrorPage";
import PrivateRouteUser from "../components/UserPrivateRoute";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/babysitter/*"
          element={<PrivateRouteUser children={<BaybisitterHomePage />} />}
        />
        <Route
          path="/Edit/:id"
          element={<PrivateRouteUser children={<EditBabysitter />} />}
        />
        <Route path="about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/parent"
          element={<PrivateRouteUser children={<ParentPage />} />}
        />
        <Route
          path="/display/:id"
          element={<PrivateRouteUser children={<DisplayBabisitterPage />} />}
        />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
