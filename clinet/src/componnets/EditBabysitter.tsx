import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import IBabysitter from "../interface/BabySitter";
// import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useParams } from "react-router-dom";
// import { useNavigate, useParams } from "react-router-dom";

export const EditBabysitter = () => {
  const { user } = useContext(AuthContext) ?? {};
  const { PATCH } = useFetch<IBabysitter>("http://localhost:3001");

  //   const navigate = useNavigate();
  const { _id } = useParams();

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

  useEffect(() => {
    setName(user?.name);
    setAge(user.age);
    setImage(user.image);
    setAddress(user.address);
    setPhone(user.phone);
    setEmail(user.email);
    setPreferences(user.preferences);
    setExperience(user.experience);
    setAbout(user.about);
    setPrice(user.price);
    setBudget(user.budget);
  }, []);

  const addpreferences = (newPpreferences: string) => {
    if (preferences.length >= 3) return;
    setPreferences([...preferences, newPpreferences]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    PATCH("_id", {
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
    navigate("babysitter");
  };
  return (
    <>
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
          <label htmlFor="age">age</label>
          <input
            id="age"
            type="number"
            placeholder="הכנס את הגיל שלך"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="image">image</label>
          <input
            id="image"
            type="text"
            placeholder="הכנס את התמונה שלך"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">address</label>
          <input
            id="address"
            type="text"
            placeholder="הכנס את הכתובת שלך"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">phone</label>
          <input
            id="phone"
            type="text"
            placeholder="הכנס את המפר טלפון שלך"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <label htmlFor="preferences">preferences</label>
          <select
            id="preferences"
            value={preferences[0]}
            onChange={(e) => addpreferences(e.target.value)}
          >
            <option value="infancy">infancy</option>
            <option value="special education">special education</option>
            <option value="Age 5 and up">Age 5 and up</option>
            <option value="Rewards">Rewards</option>
            <option value="without food">without food</option>
            <option value="no homework">no homework</option>
          </select>
        </div>
        <div>
          <label htmlFor="experience">experience</label>
          <input
            id="experience"
            type="text"
            placeholder="הכנס את תחום הנסיון שלך"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="about">about</label>
          <input
            id="about"
            type="text"
            placeholder="ספר לי עליך בקצרה"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">price</label>
          <input
            id="price"
            type="number"
            placeholder="הכנס את המחיר שלך לשעה"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="budget">budget</label>
          <input
            id="budget"
            type="number"
            placeholder="הכנס את הסכום הראשוני שלך"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Edit Babysitter</button>
      </form>
    </>
  );
};
