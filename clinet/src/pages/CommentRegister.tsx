import { useEffect, useState } from "react";
import Comment, { getAllBabysittersInServer } from "../componnets/Comment";
import { IParents } from "../interface/parents";

export default function CommentRejister() {
  const [star1, setStar1] = useState("star");
  const [star2, setStar2] = useState("star");
  const [star3, setStar3] = useState("star");
  const [star4, setStar4] = useState("star");
  const [star5, setStar5] = useState("star");
  const [comment, setComment] = useState("");
  const stats = [star1, star2, star3, star4, star5].filter(
    (x) => x === "contenerStarChecked"
  );

  const [clecked, setClecked] = useState(false);

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
  const [idBabysitter, setIdBabysitter] = useState("");
  const [babysitters, setBabysitters] = useState<IParents[]>([]);
  useEffect(() => {
    async function getAllBabysitters() {
      const data = await getAllBabysittersInServer();

      setBabysitters(data!);
    }
    getAllBabysitters();
  }, []);
  const handleSubmit = () => {
    if (stats.length > 0 && comment.trim() !== "") {
      setClecked(true);
    } else {
      alert("Please fill all fields correctly.");
    }
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        required
      />
      <div className="contenerStar">
        <div onClick={() => handelStyle(1)} className={star1}></div>
        <div onClick={() => handelStyle(2)} className={star2}></div>
        <div onClick={() => handelStyle(3)} className={star3}></div>
        <div onClick={() => handelStyle(4)} className={star4}></div>
        <div onClick={() => handelStyle(5)} className={star5}></div>
      </div>

      <button type="button" onClick={() => handleSubmit()}>
        Submit💌
      </button>
      <select onChange={(e) => setIdBabysitter(e.target.value)}>
        {babysitters.map((babysitter, i) => (
          //@ts-ignore
          <option key={i} value={babysitter._id}>
            {babysitter.name}
          </option>
        ))}
      </select>
      {clecked && (
        <Comment
          star={stats.length.toString()}
          comment={comment}
          idBabysitter={idBabysitter}
        />
      )}
    </div>
  );
}
