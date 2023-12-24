import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../layouts/header";
import Footer from "../../layouts/footer";
import { loginUser } from "../../http/Api/api";
import Button from '@mui/material/Button'

const Home = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  if (error) {
    console.log(error.error);
  }
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };
  return (
    <div>
      <Header />
      <h1> Login </h1>
      {error && <p style={{ color: "red" }}>{error.error}</p>}
      {isLoggedIn && (
        <div>
          <p style={{ color: "green" }}>Welcome! You are logged in.</p>
        </div>
      )}
      <form onSubmit={handleLogin}>
        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleInputChange}
          required
        />
        <label> Password :</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <Button variant="contained">Contained</Button>
      <Footer />
    </div>
  );
};
export default Home;
