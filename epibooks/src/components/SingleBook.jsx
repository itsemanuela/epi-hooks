import { Card } from "react-bootstrap";
import { useState } from "react";

const SingleBook = ({ book, selectedBook, changeSelectedBook }) => {
  const [selected, setSelected] = useState(false);

  return (
    <Card
      onClick={() => {
        setSelected(!selected);
        changeSelectedBook(book.asin);
      }}
      style={{
        border: selectedBook === book.asin ? "3px solid red" : "none",
        cursor: "pointer",
      }}
    >
      <Card.Img variant="top" src={book.img} />
      <Card.Body>
        <Card.Title style={{ color: "black" }}>{book.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default SingleBook;
