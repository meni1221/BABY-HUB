import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { IParents } from "../../../interface/parents";

export const RegisterParent = () => {
  const { POST } = useFetch<IParents>("http://localhost:7700");

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1);
  // const [address, setAddress] = useState<IAddress | null>(null);
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState(100);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [buildingNumber, setBuildingNumber] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="amount">Number of children</label>
            <input
              id="amount"
              type="number"
              placeholder="Enter the number of children"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              id="city"
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              id="street"
              type="text"
              placeholder="Enter your street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
            <input
              id="buildingNumber"
              type="number"
              placeholder="Enter your building number"
              value={buildingNumber}
              onChange={(e) => setBuildingNumber(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="budget">Budget</label>
            <input
              id="budget"
              type="number"
              placeholder="Enter initial wallet amount"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="text"
              placeholder="Enter your password"
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
