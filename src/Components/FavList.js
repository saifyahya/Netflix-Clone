import { Card, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function FavList() {
  const [favMovies, setFavMovies] = useState([]);
  const [formShown, setFormShown] = useState(false);

  async function getDBMovies() {
    let url = process.env.REACT_APP_SERVER_URL;
    console.log(url);
    let response = await fetch(`${url}/movies`);
    let receivedData = await response.json();
    setFavMovies(receivedData);
  }

  async function handleDelete(id) {
    let url = `${process.env.REACT_APP_SERVER_URL}/movies/${id}`;
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 204) {
      alert("successfully deleted");
      getDBMovies();
    }
  }

  async function handleUpdate(id, updatedComment) {
    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/movies/${id}`;
      let response = await axios.put(url, { comment: updatedComment });

      if (response.status === 200) {
        alert("successfully updated");
        getDBMovies();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getDBMovies();
  }, []);

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const updatedComment = e.target.elements.comment.value;
    handleUpdate(id, updatedComment);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", margin: "20px" }}>
      {favMovies &&
        favMovies.map((fav) => (
          <Card key={fav.id} style={{ width: '18rem', margin: "10px" }}>
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/w500/${fav.poster_path}`}
            />
            <Card.Body>
              <Card.Title>{fav.title}</Card.Title>
              <Card.Text>{fav.comment ? fav.comment : "No added comment"}</Card.Text>
              <Button onClick={() => handleDelete(fav.id)} variant="primary">
                Delete
              </Button>
              <Button style={{ marginTop: "10px" }} onClick={() => setFormShown(!formShown)}>Update your comment</Button>
              {formShown && (
                <Form onSubmit={(e) => handleSubmit(e, fav.id)}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your comment</Form.Label>
                    <Form.Control type="text" name="comment" className="comment-input" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit comment
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}

export default FavList;

