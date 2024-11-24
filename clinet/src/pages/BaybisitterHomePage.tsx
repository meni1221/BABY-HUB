import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { NavLink } from "react-router-dom";
import useFetch from "../hooks/useFetch";
// import IBabysitter from "../interface/BabySitter";
// import { NavLink } from "react-router-dom";

interface IOrder {
  status: String;
  parent_id: string;
  babysitter_id: string;
  number_working: Number;
  expectations: String;
}
export const BaybisitterHomePage = () => {
  const { user } = useContext(AuthContext) ?? {};
  const [orders, setorders] = useState([]);
  const { GET, data } = useFetch<IOrder>("http://localhost:7700/orders");

  useEffect(() => {
    GET();
  }, []);
  useEffect(() => {
    setorders(data);
  }, [data]);

  return (
    <>
      <div>{user && <h1> welcome {user.name}</h1>}</div>
      <div>
        <h2>{`name:${user?.name}`}</h2>
        <p>{`age:${user?.age}`}</p>
        <p>{`image:${user?.image}`}</p>
        <p>{`address:${user?.address}`}</p>
        <p>{`phone:${user?.phone}`}</p>
        <p>{`email:${user?.email}`}</p>
        <p>{`preferences:${user?.preferences}`}</p>
        <p>{`experience:${user?.experience}`}</p>
        <p>{`about:${user?.about}`}</p>
        <p>{`price:${user?.price}`}</p>
        <p>{`likes:${user?.likes}`}</p>
        <p>{`budget:${user?.budget}`}</p>
        <NavLink to={`babysitter/edit/${user!._id}`}>Edit babysitter</NavLink>
      </div>
      <div>
        {orders &&
          orders.map((order) => <p>{`parent:${order.number_working}`}</p>)}
      </div>
    </>
  );
};

export default BaybisitterHomePage;
