import "../../index.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ cartCount }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userInfo"));
    setUsername(user.displayName);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-light bg-light justify-content-between container mt-2 mb-4 rounded">
      <a className="m-3 multicolor-text" onClick={() => navigate("/product")}>
        TechCart
      </a>
      <div className="ml-auto d-flex align-items-center m-3">
        <a
          className="nav-link"
          href="#"
          style={{ marginRight: "10px" }}
          onClick={() => navigate("/cart")}
        >
          <span className="cart-number">
            <span>{cartCount}</span>
          </span>
          <span className="material-symbols-outlined">shopping_cart</span>
        </a>
        <span className="nav-link" style={{ marginRight: "10px" }}>
          Hi, {username}
        </span>
        <button className="btn btn-outline-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
