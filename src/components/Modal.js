import React from "react";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";
import login from "../assets/img/login.jpeg";

const Modal = ({
  isModalOpened,
  setIsModalOpened,
  setModal,
  setUser,
  setError,
  errorMessage,
  setErrorMessage,
}) => {
  return (
    <>
      {isModalOpened && (
        <div className="modal">
          <div style={{ height: "425px", display: "flex" }}>
            <div className="col-left">
              <SignIn
                setUser={setUser}
                setError={setError}
                setErrorMessage={setErrorMessage}
                errorMessage={errorMessage}
                setIsModalOpened={setIsModalOpened}
              />
              <h3>OR</h3>
              <Link to="/signup">
                <button className="register_button" onClick={setModal}>
                  Register
                </button>
              </Link>
            </div>
            <div className="col-right">
              <img src={login} alt="login" />
              <i onClick={setModal} class="fas fa-times-circle fa-2x"></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
