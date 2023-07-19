import { useState, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
function ModalMovie({ handleClose, show, data, commentAdder }) {
  const commentRef = useRef();
  const [comment, setComment] = useState('');

  function handelSubmit(e) {
    e.preventDefault();
    let userComment = commentRef.current.value;

    setComment(userComment)
    const newMovie = { ...data, userComment }; {/*adding usercomment:its value to the object data */ }
    console.log('newmovie', newMovie)
    commentAdder(newMovie, newMovie.id)
    console.log('comment', comment)
  }

  async function favoriteHandler() {
    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/movies`;
      let newdata = {
        title: data.title,
        poster_path: data.poster_path,
        comment: comment
      };

      const response = await axios.post(url, newdata);
      console.log("555", response.data);

      if (response.status === 201) {
        alert('Successfully added to favorites');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ width: '18rem' }}>
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} style={{ width: '100%' }} />
          <p>{comment ? comment : "No comment Added"}</p>
          <Form onSubmit={(e) => handelSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>add your comment!</Form.Label>
              <Form.Control type="text" placeholder="Nice Movie" ref={commentRef} />
            </Form.Group>
            <Button variant="primary" type="submit" >
              submit your comment
            </Button>
            <Button style={{ marginTop: "10px" }} onClick={favoriteHandler} variant='primary'>add to fav</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalMovie