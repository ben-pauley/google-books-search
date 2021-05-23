const express = require("express");
// Setting up socket.io
const http = require("http");
const socketIo = require("socket.io");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (when deployed on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Setting up server for socket.io
const server = http.createServer(app);
const io = socketIo(server, 
  {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  }
  );

// Logic for Socket.io to broadcast update message to all clients
// when saved book update is receved 
io.on('connection', (client) => {
  console.log('New client connected id:', client.id)
  client.on('favoriteUpdate', (favorite) => {
    console.log('client has sent favorite: ', favorite);
    io.emit('update', favorite);
    client.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");

server.listen(PORT, () => console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`));
