import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useFetch from "../hooks/useFetch";


interface Props {
  id: string;
}

export default function CommentRegister({ id }: Props) {
  const { GETOne, data } = useFetch("http://localhost:7700/babysitter");
  const [stars, setStars] = useState(["star", "star", "star", "star", "star"]); // מערך לניהול הכוכבים
  const [comment, setComment] = useState("");
  const [babysitter, setBabysitter] = useState<any>({});
  const { user } = useContext(AuthContext) ?? {};

  useEffect(() => {
    GETOne(id);
  }, [id, GETOne]);

  useEffect(() => {
    if (data) setBabysitter(data);
  }, [data]);

  const handelStyle = (num: number) => {
    const updatedStars = stars.map((_, index) =>
      index < num ? "contenerStarChecked" : "star"
    );
    setStars(updatedStars);
  };

  const handleSubmit = () => {
    const selectedStars = stars.filter(
      (star) => star === "contenerStarChecked"
    ).length;
    if (selectedStars > 0 && comment.trim() !== "") {
      console.log("Submitting comment:", {
        babysitterId: id,
        userId: user?._id,
        stars: selectedStars,
        comment,
      });
    } else {
      alert("Please fill all fields correctly.");
    }
  };

  return user ? (
    <div>
      <h1>Add comment to {babysitter.name}</h1>
      <input
        type=""
        onChange={(e) => setComment(e.target.value)}
        value={comment} placeholder="Write your comment..."
      />
      <div className="contenerStar">
        {stars.map((star, index) => (
          <div key={index}onClick={() => handelStyle(index + 1)}className={star}
          ></div>
        ))}
      </div>
      <button type="button" onClick={() => handleSubmit()}>
        Submit 
      </button>
    </div>
  ) : (
    <p>You must be logged in to add a comment.</p>
  );
}