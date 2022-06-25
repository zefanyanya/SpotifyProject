import React, { useEffect, useRef } from "react";
import "./index.css";
import config from "../../lib/config";
import { useDispatch } from "react-redux";
import { login } from "../../reducer/authReducer";
import { useHistory } from "react-router-dom";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import moon2 from "../../lib/img/moon.jpg";
import earth from "../../lib/img/earth5000.jpg";
import smoke from "../../lib/img/smoke.jpg";

const Login = () => {
  const ref = useRef();
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

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=https://spotify-gigihproject.vercel.app/&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  };

  return (
    <Parallax pages={4} ref={ref}>
      <div className="auth-link">
        <ParallaxLayer
          offset={0}
          speed={1}
          factor={2}
          style={{
            backgroundImage: `url(${moon2})`,
            backgroundSize: "cover",
          }}
        />

        <ParallaxLayer speed={5}></ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.5}
          factor={2}
          style={{
            backgroundImage: `url(${smoke})`,
            backgroundSize: "cover",
          }}
        >
          <h2 className="login">Login to explore your music world!</h2>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={1}
          factor={4}
          style={{
            backgroundImage: `url(${earth})`,
            backgroundSize: "cover",
          }}
        ></ParallaxLayer>

        <ParallaxLayer
          sticky={{ start: 0.4, end: 0.2 }}
          style={{ textAlign: "center" }}
        >
          <h2 className="head">Welcome to create playlist web Gigih</h2>
          <br></br>
          <p className="order">↓</p>
        </ParallaxLayer>

        <ParallaxLayer
          offset={3}
          speed={0.5}
          onClick={() => ref.current.scrollTo(1)}
        >
          <button className="login-btn">
            <a className="auth" href={getLinkAuth()}>
              Login
            </a>
          </button>
        </ParallaxLayer>
      </div>
    </Parallax>
  );
};
export default Login;
