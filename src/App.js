import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import axios from "axios";

import { Container, InputGroup, Table, Image } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function App() {
  let [responseData, setResponseData] = React.useState("");
  let textInput = React.createRef();
  const fetchData = React.useCallback(() => {
    const username = textInput.current.value;
    if (username) {
      axios({
        method: "GET",
        url: `https://api.github.com/users/${username}/gists`,
        headers: {
          "content-type": "application/json"
        }
      })
        .then((response) => {
          console.log(response);
          setResponseData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setResponseData("");
    }
  }, []);

  // React.useEffect(() => {
  //   fetchData();
  // }, [fetchData]);
  return (
    <Container>
      <div className="App">
        <h2>Get GIT Data</h2>

        <InputGroup className="mb-3">
          <input ref={textInput} placeholder="Type a message..." />

          <button type="button" onClick={fetchData} placeholder="wfng92">
            Search
          </button>
        </InputGroup>
        {responseData ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>File Type</th>
              </tr>
            </thead>
            <tbody>
              {responseData.map((data) => {
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
                        <Image
                          src={`${
                            data.files[Object.keys(data.files)].language
                          }.png`}
                          thumbnail
                        />
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
