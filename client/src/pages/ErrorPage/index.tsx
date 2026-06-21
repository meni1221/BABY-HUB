import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../providers/LanguageProvider";

const ErrorPage = () => {
  const { t } = useLanguage();

  return (
    <PageHeader
      title={t("errorTitle")}
      subtitle={t("errorSubtitle")}
    />
  );
};

export default ErrorPage;
