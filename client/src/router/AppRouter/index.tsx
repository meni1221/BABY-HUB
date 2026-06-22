import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { Register } from "../../pages/register";
import AboutPage from "../../pages/AboutPage";
import ParentPage from "../../pages/ParentPage";
import { BaybisitterHomePage } from "../../pages/BaybisitterHomePage";
import { EditBabysitter } from "../../components/EditBabysitter";
import DisplayBabisitterPage from "../../pages/DisplayBabisitterPage";
import ErrorPage from "../../pages/ErrorPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import PrivateRouteUser from "../../components/UserPrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/babysitter"
        element={
          <PrivateRouteUser requiredRole="babysitter">
            <BaybisitterHomePage />
          </PrivateRouteUser>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <PrivateRouteUser requiredRole="babysitter">
            <EditBabysitter />
          </PrivateRouteUser>
        }
      />
      <Route
        path="/parent"
        element={
          <PrivateRouteUser requiredRole="parent">
            <ParentPage />
          </PrivateRouteUser>
        }
      />
      <Route
        path="/display/:id"
        element={
          <PrivateRouteUser requiredRole="parent">
            <DisplayBabisitterPage />
          </PrivateRouteUser>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
