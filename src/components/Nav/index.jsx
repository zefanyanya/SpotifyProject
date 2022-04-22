import "./index.css";
import { Link } from "react-router-dom";
import SpotifyLogo from "../../lib/img/SpotifyLogo.png";
// import account from "../../lib/images/account.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="header-left">
        <img src={SpotifyLogo} className="header-logo" alt="spotify" />
      </div>
      <div className="header-right">
        <div className="logout-Btn">
          <button className="logout-btn">
            <Link className="logout" to="/">
              Log out
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
