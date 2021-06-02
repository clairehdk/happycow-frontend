import React from "react";

const Error = ({ errorMessage }) => {
  return <span className="error">{errorMessage.response.data}</span>;
};

export default Error;
