import Layout from "./layout/Layout";
import AuthProvider from "./providers/AuthProvider";
import { LanguageProvider } from "./providers/LanguageProvider";
import AppRouter from "./router/AppRouter";
import "./App.scss";

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
