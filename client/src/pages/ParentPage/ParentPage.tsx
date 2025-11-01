import { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import IBabysitter from "../../interface/BabySitter";
import IOrder from "../../interface/orderType";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import "./style.scss";

export default function ParentPage() {
  const { user } = useContext(AuthContext) ?? {};
  const { data, GET } = useFetch("http://localhost:7700/babysitter");
  const { POST } = useFetch<IOrder>("http://localhost:7700");

  const [babysitters, setBabysitters] = useState<IBabysitter[]>([]);
  const [number_working, setNumber_working] = useState(1);
  const [expectations, setExpectations] = useState("");
  const [babyId, setBabyId] = useState("");

  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    GET();
  }, []);

  useEffect(() => {
    if (data) setBabysitters(data);
    else console.log("No babysitters found");
  }, [data]);

  const openDialog = (id?: string) => {
    if (!id) return;
    setBabyId(id);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    POST("orders", {
      parent_id: user!._id,
      babysitter_id: babyId,
      number_working,
      expectations,
    });

    setNumber_working(1);
    setExpectations("");
    closeDialog();
  };

  return (
    <>
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
              <button onClick={() => navigate(`/display/${user._id}`)}>
                More Details
              </button>
              <button onClick={() => openDialog(user._id)}>Contact</button>
            </div>
          ))
        ) : (
          <p>No babysitters available.</p>
        )}
      </div>

      {/* דיאלוג פופאפ */}
      <dialog ref={dialogRef} className="popup-dialog">
        <form onSubmit={handleSubmit} className="popup-form">
          <IoClose onClick={closeDialog} size={23}/>
          <h2>Contact Babysitter</h2>
          <label htmlFor="number_working">Number of Hours</label>
          <input
            id="number_working"
            type="number"
            min="1"
            max="24"
            value={number_working}
            onChange={(e) => setNumber_working(Number(e.target.value))}
          />

          <label htmlFor="expectations">Expectations</label>
          <input
            id="expectations"
            type="text"
            value={expectations}
            onChange={(e) => setExpectations(e.target.value)}
          />

          <div className="dialog-buttons">
            <button type="button" onClick={closeDialog} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Send Order
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
