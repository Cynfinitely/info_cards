import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";

function Details() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState("");

  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result);
          setItem(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (Object.keys(item).length !== 0) {
    const { name, username, email, phone, company, website, address } = item;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <ul className="list-group">
            <li className="list-group-item">Name: {name}</li>
            <li className="list-group-item">Username: {username}</li>
            <li className="list-group-item">Email: {email}</li>
            <li className="list-group-item">Phone: {phone}</li>
            <li className="list-group-item">Company: {company.name}</li>
            <li className="list-group-item">Website: {website}</li>
            <li className="list-group-item">
              <span>Adress</span>
              <ul className="list-group list-group-flush">
                <li class="list-group-item">Street: {address.street}</li>
                <li class="list-group-item">Suite: {address.suite}</li>
                <li class="list-group-item">City: {address.city}</li>
                <li class="list-group-item">Zipcode:{address.zipcode}</li>
              </ul>
            </li>
          </ul>
        </div>
      );
    }
  } else {
    console.log("Else");
    return <h1> Something went wrong!</h1>;
  }
}
export default Details;
