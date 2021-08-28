import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocalUser } from "../services/localstorage";
import { getUser, selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../components/Login";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
const Spinner = require("react-spinkit");
function Auth({ children }) {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const userManual = useSelector(selectUser);
  useEffect(() => {
    if (getLocalUser("user") !== null) {
      {
        dispatch(getUser());
        history.push("/");
      }
    }
  }, [history]);

  //   useEffect(() => {
  //     console.log("userManual");
  //   }, [userManual]);
  // return <>{!user && !userManual ? <Login /> : <App loading={loading} />}</>;
  return (
    <>
      {!user && !userManual ? (
        <Login />
      ) : loading ? (
        <AppLoading>
          <AppLoadingContents>
            <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" />
            <Spinner
              name="ball-spin-fade-loader"
              color="purple"
              fadeIn="none"
            />
          </AppLoadingContents>
        </AppLoading>
      ) : (
        children
      )}
    </>
  );
}
export default Auth;
const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
