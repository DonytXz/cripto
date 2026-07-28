import React, { useEffect, useContext, useState } from "react";
import { Link, Navigate } from "react-router";
import { AppSettings } from "./../../config/app-settings.js";
import logo from "../../assets/img/whiteLogo.png";
import { login } from "../../services/Auth.js";

function PagesLogin() {
  const context = useContext(AppSettings);
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);

  useEffect(() => {
    context.setAppHeaderNone(true);
    context.setAppSidebarNone(true);
    context.setAppContentClass("p-0");

    return function cleanUp() {
      context.setAppHeaderNone(false);
      context.setAppSidebarNone(false);
      context.setAppContentClass("");
    };
  }, []);

  const postData = async (event) => {
    event.preventDefault();
    const response = await login({ username: email, password: password });
    if (response) {
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("id", response?.data?.id);
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to="/home" replace />;
  }
  return (
    <div className="login">
      <div className="login-content">
        <div className="d-flex mb-4">
          <img
            className="mx-auto"
            width={200}
            height={100}
            src={logo}
            alt="Logo image"
          />
        </div>

        <form onSubmit={postData}>
          <h1 className="text-center">Sign In</h1>
          <div className="text-inverse text-opacity-50 text-center mb-4">
            For your protection, please verify your identity.
          </div>
          <div className="mb-3">
            <label className="form-label">
              User Name <span className="text-danger">*</span>
            </label>
            <input
              onChange={(event) => setEmail(event.target.value)}
              type="text"
              className="form-control form-control-lg bg-white bg-opacity-5"
              placeholder=""
            />
          </div>
          <div className="mb-3">
            <div className="d-flex">
              <label className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <a
                href="#/"
                className="ms-auto text-inverse text-decoration-none text-opacity-50"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              className="form-control form-control-lg bg-white bg-opacity-5"
              placeholder=""
            />
          </div>
          {/* <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="customCheck1"
              />
              <label className="form-check-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div> */}
          <button
            // onClick={postData}
            type="submit"
            className="btn btn-outline-theme btn-lg d-block w-100 fw-500 mb-3"
          >
            Sign In
          </button>
          <div className="text-center">
            <Link to="/" className="text-inverse text-opacity-50">
              <i className="bi bi-arrow-left me-2" aria-hidden="true" />
              Back to market
            </Link>
          </div>
          {/* <div className="text-center text-inverse text-opacity-50">
            Don't have an account yet? <Link to="/pages/register">Sign up</Link>
            .
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default PagesLogin;
