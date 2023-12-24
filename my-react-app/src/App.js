import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Home from "./pages/Home/home";
import Contact from "./pages/Contact/contact";
import store from "./http/Api/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Provider>
  );
}

export default App;
