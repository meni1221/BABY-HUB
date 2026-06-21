import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useFetch from "../hooks/useFetch";
import { apiUrl } from "../config/api";
import IBabysitter from "../interface/BabySitter";
import { useLanguage } from "../providers/LanguageProvider";
import { TbMessageCircle, TbSend } from "react-icons/tb";

interface Props {
  id: string;
}

const CommentRegister = ({ id }: Props) => {
  const { GETOne, addComment, data } = useFetch<IBabysitter>(
    apiUrl("babysitter")
  );
  const [stars, setStars] = useState(["star", "star", "star", "star", "star"]);
  const [comment, setComment] = useState("");
  const [babysitter, setBabysitter] = useState<IBabysitter | null>(null);
  const { user } = useContext(AuthContext) ?? {};
  const { t } = useLanguage();

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

  const handleSubmit = async () => {
    const selectedStars = stars.filter(
      (star) => star === "contenerStarChecked"
    ).length;
    if (selectedStars > 0 && comment.trim() !== "") {
      await addComment({
        id,
        review: {
          userId: user!._id!,
          rating: selectedStars,
          comment,
        },
      });
      setComment("");
    } else {
      alert(t("commentValidation"));
    }
  };

  return user ? (
    <div>
      <h1>
        <TbMessageCircle />
        {t("addCommentTo")} {babysitter?.name || t("fallbackBabysitter")}
      </h1>
      <input
        type="text"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder={t("commentPlaceholder")}
      />
      <div className="contenerStar">
        {stars.map((star, index) => (
          <div
            key={index}
            onClick={() => handelStyle(index + 1)}
            className={star}
          ></div>
        ))}
      </div>
      <button type="button" onClick={() => handleSubmit()}>
        <TbSend />
        {t("submit")}
      </button>
    </div>
  ) : (
    <p>{t("loginRequiredComment")}</p>
  );
};

export default CommentRegister;
