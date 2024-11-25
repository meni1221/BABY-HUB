import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { NavLink } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import IBabysitter from "../interface/BabySitter";

interface IOrder {
  status: string;
  parent_id: string;
  babysitter_id: string;
  number_working: number;
  expectations: string;
}

export const BaybisitterHomePage = () => {
  const [status, setStatus] = useState("waiting");
  const { user } = useContext(AuthContext) ?? {};
  const [orders, setorders] = useState<IOrder[]>([]);
  const { GET, data, PATCH } = useFetch<IOrder>("http://localhost:7700/orders");
  const userBabysitter = user as IBabysitter;

  useEffect(() => {
    GET();
  }, []);

  useEffect(() => {
    if (data) {
      setorders(data);
    }
  }, [data]);

  const orderToBabysitter = orders?.filter(
    (order) => order.babysitter_id == userBabysitter!._id
  );

  const statusUpdate = (orderid: string) => {
    if (status === "waiting") {
      setStatus("approved");
    }
    if (status === "approved") {
      setStatus("Done");
    }
    if (status === "Done") {
      setStatus("rejected");
    }

    PATCH(orderid, { status });
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-header__title">Welcome, {userBabysitter?.name}</h1>
        <p className="page-header__subtitle">
          Manage your babysitting profile and orders
        </p>
      </div>

      <div className="user-card">
        <img
          src={userBabysitter?.image || "/default-avatar.png"}
          alt={userBabysitter?.name}
          className="user-avatar"
        />
        <h2>{userBabysitter?.name}</h2>
        <div className="user-info">
          <p>Age: {userBabysitter?.age}</p>
          <p>Address: {userBabysitter?.address}</p>
          <p>Phone: {userBabysitter?.phone}</p>
          <p>Email: {userBabysitter?.email}</p>
          <p>Preferences: {userBabysitter?.preferences}</p>
          <p>Experience: {userBabysitter?.experience}</p>
          <p>About: {userBabysitter?.about}</p>
          <p>Price: {userBabysitter?.price}</p>
          <p>Likes: {userBabysitter?.likes}</p>
          <p>Budget: {userBabysitter?.budget}</p>
        </div>
        <NavLink to={`/edit/${userBabysitter!._id}`}>
          <button>Edit Profile</button>
        </NavLink>
      </div>

      <div className="page-header">
        <h2 className="page-header__title">Your Orders</h2>
        <p className="page-header__subtitle">Manage your current orders</p>
      </div>

      <div className="card-list">
        {orders.length > 0 ? (
          orderToBabysitter?.map((order) => (
            <div className="user-card" key={order.parent_id}>
              <h2>Order Details</h2>
              <p>Status: {order.status}</p>
              <p>Babysitter ID: {order.babysitter_id}</p>
              <p>Parent ID: {order.parent_id}</p>
              <p>Working Hours: {order.number_working}</p>
              <button
                onClick={() => statusUpdate(order.parent_id)}
                className={`status-btn ${order.status}`}
              >
                Update Status
              </button>
            </div>
          ))
        ) : (
          <div className="page-header">
            <h2 className="page-header__title">No Orders Available</h2>
            <p className="page-header__subtitle">
              You currently have no orders assigned
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default BaybisitterHomePage;
