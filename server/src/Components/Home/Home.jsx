import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  return (
    <div>
      <Link className="tech" to="/addquestion">
        {" "}
        Teacher Login
      </Link>
      <Link className="tech"> Student Login</Link>
    </div>
  );
};

export default Home;
