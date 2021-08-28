import React, { useState } from "react";
import styled from "styled-components";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { auth, db, ggProvider, phoneProvider } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { login, selectLoading, setLoading } from "../features/userSlice";
import firebase from "firebase";
var Spinner = require("react-spinkit");

function Login() {
  const [signInManual, setSignInManual] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const signIn = (e, type) => {
    e.preventDefault();
    switch (type) {
      case "google":
        return auth
          .signInWithPopup(ggProvider)
          .catch((error) => alert(error.message));
      default:
        break;
    }
  };
  const toggleSignInManual = () => {
    setSignInManual(!signInManual);
    setSignUp(false);
  };
  const toggleSignUp = () => {
    setSignUp(true);
  };
  const onSubmitSignUp = () => {
    dispatch(
      setLoading({
        loading: true,
      })
    );
    console.log("1");
    db.collection("users")
      .add({
        username: username,
        password: password,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        dispatch(
          setLoading({
            loading: false,
          })
        );
        alert("Sign up successful");
      });
    console.log("3");
    // setPassword("");
    // setUsername("");
  };
  const onSubmitSignIn = () => {
    dispatch(
      setLoading({
        loading: true,
      })
    );
    db.collection("users")
      .where("username", "==", username)
      .where("password", "==", password)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach((user) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(user.id, " => ", user.data());
            dispatch(
              login({
                user: user.data(),
              })
            );
          });
        } else {
          alert("User not found");
          dispatch(
            setLoading({
              loading: false,
            })
          );
        }
      });

    return;
  };
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" />
        <h1>Sign in to Slack v2</h1>
        <p>slack.com</p>
        {!signInManual ? (
          <>
            <ManualBtn>
              <Button onClick={toggleSignInManual}>Sign in manually</Button>
            </ManualBtn>{" "}
            <GoogleBtn>
              <Button
                onClick={(e) => {
                  signIn(e, "google");
                }}
              >
                {" "}
                <Logo>
                  {" "}
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="c-third_party_auth__icon"
                  >
                    <g>
                      <path
                        className="c-third_party_auth__icon__google--red"
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      ></path>
                      <path
                        className="c-third_party_auth__icon__google--blue"
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      ></path>
                      <path
                        className="c-third_party_auth__icon__google--yellow"
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      ></path>
                      <path
                        className="c-third_party_auth__icon__google--green"
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      ></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </g>
                  </svg>
                </Logo>
                Sign in with Google
              </Button>
            </GoogleBtn>
          </>
        ) : !signUp ? (
          <>
            <Form>
              {" "}
              <h3>Sign in</h3>
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              ></input>
              <input
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button onClick={onSubmitSignIn}>
                {loading ? <Spinner color="purple" fadeIn="none" /> : "Sign In"}
              </Button>
              <span onClick={toggleSignInManual}>Back</span>
              <span onClick={toggleSignUp}>Sign up</span>
            </Form>
          </>
        ) : (
          <>
            <Form>
              {" "}
              <h3>Sign up</h3>
              <input
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              ></input>
              <input
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button onClick={onSubmitSignUp}>
                {loading ? (
                  <SpinnderContainer>
                    <Spinner />
                  </SpinnderContainer>
                ) : (
                  "Sign up"
                )}
              </Button>
              <span onClick={toggleSignInManual}>Sign in</span>
            </Form>
          </>
        )}
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;
const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }
`;
const ManualBtn = styled.div`
  margin-top: 20px;
  border-radius: 5px;
  background-color: #4a154b !important;
  > button {
    color: white;
  }
`;
const GoogleBtn = styled.div`
  margin-top: 20px;
  border-radius: 5px;
  border: 2px solid #4285f4;
  > button {
    color: #4285f4;
  }
`;
const Logo = styled.div`
  margin-right: 12px;
  width: 18px;
  height: 18px;
`;
const Form = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  > h3 {
    margin-bottom: 20px;
  }
  > input {
    padding: 0 20px;
    height: 40px;
    width: 100%;
    border: 1px solid #e01e5a;
    border-radius: 4px;
    transition: border 80ms ease-out, box-shadow 80ms ease-out;
    box-sizing: border-box;
    margin: 0 0 20px;
  }

  > button {
    color: white;
    background-color: #4a154b;
    border: 1px solid #e01e5a;
    margin: 0 auto;
  }
  > button:hover {
    background-color: #4a154b;
  }
  > span {
    cursor: pointer;
    margin-top: 10px;
    color: #1264a3;
  }
`;

const SpinnderContainer = styled.span`
  > .sk-spinner {
    color: white !important;
  }
`;
