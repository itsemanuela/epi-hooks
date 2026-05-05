import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = (props) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (props.asin) {
      setIsLoading(true);
      setIsError(false);

      fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWYzM2E2NGYwNDIwZDAwMTUxNTVhNjEiLCJpYXQiOjE3Nzc1NDc4NzYsImV4cCI6MTc3ODc1NzQ3Nn0.qQzs0E2KpWLjJyx3prcC6DD4L4xxHoGe2Pfk9ct8G6o",
          },
        },
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Errore nel recupero dei commenti");
          }
        })
        .then((data) => {
          setComments(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Si è verificato un problema:", err);
          setIsLoading(false);
          setIsError(true);
        });
    }
  }, [props.asin]);

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
