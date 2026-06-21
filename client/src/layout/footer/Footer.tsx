import { useLanguage } from "../../providers/LanguageProvider";
import "./style.scss";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <div>
      <footer>
        <p>
          © {new Date().getFullYear()} {t("footerRights")}
        </p>
      </footer>
    </div>
  );
};

export default Footer;
