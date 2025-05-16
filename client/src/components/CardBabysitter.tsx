import { useNavigate } from "react-router-dom";
import IBabysitter from "../interface/BabySitter";
import { useState } from "react";

interface Props {
  users: IBabysitter[];
}
export default function CardBabysitter({ users }: Props) {
  const navigate = useNavigate();

  const [,setBabyId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const open = (id: any) => {
    setIsOpen(true);
    setBabyId(id);
  };
  return (
    <div className="card-list">
      {users.map((user) => (
        <div key={user.email} className="user-card">
          <img
            src={user.image || "default-avatar.jpg"}
            alt={`${user.name}'s avatar`}
            className="user-avatar"
          />
          <h1>user.name</h1>
          <p>
            <strong>Age:</strong> user.age
          </p>
          <p>
            <strong>Location:</strong> {user.address}
          </p>
          <button onClick={() => navigate(`/display/${user._id}`)}>
            More Details
          </button>
          {!isOpen && <button onClick={() => open(user._id)}>Contact</button>}
        </div>
      ))}
    </div>
  );
}
