import { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { AuthContext } from "../providers/AuthProvider";
interface Props {
  id: string;
}
export default function CommentRegister({ id }: Props) {
  const { GETOne, data } = useFetch("http://localhost:7700/babysitter");
  const [star1, setStar1] = useState("star");
  const [star2, setStar2] = useState("star");
  const [star3, setStar3] = useState("star");
  const [star4, setStar4] = useState("star");
  const [star5, setStar5] = useState("star");
  const [comment, setComment] = useState("");
  const stats = [star1, star2, star3, star4, star5].filter(
    (x) => x === "contenerStarChecked"
  );
  const [babysitter, setBabysitter] = useState<any>({});
  const { user } = useContext(AuthContext) ?? {};

  useEffect(() => {
    GETOne(id);
  }, []);
  useEffect(() => {
    if (data) setBabysitter(data);
  });

  const handelStyle = (num: number) => {
    switch (num) {
      case 1:
        setStar1(star1 == "star" ? "contenerStarChecked" : "star");
        break;
      case 2:
        setStar1("contenerStarChecked");
        setStar2(star2 == "star" ? "contenerStarChecked" : "star");
        break;
      case 3:
        setStar1("contenerStarChecked");
        setStar2("contenerStarChecked");
        setStar3(star3 == "star" ? "contenerStarChecked" : "star");
        break;
      case 4:
        setStar1("contenerStarChecked");
        setStar2("contenerStarChecked");
        setStar3("contenerStarChecked");
        setStar4(star4 == "star" ? "contenerStarChecked" : "star");
        break;
      case 5:
        setStar1("contenerStarChecked");
        setStar2("contenerStarChecked");
        setStar3("contenerStarChecked");
        setStar4("contenerStarChecked");
        setStar5(star5 == "star" ? "contenerStarChecked" : "star");
        break;
    }
  };

  const handleSubmit = () => {
    if (stats.length > 0 && comment.trim() !== "") {
    } else {
      alert("Please fill all fields correctly.");
    }
  };

  return user ? (
    <div>
      <h1>Add comment to {babysitter.name}</h1>
      <input
        type="text"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <div className="contenerStar">
        <div onClick={() => handelStyle(1)} className={star1}></div>
        <div onClick={() => handelStyle(2)} className={star2}></div>
        <div onClick={() => handelStyle(3)} className={star3}></div>
        <div onClick={() => handelStyle(4)} className={star4}></div>
        <div onClick={() => handelStyle(5)} className={star5}></div>
      </div>

      <button type="button"  onClick={() => handleSubmit() }>
        Submit
      </button>
    </div>
  ) : (
    <>
      <p></p>
    </>
  );
}
