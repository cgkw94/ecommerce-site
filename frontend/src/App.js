import React, { useState } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Cookies from "universal-cookie";

import Login from "./components/Login";
import UserDetails from "./components/UserDetails";
import UserPage from "./components/UserPage";
import Address from "./components/Address";
import NewAddress from "./components/NewAddress";

function App() {
  const cookies = new Cookies();

  const [username, setUsername] = useState(cookies.get("username"));
  const [token, setToken] = useState(cookies.get("token"));
  const [admin, setAdmin] = useState(cookies.get("admin"));

  return (
    <>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/user">
        <UserPage />
      </Route>
      <Route exact path="/user/edit">
        <UserDetails />
      </Route>
      <Route exact path="/user/address">
        <Address />
      </Route>
      <Route exact path="/user/address/add">
        <NewAddress />
      </Route>
    </>
  );
}

export default App;
