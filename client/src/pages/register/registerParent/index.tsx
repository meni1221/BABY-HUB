import { FormEvent, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { IParents } from "../../../interface/parents";
import { API_BASE_URL } from "../../../config/api";
import { useLanguage } from "../../../providers/LanguageProvider";

export const RegisterParent = () => {
  const { POST } = useFetch<IParents>(API_BASE_URL);
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1);
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState(100);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [buildingNumber, setBuildingNumber] = useState(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const address = { city, street, buildingNumber };

    POST("parents", {
      name,
      amount,
      address,
      phone,
      budget,
      email,
      password,
    });

    setName("");
    setAmount(1);
    setPhone("");
    setBudget(100);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">{t("name")}</label>
            <input
              id="name"
              type="text"
              placeholder={t("namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="amount">{t("amount")}</label>
            <input
              id="amount"
              type="number"
              placeholder={t("amountPlaceholder")}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label htmlFor="address">{t("address")}</label>
            <input
              id="city"
              type="text"
              placeholder={t("cityPlaceholder")}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              id="street"
              type="text"
              placeholder={t("streetPlaceholder")}
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
            <input
              id="buildingNumber"
              type="number"
              placeholder={t("buildingNumberPlaceholder")}
              value={buildingNumber}
              onChange={(e) => setBuildingNumber(Number(e.target.value))}
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
          <button type="submit">{t("registerParentSubmit")}</button>
        </form>
      </div>
    </>
  );
};
