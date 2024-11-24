import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { NavLink } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import IBabysitter from "../interface/BabySitter";
import { IParents } from "../interface/parents";
import PageHeader from "../componnets/PageHeader";

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
  const { GET, data } = useFetch<IOrder>("http://localhost:7700/orders");

  const userBabysitter = user as IBabysitter;

  useEffect(() => {
    GET();
  }, []);

  useEffect(() => {
    if (data) {
      return setorders([data]);
    } else {
      console.log("No data Brooooo...");
    }
  }, [data]);

  const orderToBabysitter = orders.filter(
    (order) => order.babysitter_id != userBabysitter!._id
  );
  console.log(orderToBabysitter);

  return (
    <>
      <div>{userBabysitter && <h1> welcome {userBabysitter.name}</h1>}</div>
      <div>
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
          <NavLink to={`/edit/${userBabysitter!._id}`}>Edit babysitter</NavLink>
        </div>
        <div>
          <PageHeader title="order" subtitle="order to babysitter" />
          {orders.length > 0 &&
            orderToBabysitter.map((order) => (
              <div>
                <p key={order.babysitter_id}>Order Status: {order.status}</p>
                <p>Order to babysitter: {order.babysitter_id}</p>
                <p>Order from parent: {order.parent_id}</p>
                <p>Order number_working: {Number(order.number_working)}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default BaybisitterHomePage;
