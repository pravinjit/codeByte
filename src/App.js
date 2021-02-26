import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import axios from "axios";
import {
  Container,
  InputGroup,
  Table,
  Image,
  FormControl,
  Button,
  Alert
} from "react-bootstrap";
import Python from "./images/Python.png";
import JavaScript from "./images/JavaScript.png";

export default function App() {
  let [responseData, setResponseData] = React.useState("");
  let [validationStatus, setvalidationStatus] = React.useState("");
  let textInput = React.createRef();
  const fetchData = React.useCallback(() => {
    const username = textInput?.current?.value;
    username
      ? axios({
          method: "GET",
          url: `https://api.github.com/users/${username}/gists`,
          headers: {
            "content-type": "application/json"
          }
        })
          .then((response) => {
            console.log(response);
            setResponseData(response.data);
            setvalidationStatus("");
          })
          .catch((error) => {
            console.log(error);
          })
      : setvalidationStatus("1");
  }, []);

  return (
    <Container>
      <div className="App">
        <h2>Get GIT Data</h2>

        <InputGroup className="mb-3">
          <FormControl
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            ref={textInput}
          />
          <Button variant="primary" placeholder="wfng92" onClick={fetchData}>
            Search
          </Button>
        </InputGroup>
        {validationStatus ? (
          <Alert variant="danger">Please provide username</Alert>
        ) : (
          ""
        )}
        {responseData ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>File Type</th>
              </tr>
            </thead>
            <tbody>
              {responseData.map((data, keys) => {
                const file = () => {
                  if (
                    data.files[Object.keys(data.files)].language === "Python"
                  ) {
                    return Python;
                  } else {
                    return JavaScript;
                  }
                };
                return (
                  <tr>
                    <td>
                      <Image src={data.owner.avatar_url} thumbnail />
                    </td>
                    <td>
                      {data.files[Object.keys(data.files)].language ===
                        "Python" ||
                      data.files[Object.keys(data.files)].language ===
                        "JavaScript" ? (
                        <Image src={file()} />
                      ) : (
                        Object.keys(data.files)
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
}
