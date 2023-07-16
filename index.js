const express = require("express");
// const {users}= require("./data/users.json"); // Use in case of not using separate routing.
const dotenv = require("dotenv");
const DbConnection = require("./databaseConnection");

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

dotenv.config();
const app = express();
DbConnection();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is Up and World",
  });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "The Route Does not Exist",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
