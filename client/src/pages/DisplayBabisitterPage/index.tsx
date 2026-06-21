import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import IBabysitter from "../../interface/BabySitter";
import { useParams } from "react-router-dom";
import CommentRegister from "../../components/CommentRegister";
import { apiUrl } from "../../config/api";
import { useLanguage } from "../../providers/LanguageProvider";
import "./style.scss";

const DisplayBabisitterPage = () => {
  const { GETOne, data } = useFetch<IBabysitter>(apiUrl("babysitter"));
  const [babysitter, setbabysitter] = useState<IBabysitter>();
  const { id } = useParams();
  const { t } = useLanguage();

  useEffect(() => {
    if (!id) return;
    GETOne(id);
  }, [id]);

  useEffect(() => {
    if (data) setbabysitter(data);
  }, [data]);

  return (
    <>
      {babysitter ? (
        <section className="display-babysitter">
          <img
            src={babysitter.image || "default-avatar.jpg"}
            alt={`${babysitter.name}'s avatar`}
            className="user-avatar"
          />

          <h2>{babysitter.name}</h2>
          <div className="display-babysitter__details">
            <p>
              <strong>{t("age")}:</strong> {babysitter.age}
            </p>
            <p>
              <strong>{t("location")}:</strong> {babysitter.address}
            </p>
            <p>
              <strong>{t("preferences")}:</strong> {babysitter.preferences}
            </p>
            <p>
              <strong>{t("experience")}:</strong> {babysitter.experience}
            </p>
            <p>
              <strong>{t("about")}:</strong> {babysitter.about}
            </p>
            <p>
              <strong>{t("price")}:</strong> {babysitter.price}
            </p>
            <p>
              <strong>{t("likes")}:</strong> {babysitter.likes}
            </p>
          </div>
          <CommentRegister id={babysitter._id!} />
        </section>
      ) : (
        <h1>{t("noUsers")}</h1>
      )}
    </>
  );
};

export default DisplayBabisitterPage;
