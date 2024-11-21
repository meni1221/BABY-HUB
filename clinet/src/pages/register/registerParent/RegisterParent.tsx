import React, { useState } from "react";

interface IAddress extends Document {
  city: string;
  street: string;
  buildingNumber: number;
}

interface IParent {
  name: string;
  amount: number;
  address: IAddress;
  phone: string;
  budget: number;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const RegisterParent = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState(100);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setName("");
    setAmount(1);
    setAddress("");
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
