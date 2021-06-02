import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Error from "../components/Error";
import axios from "axios";

const SignIn = ({ setUser, setError, errorMessage, setIsModalOpened }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handlePass = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(`http://localhost:3001/signin`, data);
      const token = response.data.token;
      setUser(token);
      setIsModalOpened(false);
      history.push("/");
    } catch (e) {
      setError(e);
      console.log(e);
    }
  };
  return (
    <div className="form_login">
      <h1>Login to your account</h1>
      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        {errorMessage && <Error errorMessage={errorMessage} />}
      </div>
      <form>
        <div>
          <h2>Email</h2>
          <input type="text" placeholder="Email" onChange={handleEmail} />
          <h2>Password</h2>
          <input
            className="pass"
            type="password"
            placeholder="Password"
            onChange={handlePass}
          ></input>
          {/* <i onClick={viewPass} className="fas fa-eye"></i> */}
        </div>
        <input
          className="bleu"
          type="submit"
          value="Login"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default SignIn;
