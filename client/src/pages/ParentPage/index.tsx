import { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import IBabysitter from "../../interface/BabySitter";
import IOrder from "../../interface/orderType";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import "./style.scss";
import { NextArrow, PrevArrow } from "../AboutPage";
import Slider from "react-slick";
import { API_BASE_URL, apiUrl } from "../../config/api";
import { useLanguage } from "../../providers/LanguageProvider";
import { TbEye, TbMessageCircle } from "react-icons/tb";

const ParentPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const { user } = useContext(AuthContext) ?? {};
  const { t } = useLanguage();
  const { data, GET } = useFetch<IBabysitter[]>(apiUrl("babysitter"));
  const { POST } = useFetch<IOrder>(API_BASE_URL);

  const [babysitters, setBabysitters] = useState<IBabysitter[]>([]);
  const [number_working, setNumber_working] = useState(1);
  const [expectations, setExpectations] = useState("");
  const [babyId, setBabyId] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedName, setSelectedName] = useState<string>("");

  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    GET();
  }, []);

  useEffect(() => {
    if (data) setBabysitters(data);
  }, [data]);

  const openDialog = (id?: string) => {
    if (!id) return;
    setBabyId(id);

    const selected = babysitters.find((b) => b._id === id);
    if (selected) {
      setSelectedImage(selected.image || "default-avatar.jpg");
      setSelectedName(selected.name);
    }

    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    POST("orders", {
      parent_id: user!._id,
      babysitter_id: babyId,
      number_working,
      expectations,
    });

    setNumber_working(1);
    setExpectations("");
    closeDialog();
  };

  return (
    <>
      <div className="card-list">
        {babysitters && babysitters.length > 0 ? (
          babysitters.map((babysitter) => (
            <div key={babysitter.email} className="babysitter-card">
              <img
                src={babysitter.image || "default-avatar.jpg"}
                alt={`${babysitter.name}'s avatar`}
                className="user-avatar"
              />
              <h2>{babysitter.name}</h2>
              <p>
                <strong>{t("age")}:</strong> {babysitter.age}
              </p>
              <p>
                <strong>{t("location")}:</strong> {babysitter.address}
              </p>
              <button onClick={() => navigate(`/display/${babysitter._id}`)}>
                <TbEye />
                {t("moreDetails")}
              </button>
              <button onClick={() => openDialog(babysitter._id)}>
                <TbMessageCircle />
                {t("contact")}
              </button>
            </div>
          ))
        ) : (
          <p>{t("noBabysitters")}</p>
        )}
        <div className="babysitters-carousel">
          <Slider {...settings}>
            {babysitters.map((babysitter, index) => (
              <div key={index} className="babysitter-card">
                <img
                  src={babysitter.image || "default-avatar.jpg"}
                  alt={`${babysitter.name}'s avatar`}
                  className="user-avatar"
                />
                <h2>{babysitter.name}</h2>
                <p>
                  <strong>{t("age")}:</strong> {babysitter.age}
                </p>
                <p>
                  <strong>{t("location")}:</strong> {babysitter.address}
                </p>
                <button onClick={() => navigate(`/display/${babysitter._id}`)}>
                  <TbEye />
                  {t("moreDetails")}
                </button>
                <button onClick={() => openDialog(babysitter._id)}>
                  <TbMessageCircle />
                  {t("contact")}
                </button>
              </div>
            ))}
          </Slider>
        </div>
      </div>



      <dialog ref={dialogRef} className="popup-dialog">
        <form onSubmit={handleSubmit} className="popup-form">
          <IoClose className="close-icon" onClick={closeDialog} size={24} />
          <img
            src={selectedImage}
            alt={selectedName}
            className="popup-avatar"
          />
          <h2>
            {t("contact")} {selectedName}
          </h2>

          <label htmlFor="number_working">{t("numberOfHours")}</label>
          <input
            id="number_working"
            type="number"
            min="1"
            max="24"
            value={number_working}
            onChange={(e) => setNumber_working(Number(e.target.value))}
          />

          <label htmlFor="expectations">{t("expectations")}</label>
          <input
            id="expectations"
            type="text"
            value={expectations}
            onChange={(e) => setExpectations(e.target.value)}
          />

          <div className="dialog-buttons">
            <button type="button" onClick={closeDialog} className="cancel-btn">
              {t("cancel")}
            </button>
            <button type="submit" className="submit-btn">
              {t("sendOrder")}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default ParentPage;
