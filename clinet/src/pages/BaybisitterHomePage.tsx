import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { NavLink } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import IBabysitter from "../interface/BabySitter";
import { IParents } from "../interface/parents";
import PageHeader from "../componnets/PageHeader";
import { EditBabysitter } from "../componnets/EditBabysitter";

// import { NavLink } from "react-router-dom";

interface IOrder {
  status: String;
  parent_id: string;
  babysitter_id: string;
  number_working: Number;
  expectations: String;
}

export const BaybisitterHomePage = () => {
  const [status, setStatus] = useState("waiting");
  const [buttonStatus, setButtonStatus] = useState("rejected");
  const [flagstatus, setflagstatus] = useState(true);
  const [flag, setFlag] = useState(false);

  const { user } = useContext(AuthContext) ?? {};
  //   const [newBabysitter, setnewBabysitter] = useState({}) ?? {};
  const [orders, setorders] = useState<IOrder[]>([]);
  const { GET, data, PATCH } = useFetch<IOrder>("http://localhost:7700/orders");

  const userBabysitter = user as IBabysitter;

  useEffect(() => {
    GET();
  }, []);

  useEffect(() => {
    if (data) {
      console.log({ data });
      return setorders(data);
    } else {
      console.log("No data Brooooo...");
    }
  }, [data]);

  const orderToBabysitter = orders?.filter(
    (order) => order.babysitter_id == userBabysitter!._id
  );
  console.log({ orderToBabysitter, userBabysitter });

  const statusUpdate = (orderid: string) => {
    switch (status) {
      case "waiting":
        setStatus("approved");
        setFlag(true);
      case "approved":
        setStatus("Done");
    }

    PATCH(orderid, { status });
  };

  const statusRejected = (orderid: string) => {
    setFlag(false);

    setStatus("rejected");

    PATCH(orderid, { status });
  };

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
            orderToBabysitter?.map((order) => (
              <div>
                <p key={order.babysitter_id}>Order Status: {order.status}</p>
                <p>Order to babysitter: {order.babysitter_id}</p>
                <p>Order from parent: {order.parent_id}</p>
                <p>Order number_working: {Number(order.number_working)}</p>
                {flagstatus && (
                  <button onClick={() => statusUpdate(order._id)}>
                    {order.status}
                  </button>
                )}

                {flag && (
                  <button onClick={() => statusRejected(order._id)}>
                    {buttonStatus}
                  </button>
                )}
              </div>
            ))}
          {orders.length === 0 && <h1>Sorry but there no orders</h1>}
        </div>
      </div>
    </>
  );
};

export default BaybisitterHomePage;
