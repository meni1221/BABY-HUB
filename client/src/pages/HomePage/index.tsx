import PageHeader from "../../components/PageHeader";
import { Link } from "react-router-dom";
import { TbArrowRight } from "react-icons/tb";
import { useLanguage } from "../../providers/LanguageProvider";
import "./style.scss";

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        title={t("homeTitle")}
        subtitle={t("homeSubtitle")}
      />

      <section className="home-cta">
        <div>
          <h2>{t("homeCtaTitle")}</h2>
          <p>{t("homeCtaText")}</p>
        </div>
        <Link className="home-cta__button" to="/login">
          {t("homeCtaButton")}
          <TbArrowRight />
        </Link>
      </section>
    </>
  );
};

export default HomePage;
