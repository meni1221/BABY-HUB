import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useFetch from "../hooks/useFetch";
import IBabysitter from "../interface/BabySitter";
import { useParams } from "react-router-dom";
import CommentRegister from "../componnets/CommentRegister";

export default function DisplayBabisitterPage() {
  const { user } = useContext(AuthContext) ?? {};
  const { GETOne, data } = useFetch("http://localhost:7700/babysitter");
  const [babysitter, setbabysitter] = useState<IBabysitter>();
  const { id } = useParams();

  useEffect(() => {
    GETOne(id);
  }, []);
  useEffect(() => {
    if (data) setbabysitter(data);
  }, [data]);

  return (
    <>
      {babysitter ? (
        <>
          <img
            src={babysitter.image || "default-avatar.jpg"}
            alt={`${babysitter.name}'s avatar`}
            className="user-avatar"
          />

          <h2>{babysitter.name}</h2>
          <p>
            <strong>Age:</strong> {babysitter.age}
          </p>
          <p>
            <strong>Location:</strong> {babysitter.address}
          </p>
          <p>
            <strong>preferences:</strong> {babysitter.preferences}
          </p>
          <p>
            <strong>experience:</strong> {babysitter.experience}
          </p>
          <p>
            <strong>about:</strong> {babysitter.about}
          </p>
          <p>
            <strong>price:</strong> {babysitter.price}
          </p>
          <p>
            <strong>likes:</strong> {babysitter.likes}
          </p>
          <CommentRegister id={babysitter._id}/>

        </>

      ) :
      <h1>No Users</h1>}
    </>
  );
}
