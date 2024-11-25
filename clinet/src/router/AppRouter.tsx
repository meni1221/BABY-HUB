import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { Register } from "../pages/register/Register";
import AboutPage from "../pages/AboutPage";
import ParentPage from "../pages/ParentPage";
import { BaybisitterHomePage } from "../pages/BaybisitterHomePage";
import { EditBabysitter } from "../componnets/EditBabysitter";
import Comment from "../componnets/Comment";
import CommentRejister from "../pages/CommentRegister";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/babysitter" element={<BaybisitterHomePage />} />
        <Route path="babysitter/Edit/:id" element={<EditBabysitter />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="addc" element={<Comment comment={""} star={undefined} idBabysitter={""} />}/>
        <Route path="/comment" element={<CommentRejister />} />
        <Route path="/parent" element={<ParentPage />} />
      </Routes>
    </div>
  );
}
