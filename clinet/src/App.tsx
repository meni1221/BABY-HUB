import "./App.css";
import Layout from "./layout/Layout";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <>
      <Layout children={<AppRouter />} />
    </>
  );
}

export default App;
