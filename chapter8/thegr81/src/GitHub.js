import React, { useState } from "react";
import axios from "axios"; // npm install axios
import ReactLoading from "react-loading";
import { Card, Form, Button } from "react-bootstrap";

const GitHub = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    getGitHubData(searchTerm);
  };

  const getGitHubData = (_searchTerm) => {
    axios
      .get("https://api.github.com/search/users?q=" + _searchTerm)
      .then((res) => {
        setIsLoading(false);
        setData(res.data.items);
        console.log(res.data.items);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching data: ", error);
      });
  };

  const listUsers = data.map((user) => (
    <Card key={user.id}>
      <a href={user.html_url}>
        <img
          width={64}
          height={64}
          className="mr-3"
          src={user.avatar_url}
          alt="Generic placeholder"
        />
      </a>
      <Card.Body>
        <h5>Login: {user.login}</h5>
        <p>Id: {user.id}</p>
      </Card.Body>
    </Card>
  ));

  return (
    <div>
      <Form inline="true" onSubmit={handleSubmit}>
        <Form.Group controlId="formInlineName">
          <Form.Control
            type="text"
            value={searchTerm}
            placeholder="Enter Search Term"
            onChange={handleChange}
          />
        </Form.Group>{" "}
        <Button type="submit">Search</Button>
      </Form>
      <h3>GitHub Users Results</h3>
      {isLoading && <ReactLoading type="spinningBubbles" color="#0040ff" />}
      {listUsers}
    </div>
  );
};











...-


























