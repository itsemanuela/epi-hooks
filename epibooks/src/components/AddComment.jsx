import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = ({ asin }) => {
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState("1");

  const sendComment = (e) => {
    e.preventDefault();

    const newComment = {
      comment: comment,
      rate: rate,
      elementId: asin,
    };

    fetch("https://striveschool-api.herokuapp.com/api/comments", {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer IL_TUO_TOKEN",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore durante l'invio del commento");
        }
      })
      .then(() => {
        alert("Recensione inviata con successo!");
        setComment("");
        setRate("1");
      })
      .catch((error) => {
        console.error("Errore:", error);
        alert(error.message);
      });
  };

  return (
    <div className="my-3">
      <h4>Aggiungi una recensione</h4>
      <Form onSubmit={sendComment}>
        <Form.Group className="mb-2">
          <Form.Label>Testo Recensione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Com'è questo libro?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Voto</Form.Label>
          <Form.Control
            as="select"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!asin}>
          Invia Recensione
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
