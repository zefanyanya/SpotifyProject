import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import CreatePlaylist from "./Pages/CreatePlaylist";
import { useSelector } from "react-redux";
import Navbar from "./components/Nav";

function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <Router>
      <Switch>
        <Route path={"/create-playlist"}>
          <Navbar />
          {isLogin ? <CreatePlaylist /> : <Redirect to={"/"} />}
        </Route>
        <Route path={"/"}>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
