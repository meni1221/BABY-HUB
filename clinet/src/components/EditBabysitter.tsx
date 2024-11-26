import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import IBabysitter from "../interface/BabySitter";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeader from "./PageHeader";
import TopNavLink from "./TopNavLink";

export const EditBabysitter = () => {
  const { user } = useContext(AuthContext) ?? {};
  const { PATCH } = useFetch<IBabysitter>("http://localhost:7700/babysitter");

  //   const navigate = useNavigate();
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
    setName(userBabysitter?.name);
    setAge(userBabysitter.age);
    setImage(userBabysitter.image);
    setAddress(userBabysitter.address);
    setPhone(userBabysitter.phone);
    setEmail(userBabysitter.email);
    setPreferences(userBabysitter.preferences);
    setExperience(userBabysitter.experience);
    setAbout(userBabysitter.about);
    setPrice(userBabysitter.price);
    setBudget(userBabysitter.budget);
  }, []);

  const addpreferences = (newPpreferences: string) => {
    if (preferences.length >= 3) return;
    setPreferences([...preferences, newPpreferences]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <PageHeader title="Edit Page" subtitle="Here you can edit your profile" />
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
        <button>
          <TopNavLink to={"/babysitter"}>Back</TopNavLink>
        </button>
      </form>
    </>
  );
};
