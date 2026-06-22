import { useEffect, useState } from "react";
import { apiUrl } from "../../config/api";
import IBabysitter from "../../interface/BabySitter";
import useFetch from "../useFetch";

export const useBabysitterDetails = (id?: string) => {
  const { GETOne, data, error } = useFetch<IBabysitter>(apiUrl("babysitter"));
  const [babysitter, setBabysitter] = useState<IBabysitter>();

  useEffect(() => {
    if (!id) return;
    GETOne(id);
  }, [GETOne, id]);

  useEffect(() => {
    if (data) setBabysitter(data);
  }, [data]);

  return { babysitter, error };
};
