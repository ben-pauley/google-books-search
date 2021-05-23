import React, { useState } from "react";
import { Container, Input, Header, Item } from "semantic-ui-react";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import BookItem from "../components/BookItem";
import placeholder from "../images/book.svg";
import library from "../images/library.svg";
// import "./Search.css";

function Search() {
  const [state, dispatch] = useStoreContext();
  const [search, setSearch] = useState("");

  function saveBook(id) {
    dispatch({ type: "LOADING" });
    const book = state.books.filter((book) => book.id === id)[0];
    API.subscribeToUpdates(book, (response) =>
      console.log("received saved update: ", response)
    );
    API.saveBook(book)
      .then((res) =>
        dispatch({
          type: "ADD_FAVORITE",
          favorite: res,
        })
      )
      .catch((err) => console.log(err));
  }

  function handleInputChange(event) {
    setSearch(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (search) {
      dispatch({ type: "LOADING" });
      API.searchBook(search)
        .then((res) => {
          dispatch({
            type: "SAVE_SEARCH",
            books: res.data.items.map((book) => {
              return {
                id: book.id,
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors
                  ? book.volumeInfo.authors.join(", ")
                  : "...",
                description: book.volumeInfo.description,
                image: book.volumeInfo.imageLinks
                  ? book.volumeInfo.imageLinks.thumbnail
                  : placeholder,
                link: book.volumeInfo.previewLink.split("&")[0],
              };
            }),
          });
          setSearch("");
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <Container>
      <form onSubmit={handleFormSubmit}>
        <Input
          action="Search"
          loading={state.loading}
          className="search"
          onChange={handleInputChange}
          name="title"
          icon="search"
          iconPosition="left"
          placeholder="Search for a book, e.g. 'Pride and Prejudice'"
          value={search}
          style={{ width: "100%", marginTop: "10px" }}
        />
      </form>
      {state.books.length ? (
        <Item.Group divided>
          {state.books.map((book) => (
            <BookItem
              key={book.id}
              title={book.title}
              authors={book.authors}
              description={book.description}
              src={book.image}
              link={book.link}
              handleSave={saveBook}
              bookId={book.id}
            />
          ))}
        </Item.Group>
      ) : (
        <img src={library} alt="library" className="ui fluid image" />
      )}
    </Container>
  );
}

export default Search;
