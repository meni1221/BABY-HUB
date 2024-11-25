import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import IBabysitter from "../interface/BabySitter";

export default function ParentPage() {
  const { data, GET } = useFetch("http://localhost:7700/babysitter");
  const [babysitters, setBabysitters] = useState<IBabysitter[]>([]);

  useEffect(() => {
    GET();
  }, []);

  useEffect(() => {
    if (data) setBabysitters(data);
    else console.log("No babysitters found");
  }, [data]);

  return (
    <main>
      <div className="card-list">
        {babysitters && babysitters.length > 0 ? (
          babysitters.map((user) => (
            <div key={user.email} className="user-card">
              <img
                src={user.image || "default-avatar.jpg"}
                alt={`${user.name}'s avatar`}
                className="user-avatar"
              />
              <h2>{user.name}</h2>
              <p>
                <strong>Age:</strong> {user.age}
              </p>
              <p>
                <strong>Location:</strong> {user.address}
              </p>
              <button>Contact</button>
            </div>
          ))
        ) : (
          <p>No babysitters available.</p>
        )}
      </div>
    </main>
  );
}
