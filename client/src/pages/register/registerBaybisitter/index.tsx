import { FormEvent, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import IBabysitter from "../../../interface/BabySitter";
import { API_BASE_URL } from "../../../config/api";
import { useLanguage } from "../../../providers/LanguageProvider";

export const RegisterBaybisitter = () => {
  const { POST } = useFetch<IBabysitter>(API_BASE_URL);
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferences, setPreferences] = useState([""]);
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState(0);
  const [budget, setBudget] = useState(100);
  const [password, setPassword] = useState("");

  const addpreferences = (newPpreferences: string) => {
    if (preferences.length >= 3) return;
    setPreferences([...preferences, newPpreferences]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    POST("babysitter", {
      name,
      age,
      image,
      address,
      phone,
      email,
      preferences,
      experience,
      about,
      price,
      budget,
      password,
    });

    setName("");
    setAge(0);
    setImage("");
    setAddress("");
    setPhone("");
    setEmail("");
    setPreferences([""]);
    setExperience("");
    setAbout("");
    setPrice(0);
    setBudget(100);
    setPassword("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">{t("name")}</label>
          <input
            id="name"
            type="text"
            placeholder={t("fullNamePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="age">{t("age")}</label>
          <input
            id="age"
            type="number"
            placeholder={t("agePlaceholder")}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="image">{t("image")}</label>
          <input
            id="image"
            type="text"
            placeholder={t("imagePlaceholder")}
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">{t("address")}</label>
          <input
            id="address"
            type="text"
            placeholder={t("addressPlaceholder")}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">{t("phone")}</label>
          <input
            id="phone"
            type="text"
            placeholder={t("phonePlaceholder")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">{t("email")}</label>
          <input
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="preferences">{t("preferences")}</label>
          <select
            id="preferences"
            value={preferences[0]}
            onChange={(e) => addpreferences(e.target.value)}
          >
            <option value="infancy">{t("preferenceInfancy")}</option>
            <option value="special education">
              {t("preferenceSpecialEducation")}
            </option>
            <option value="Age 5 and up">{t("preferenceAgeFive")}</option>
            <option value="Rewards">{t("preferenceRewards")}</option>
            <option value="without food">{t("preferenceWithoutFood")}</option>
            <option value="no homework">{t("preferenceNoHomework")}</option>
          </select>
        </div>
        <div>
          <label htmlFor="experience">{t("experience")}</label>
          <input
            id="experience"
            type="text"
            placeholder={t("experiencePlaceholder")}
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="about">{t("about")}</label>
          <input
            id="about"
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">{t("price")}</label>
          <input
            id="price"
            type="number"
            placeholder={t("pricePlaceholder")}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="budget">{t("budget")}</label>
          <input
            id="budget"
            type="number"
            placeholder={t("budgetPlaceholder")}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="password">{t("password")}</label>
          <input
            id="password"
            type="text"
            placeholder={t("passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{t("registerBabysitterSubmit")}</button>
      </form>
    </>
  );
};
