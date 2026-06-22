import { useContext, useEffect, useMemo, useState } from "react";
import { apiUrl } from "../../config/api";
import IOrder from "../../interface/orderType";
import IBabysitter from "../../interface/BabySitter";
import useFetch from "../useFetch";
import { AuthContext } from "../../providers/AuthProvider/context";

const nextStatus = (status: string) => {
  if (status === "waiting") return "approved";
  if (status === "approved") return "Done";
  if (status === "Done") return "rejected";
  return "waiting";
};

export const useBabysitterOrders = () => {
  const { user } = useContext(AuthContext) ?? {};
  const babysitter = user as IBabysitter | undefined;
  const { GET, PATCH, data } = useFetch<IOrder[]>(apiUrl("orders"));
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    GET();
  }, [GET]);

  useEffect(() => {
    if (data) setOrders(data);
  }, [data]);

  const assignedOrders = useMemo(
    () =>
      orders.filter((order) => order.babysitter_id === babysitter?._id),
    [babysitter?._id, orders],
  );

  const updateStatus = async (orderId: string, currentStatus: string) => {
    await PATCH(orderId, { status: nextStatus(currentStatus) });
    await GET();
  };

  return { assignedOrders, babysitter, orders, updateStatus };
};
