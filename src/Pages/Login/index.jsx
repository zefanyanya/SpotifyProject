import React, { useEffect } from "react";
import "./index.css";
import config from "../../lib/config";
import { useDispatch } from "react-redux";
import { login } from "../../reducer/authReducer";
import { useHistory } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    const accessTokenParams = new URLSearchParams(window.location.hash).get(
      "#access_token"
    );

    if (accessTokenParams !== null) {
      const setUserProfile = async () => {
        try {
          const requestOptions = {
            headers: {
              Authorization: "Bearer " + accessTokenParams,
              "Content-Type": "application/json",
            },
          };

          const response = await fetch(
            `${config.SPOTIFY_BASE_URL}/me`,
            requestOptions
          ).then((data) => data.json());
          dispatch(
            login({
              accessToken: accessTokenParams,
              user: response,
            })
          );
          history.push("/create-playlist");
        } catch (e) {
          alert(e);
        }
      };

      setUserProfile();
    }
  }, []);

  const getLinkAuth = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  };

  return (
    <div className="auth-link">
      <h3>Login to explore your music world!</h3>
      <button className="login-btn">
        <a className="auth" href={getLinkAuth()}>
          Login
        </a>
      </button>
    </div>
  );
};
export default Login;
