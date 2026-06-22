import { useEffect, useMemo, useState } from "react";
import { apiUrl } from "../../config/api";
import useFetch from "../useFetch";
import IBabysitter from "../../interface/BabySitter";

export const useBabysitters = () => {
  const { data, error, GET } = useFetch<IBabysitter[]>(apiUrl("babysitter"));
  const [babysitters, setBabysitters] = useState<IBabysitter[]>([]);

  useEffect(() => {
    GET();
  }, [GET]);

  useEffect(() => {
    if (data) setBabysitters(data);
  }, [data]);

  const hasBabysitters = useMemo(() => babysitters.length > 0, [babysitters]);

  return { babysitters, error, hasBabysitters, refresh: GET };
};
