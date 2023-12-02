import "./App.css";
import Layout from "./components/Layout/Layout";
import { GlobalProvider } from "./components/GlobalContext/GlobalContext";

function App() {
  return (
  <>
  <GlobalProvider>
    <Layout/>;
  </GlobalProvider>
  </>
)}

export default App;
