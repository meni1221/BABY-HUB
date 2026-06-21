import Layout from "../layout";
import AuthProvider from "../providers/AuthProvider";
import { LanguageProvider } from "../providers/LanguageProvider";
import AppRouter from "../router/AppRouter";
import "./style.scss";

const App = () => {
  return (
    <>
      <LanguageProvider>
        <AuthProvider>
          <Layout children={<AppRouter />} />
        </AuthProvider>
      </LanguageProvider>
    </>
  );
};

export default App;
