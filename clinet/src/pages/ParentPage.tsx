import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import IBabysitter from "../interface/BabySitter";

export default function ParentPage() {
  const { data, GET } = useFetch("http://localhost:7700/babysitter");
  const [babysitter, setBabysitter] = useState<IBabysitter[]>([]);

  useEffect(() => {
    GET();
  }, []);

  useEffect(() => {
    if (data) return setBabysitter(data);
    console.log("Not find Babysitter");
  }, [data]);
  return (
    <>
      <div className="card-list">
        {babysitter && babysitter.length > 0 ? (
          babysitter.map((user) => (
            <div key={user.email} className="user-card">
              <img
                src={user.image || "default-avatar.jpg"}
                alt={`${user}'s avatar`}
                className="user-avatar"
              />
              <h3>{user.name}</h3>
              <button>להזמנה</button>
            </div>
          ))
        ) : (
          <p>No babysitter available.</p>
        )}
      </div>
    </>
  );
}
