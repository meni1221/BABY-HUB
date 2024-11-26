import "./App.css";
import Layout from "./layout/Layout";
import AuthProvider from "./providers/AuthProvider";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <>
      <AuthProvider>
        
        <Layout children={<AppRouter />} />
      </AuthProvider>
    </>
  );
}

export default App;
