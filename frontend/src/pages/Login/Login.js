import "../../index.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loginUserAPI, registerUserAPI } from "./API";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const getUser = () => {
      let user = JSON.parse(localStorage.getItem("userInfo"));

      if (user?.token) navigate("/product");
      else navigate("/");
    };

    getUser();
  }, [navigate]);

  const notify = (message, type = "info") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast.info(message);
    }
  };

  const changeView = () => {
    setLogin(!isLogin);
  };

  const loginUser = async () => {
    const response = await loginUserAPI(email, password);

    if (!response) {
      notify("Server is down!", "error");
      return;
    }

    const { statusCode, user, msg } = response;

    if (statusCode == 200) {
      if (user) {
        localStorage.setItem("userInfo", JSON.stringify(user));
        navigate(`/product`);
      }
      return;
    }

    notify(msg, "error");
  };

  const registerUser = async () => {
    const response = await registerUserAPI(displayName, email, password);

    if (!response) notify("Server is down!", "error");

    const { statusCode, resultMsg } = response;

    if (statusCode == 200) {
      changeView();
      if (resultMsg) notify(resultMsg, "success");
      return;
    }

    if (resultMsg) notify(resultMsg, "error");
  };

  return (
    <div>
      {isLogin ? (
        <div className="center-div">
          <h4>Login</h4>
          <div className="form-width">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={loginUser}
            >
              Login
            </button>
          </div>

          <p className="mt-3" onClick={changeView}>
            Don't have an account? Register
          </p>
        </div>
      ) : (
        <div className="center-div">
          <h4>Sign Up</h4>
          <div className="form-width">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={registerUser}
            >
              Sign up
            </button>
          </div>

          <p className="mt-3" onClick={changeView}>
            Already have an account? Login
          </p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Login;
