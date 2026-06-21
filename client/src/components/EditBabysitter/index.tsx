import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../../config/api";
import useFetch from "../../hooks/useFetch";
import IBabysitter from "../../interface/BabySitter";
import { AuthContext } from "../../providers/AuthProvider";
import { useLanguage } from "../../providers/LanguageProvider";
import PageHeader from "../PageHeader";
import TopNavLink from "../TopNavLink";

export const EditBabysitter = () => {
  const { user } = useContext(AuthContext) ?? {};
  const { PATCH } = useFetch<IBabysitter>(apiUrl("babysitter"));
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();

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

  const userBabysitter = user as IBabysitter;

  useEffect(() => {
    if (!userBabysitter) return;

    setName(userBabysitter.name || "");
    setAge(userBabysitter.age || 0);
    setImage(userBabysitter.image || "");
    setAddress(userBabysitter.address || "");
    setPhone(userBabysitter.phone || "");
    setEmail(userBabysitter.email || "");
    setPreferences(userBabysitter.preferences || [""]);
    setExperience(userBabysitter.experience || "");
    setAbout(userBabysitter.about || "");
    setPrice(userBabysitter.price || 0);
    setBudget(userBabysitter.budget || 100);
  }, [userBabysitter]);

  const addPreferences = (newPreference: string) => {
    if (preferences.length >= 3) return;
    setPreferences([...preferences, newPreference]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) return;

    PATCH(id, {
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
    });

    navigate("/babysitter");
  };

  return (
    <>
      <PageHeader title={t("editTitle")} subtitle={t("editSubtitle")} />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">{t("name")}</label>
          <input
            id="name"
            type="text"
            placeholder={t("namePlaceholder")}
            value={name}
            onChange={(event) => setName(event.target.value)}
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
            onChange={(event) => setAge(Number(event.target.value))}
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
            onChange={(event) => setImage(event.target.value)}
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
            onChange={(event) => setAddress(event.target.value)}
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
            onChange={(event) => setPhone(event.target.value)}
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
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="preferences">{t("preferences")}</label>
          <select
            id="preferences"
            value={preferences[0]}
            onChange={(event) => addPreferences(event.target.value)}
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
            onChange={(event) => setExperience(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="about">{t("about")}</label>
          <input
            id="about"
            type="text"
            placeholder={t("aboutPlaceholder")}
            value={about}
            onChange={(event) => setAbout(event.target.value)}
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
            onChange={(event) => setPrice(Number(event.target.value))}
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
            onChange={(event) => setBudget(Number(event.target.value))}
            required
          />
        </div>

        <button type="submit">{t("editSubmit")}</button>
        <button type="button">
          <TopNavLink to="/babysitter">{t("back")}</TopNavLink>
        </button>
      </form>
    </>
  );
};
