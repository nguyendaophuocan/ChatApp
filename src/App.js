import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

import Login from "./components/Login";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Auth from "./auth/Auth";
// import Spinner from "react-spinkit ";

function App() {
  return (
    <div className="App">
      {" "}
      <Router>
        <Auth>
          <>
            <Header />
            <Body>
              <Sidebar />
              <Switch>
                <Route path="/">
                  {/* Chat component */}
                  <Chat />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
              </Switch>
            </Body>
          </>
        </Auth>{" "}
      </Router>
    </div>
  );
}
// }

export default App;

const Body = styled.div`
  display: flex;
  height: 100vh;
`;
