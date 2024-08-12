import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import "./componants.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart, changePage } from "../ReduxSlices/CartButton";
const Navbar = () => {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const handleLogout = () => {
    localStorage.clear("authToken");
    navigate("/login");
  };
  const handleCartButton = () => {
    dispatch(toggleCart());
    dispatch(changePage({ page: "cart" }));
  };
  const handleOrderButton = () => {
    dispatch(toggleCart());
    dispatch(changePage({ page: "order" }));
  };
  return (
    <div>
      <nav
        className="navbar"
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "100%",
          zIndex: "2",
          backgroundColor: "red",
        }}
      >
        <div className="container-fluid">
          <div
            className="homeLogo"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3>
              <span
                style={{
                  color: "#FABF00",
                  fontSize: "35px",
                }}
              >
                <b>Food</b>
              </span>
              <span
                style={{
                  color: "#e7e7e7",
                  fontSize: "35px",
                }}
              >
                <b>Ease</b>
              </span>
            </h3>
            <Link
              to="/"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginLeft: "20px",
                textDecoration: "none",
                color: "#FABF00",
              }}
            >
              Home
            </Link>
          </div>
          {authToken ? (
            <div
              className="navContent"
              style={{
                display: "flex",
              }}
            >
              <button
                style={{
                  marginRight: "18px",
                  fontWeight: "bold",
                  fontSize: "20px",
                  textDecoration: "none",
                  color: "#FABF00",
                  background: "transparent",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}
                onClick={handleCartButton}
              >
                <svg
                  style={{
                    height: "20px",
                    width: "20px",
                    fill: "#FABF00",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                </svg>
                Cart
              </button>
              <button
                style={{
                  marginRight: "18px",
                  fontWeight: "bold",
                  fontSize: "18px",
                  textDecoration: "none",
                  color: "#FABF00",
                  background: "transparent",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}
                onClick={handleOrderButton}
              >
                <svg
                  style={{
                    height: "20px",
                    width: "20px",
                    fill: "#FABF00",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M50.7 58.5L0 160l208 0 0-128L93.7 32C75.5 32 58.9 42.3 50.7 58.5zM240 160l208 0L397.3 58.5C389.1 42.3 372.5 32 354.3 32L240 32l0 128zm208 32L0 192 0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-224z" />
                </svg>
                Orders
              </button>
              <button
                style={{
                  marginRight: "18px",
                  fontWeight: "bold",
                  fontSize: "18px",
                  textDecoration: "none",
                  color: "#FABF00",
                  background: "transparent",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}
                onClick={handleLogout}
              >
                <svg
                  style={{
                    height: "20px",
                    width: "20px",
                    fill: "#FABF00",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <div className="navContent">
              <Link
                to="/login"
                style={{
                  marginRight: "18px",
                  fontWeight: "bold",
                  fontSize: "18px",
                  textDecoration: "none",
                  color: "#FABF00",
                }}
              >
                <span>Login</span>
              </Link>
              <Link
                to="/signup"
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  textDecoration: "none",
                  color: "#FABF00",
                }}
              >
                <span>Signup</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
