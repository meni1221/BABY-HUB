import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import IBabysitter from "../interface/BabySitter";
import IOrder from "../interface/orderType";

export default function ParentPage() {
  const { data, GET } = useFetch("http://localhost:7700/babysitter");
  const [babysitter, setBabysitter] = useState<IBabysitter[]>([]);
  const [order, setOrder] = useState(false);
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    GET();
  }, []);

  useEffect(() => {
    if (data) return setBabysitter(data);
    console.log("Not find Babysitter");
  }, [data]);

  // const addNewOrder = (newOrder: IOrder) => {
  //   if (order == true)
  // return

  //   setOrder(false);
  // };
  return (
    <>
      <div className="card-list">
        {babysitter && babysitter.length > 0 ? (
          babysitter.map((user) => (
            <div key={user.email} className="user-card">
              <h2>{user.name}</h2>
              <img
                src={user.image || "default-avatar.jpg"}
                alt={`${user}'s avatar`}
                className="user-avatar"
              />
              <p> {user.age}</p>
              <p> {user.address}</p>
              <p>{user.about}</p>
              <p> {user.preferences}</p>
              <p> {user.experience}</p>
              {!isOpen && (
                <button onClick={() => setisOpen(true)}>להזמנה</button>
              )}
            </div>
          ))
        ) : (
          <p>No babysitter available.</p>
        )}
      </div>
      {isOpen && (
        <>
          <form>
            <label htmlFor="number_working">number_working</label>
            <input
              id="number_working"
              placeholder="number_working"
              type="number"
              min="1"
              max="24"
            />
            <label htmlFor="expectations">expectations</label>
            <input id="expectations" placeholder="expectations" type="text" />
            <button type="submit">שליחת הזמנה</button>
          </form>
          <button onClick={() => setisOpen(false)}>Cancel</button>
        </>
      )}
    </>
  );
}
