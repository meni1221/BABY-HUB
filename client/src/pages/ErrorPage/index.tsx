import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../providers/LanguageProvider/context";

const ErrorPage = () => {
  const { texts } = useLanguage();

  return (
    <PageHeader
      title={texts.errorTitle}
      subtitle={texts.errorSubtitle}
    />
  );
};

export default ErrorPage;
