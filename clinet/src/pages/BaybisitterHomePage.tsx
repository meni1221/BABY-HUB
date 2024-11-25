import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { NavLink } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import IBabysitter from "../interface/BabySitter";
import { IParents } from "../interface/parents";

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
  const [orders, setorders] = useState<IOrder[]>([]);
  const { GETOne, data } = useFetch<IOrder>("http://localhost:7700/orders");

  const userBabysitter = user as IBabysitter;

  useEffect(() => {
    GETOne(userBabysitter._id);
  }, []);

  useEffect(() => {
    if (data) {
      return setorders([...orders, data]);
    } else {
      console.log("No data Brooooo...");
    }
  }, [data]);

  return (
    <>
      <div>{userBabysitter && <h1> welcome {userBabysitter.name}</h1>}</div>
      <div>
        <h2>{`name:${userBabysitter?.name}`}</h2>
        <p>{`age:${userBabysitter?.age}`}</p>
        <p>{`image:${userBabysitter?.image}`}</p>
        <p>{`address:${userBabysitter?.address}`}</p>
        <p>{`phone:${userBabysitter?.phone}`}</p>
        <p>{`email:${userBabysitter?.email}`}</p>
        <p>{`preferences:${userBabysitter?.preferences}`}</p>
        <p>{`experience:${userBabysitter?.experience}`}</p>
        <p>{`about:${userBabysitter?.about}`}</p>
        <p>{`price:${userBabysitter?.price}`}</p>
        <p>{`likes:${userBabysitter?.likes}`}</p>
        <p>{`budget:${userBabysitter?.budget}`}</p>
        <NavLink to={`babysitter/edit/${userBabysitter!._id}`}>
          Edit babysitter
        </NavLink>
      </div>
      {orders.length && <h1>{orders[0].babysitter_id}</h1>}
    </>
  );
};

export default BaybisitterHomePage;
