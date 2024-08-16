/* DEPENDENCIES */
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { removeBookId } from "../utils/localStorage";
import { REMOVE_BOOK } from "../utils/mutations";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";

/* SAVED BOOKS */
const SavedBooks = () => {
  // hook for mutation for deleting book
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  // hook for querying user data
  const { loading, data } = useQuery(GET_ME);
  let userData = data?.me || {};
  console.log(data);

  // deletes book, accepts book's id value and calls removeBook mutation
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBook({
        variables: { bookId },
      });

      const user = data?.removeBook || {};
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // allow data to load from 'me' query
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div
        className="text-light bg-dark p-5"
        style={{ width: "100%", height: "100%" }}
      >
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks &&
          userData.savedBooks.length &&
          userData.savedBooks.length > 0
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks &&
            userData.savedBooks.length > 0 &&
            userData.savedBooks.map((book) => {
              return (
                <Col md="4" key={book.bookId}>
                  <Card border="dark">
                    {book.image ? (
                      <Card.Img
                        src={book.image}
                        alt={`The cover for ${book.title}`}
                        variant="top"
                      />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <p className="small">Authors: {book.authors}</p>
                      <Card.Text>{book.description}</Card.Text>
                      <Button
                        className="btn-block btn-danger"
                        onClick={() => handleDeleteBook(book.bookId)}
                      >
                        Delete this Book!
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
};

/* EXPORTS */
export default SavedBooks;
