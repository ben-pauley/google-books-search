import axios from "axios";
import openSocket from "socket.io-client";

const socket = openSocket();

export default {
  searchBook: function (search) {
    return axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=20`
    );
  },
  getBooks: function () {
    return axios.get("/api/books");
  },
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },
  subscribeToUpdates: function (update, cb) {
    socket.on("update", (newUpdate) => cb(newUpdate));
    if (update) {
      socket.emit("favoriteUpdate", update);
    }
  },
};
