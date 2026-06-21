import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { NavLink } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import IBabysitter from "../../interface/BabySitter";
import PageHeader from "../../components/PageHeader";
import { apiUrl } from "../../config/api";
import { useLanguage } from "../../providers/LanguageProvider";
import { TbEdit, TbRefresh } from "react-icons/tb";
import "./style.scss";

interface IOrder {
  status: string;
  parent_id: string;
  babysitter_id: string;
  number_working: number;
  expectations: string;
}

export const BaybisitterHomePage = () => {
  const [status, setStatus] = useState("waiting");
  const { user } = useContext(AuthContext) ?? {};
  const [orders, setorders] = useState<IOrder[]>([]);
  const { GET, data, PATCH } = useFetch<IOrder[]>(apiUrl("orders"));
  const userBabysitter = user as IBabysitter;
  const { t } = useLanguage();

  useEffect(() => {
    GET();
  }, []);

  useEffect(() => {
    if (data) {
      setorders(data);
    }
  }, [data]);

  const orderToBabysitter = orders?.filter(
    (order) => order.babysitter_id == userBabysitter!._id
  );

  const statusUpdate = (orderid: string) => {
    if (status === "waiting") {
      setStatus("approved");
    }
    if (status === "approved") {
      setStatus("Done");
    }
    if (status === "Done") {
      setStatus("rejected");
    }

    PATCH(orderid, { status });
  };

  return (
    <>
      <PageHeader
        title={`${t("welcomeUser")}, ${
          userBabysitter?.name || t("babysitter")
        }`}
        subtitle={t("dashboardSubtitle")}
      />

      <section className="babysitter-dashboard__profile">
        <img
          src={userBabysitter?.image || "/default-avatar.png"}
          alt={userBabysitter?.name}
          className="user-avatar"
        />
        <h2>{userBabysitter?.name}</h2>
        <div className="user-info">
          <p>{t("age")}: {userBabysitter?.age}</p>
          <p>{t("address")}: {userBabysitter?.address}</p>
          <p>{t("phone")}: {userBabysitter?.phone}</p>
          <p>{t("email")}: {userBabysitter?.email}</p>
          <p>{t("preferences")}: {userBabysitter?.preferences}</p>
          <p>{t("experience")}: {userBabysitter?.experience}</p>
          <p>{t("about")}: {userBabysitter?.about}</p>
          <p>{t("price")}: {userBabysitter?.price}</p>
          <p>{t("likes")}: {userBabysitter?.likes}</p>
          <p>{t("budget")}: {userBabysitter?.budget}</p>
        </div>
        <NavLink to={`/edit/${userBabysitter!._id}`}>
          <button>
            <TbEdit />
            {t("editProfile")}
          </button>
        </NavLink>
      </section>

      <PageHeader title={t("ordersTitle")} subtitle={t("ordersSubtitle")} />

      <section className="babysitter-dashboard__orders">
        {orders.length > 0 ? (
          orderToBabysitter?.map((order) => (
            <div className="order-card" key={order.parent_id}>
              <h2>{t("orderDetails")}</h2>
              <p>{t("status")}: {order.status}</p>
              <p>{t("babysitterId")}: {order.babysitter_id}</p>
              <p>{t("parentId")}: {order.parent_id}</p>
              <p>{t("workingHours")}: {order.number_working}</p>
              <button
                onClick={() => statusUpdate(order.parent_id)}
                className={`status-btn ${order.status}`}
              >
                <TbRefresh />
                {t("updateStatus")}
              </button>
            </div>
          ))
        ) : (
          <PageHeader
            title={t("noOrdersTitle")}
            subtitle={t("noOrdersSubtitle")}
          />
        )}
      </section>
    </>
  );
};

export default BaybisitterHomePage;
