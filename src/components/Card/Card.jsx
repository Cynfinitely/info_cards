import React, { useState, useEffect } from "react";
import logo from "./logo512.png";
import "./Card.css";
import { Link } from "react-router-dom";

function Card() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container">
        {items.map((item) => (
          <div key={item.id} className="card">
            <img
              src={logo}
              alt="logo"
              className="card-img-top rounded-circle border border-danger"
            />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">@{item.username}</p>
              <a href={item.email} className="card-link">
                {item.email}
              </a>
              <br />
              <Link to={`/Details/${item.id}`} className="btn btn-primary">
                MORE DETAILS
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Card;
