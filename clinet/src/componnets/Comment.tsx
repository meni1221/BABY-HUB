import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import addComment from "../hooks/useFetch";
interface Props {
  comment: string; //חוות דעת
  star: string | undefined; //הכוכבים
  idBabysitter: string; //id של בביסיטר
}

export const getAllBabysittersInServer = async () => {
  try {
    const res: Response = await fetch("http://localhost:7700/babysitter");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export default function Comment({ comment, star, idBabysitter }: Props) {
  const { user }: any = useContext(AuthContext) ?? {};
  console.log(comment, star, idBabysitter);
  const commentForServer: any = {
    babysitterId: idBabysitter,
    review: { userId: user._id, comment: comment, rating: star },
  };
  useEffect(() => {
    const fetchBabysitters = async () => {
      await addComment(commentForServer);
    };
    fetchBabysitters();
  }, []);

  return (
    <>
      <div>
        {user && (
          <>
            <h1>
              {user.name}
              <Link to={"/comment"}>
                <button>+</button>
              </Link>
            </h1>
          </>
        )}
      </div>
    </>
  );
}
