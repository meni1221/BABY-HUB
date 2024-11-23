import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { IParents } from "../../../interface/parents";
import { IAddress } from "../../../interface/Aadress";

export const RegisterParent = () => {
  const { POST } = useFetch<IParents>("http://localhost:7700/");

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1);
  const [address, setAddress] = useState<IAddress>({
    city: "Asdod",
    street: "Ben Gurion",
    buildingNumber: "15",
  });
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState(100);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [buildingNumber, setBuildingNumber] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddress({ city, street, buildingNumber });

    POST("/parents", {
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
    setAddress({});
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
            <label htmlFor="name">name</label>
            <input
              id="name"
              type="text"
              placeholder="הכנס את השם שלך"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="amount">amount children</label>
            <input
              id="amount"
              type="number"
              placeholder="הכנס את מספר הילדים"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label htmlFor="address">address</label>
            <input
              id="city"
              type="text"
              placeholder="הכנס את העיר שלך"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              id="street"
              type="text"
              placeholder="הכנס את הרחוב שלך"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
            <input
              id="buildingNumber"
              type="number"
              placeholder="הכנס את המספר בית שלך"
              value={buildingNumber}
              onChange={(e) => setBuildingNumber(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">phone</label>
            <input
              id="phone"
              type="text"
              placeholder="הכנס את מספר טלפון שלך"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="budget">budget</label>
            <input
              id="budget"
              type="number"
              placeholder="הכנס סכום כסף ראשוני לארנק"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <input
              id="email"
              type="email"
              placeholder="הכנס את המייל שלך"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              id="password"
              type="text"
              placeholder="הכנס את הסיסמא שלך"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add New Parent</button>
        </form>
      </div>
    </>
  );
};
