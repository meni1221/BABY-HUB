import { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import IBabysitter from "../interface/BabySitter";
import IOrder from "../interface/orderType";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function ParentPage() {
  const { user } = useContext(AuthContext) ?? {};
  const { data, GET } = useFetch("http://localhost:7700/babysitter");
  const { POST } = useFetch<IOrder>("http://localhost:7700");

  const [isOpen, setisOpen] = useState(false);
  const [babysitters, setBabysitters] = useState<IBabysitter[]>([]);
  const [number_working, setNumber_working] = useState(1);
  const [expectations, setExpectations] = useState("");
  const [babyId, setBabyId] = useState("");

  const navigate = useNavigate()
  useEffect(() => {
    GET();
  }, []);

  useEffect(() => {
    if (data) setBabysitters(data);
    else console.log("No babysitters found");
  }, [data]);

  const open = (id: any) => {
    setisOpen(true);
    setBabyId(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log([user!._id, babyId, number_working, expectations]);

    POST("orders", {
      parent_id: user!._id,
      babysitter_id: babyId,
      number_working: number_working,
      expectations: expectations,
    });

    setNumber_working(1);
    setExpectations("");
  };

  return (
    <>
    
      <div className="card-list" >
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
              <button onClick={() => navigate(`/display/${user._id}`)}>More Details</button>
              {!isOpen && (
                <button onClick={() => open(user._id)}>Contact</button>
              )}
              
            </div>
          ))
        ) : (
          <p>No babysitters available.</p>
        )}
     
      </div>
      {isOpen && (
        <>
          <div className="pop-up">
            <button onClick={() => setisOpen(false)}>X</button>
            <form onSubmit={handleSubmit}>
              <label htmlFor="number_working">number_working</label>
              <input
                id="number_working"
                placeholder="number_working"
                type="number"
                min="1"
                max="24"
                value={number_working}
                onChange={(e) => setNumber_working(Number(e.target.value))}
              />
              <label htmlFor="expectations">expectations</label>
              <input
                id="expectations"
                placeholder="expectations"
                type="text"
                value={expectations}
                onChange={(e) => setExpectations(e.target.value)}
              />
              <button type="submit">Send an order</button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
